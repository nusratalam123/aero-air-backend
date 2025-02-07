import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service';

// src/interfaces/iqair-response.interface.ts

export interface NominatimResponse {
  lat: string;
  lon: string;
}

export interface IQAirWeather {
  tp: number; // Temperature
  hu: number; // Humidity
  ws: number; // Wind Speed
}

export interface IQAirPollution {
  aqius: number;  // Air Quality Index
  p1: number;   // PM2.5
  p2: number;   // PM10
  o3: number;    // Nitrogen Dioxide (NO2)
  n2: number;    // Sulphur Dioxide (SO2)
  co: number;     // Carbon Monoxide (CO)
}

export interface IQAirResponse {
  data: {
    current: {
      pollution: IQAirPollution;
      weather: IQAirWeather;
    };
  };
}

export interface OpenWeatherMapAirQualityResponse {
  list: [
    {
      components: {
        co: number;     // Carbon Monoxide (CO)
        no2: number;    // Nitrogen Dioxide (NO2)
        o3: number;     // Ozone (O3)
        so2: number;    // Sulphur Dioxide (SO2)
        pm2_5: number;  // PM2.5
        pm10: number;   // PM10
      };
    }
  ];
}

interface WAQIResponse {
  data: {
    iaqi: {
      pm25?: { v: number };   // PM2.5 value (optional)
      pm10?: { v: number };   // PM10 value (optional)
      no2?: { v: number };    // NO2 value (optional)
      so2?: { v: number };    // SO2 value (optional)
      co?: { v: number };     // CO value (optional)
      aqi?: number;           // Air Quality Index (optional)
    };
  };
}



@Injectable()
export class AirQualityService {
  constructor(private prisma: PrismaService) {}

  // 1️⃣ Get latitude & longitude from Nominatim (Free API)
  async getCoordinates(location: string) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json`;

    try {
      const response = await axios.get<NominatimResponse[]>(url); // Use the type for the Nominatim API response

      console.log(response.data[0].lat, response.data[0].lon);
      if (!response.data.length) {
        throw new Error('Location not found');
      }
      return { 
        latitude: parseFloat(response.data[0]?.lat), 
        longitude: parseFloat(response.data[0]?.lon) 
      };
    } catch (error) {
      console.error('Error fetching coordinates:', error.message);
      return null;
    }
  }

  // 2️⃣ Fetch air quality data from IQAir API
  async getAirQualityData(location: string) {
    const coords = await this.getCoordinates(location);
    console.log("cordinates",coords);
    if (!coords) return null;

    const IQAIR_API_KEY = process.env.IQAIR_API_KEY;
    const WAQI_API_KEY = process.env.WAIR_API_KEY;

    const airQualityUrl1 = `https://api.waqi.info/feed/geo:${coords.latitude};${coords.longitude}/?token=${WAQI_API_KEY}`;
    const airQualityUrl2 = `https://api.airvisual.com/v2/nearest_city?lat=${coords.latitude}&lon=${coords.longitude}&key=${IQAIR_API_KEY}`;

    try {
      // First, attempt to fetch data from the WAQI API
      const waqiResponse = await axios.get<WAQIResponse>(airQualityUrl1);
      const waqiData = waqiResponse.data.data?.iaqi ?? null;

      console.log("WAQI Data:", waqiData);

      // If WAQI response contains pollution data
      if (waqiData) {
        console.log("WAQI Data:", waqiData);

        const pm25 = waqiData.pm25?.v ?? null;
        const pm10 = waqiData.pm10?.v ?? null;
        const no2 = waqiData.no2?.v ?? null;
        const so2 = waqiData.so2?.v ?? null;
        const co = waqiData.co?.v ?? null;

        // Fetch weather data for consistency
        const weatherResponse = await axios.get<IQAirResponse>(airQualityUrl2);
        const weatherData = weatherResponse.data.data.current.weather;
        const pollutionData = weatherResponse.data.data.current.pollution;


        console.log("Weather Data:", weatherData);

        // Store the air quality data in the database
        const airQualityData = await this.prisma.airQuality.create({
          data: {
            location,
            latitude: coords.latitude,
            longitude: coords.longitude,
            aqi: pollutionData.aqius ?? 0,
            pm25: pm25,
            pm10: pm10,
            no2: no2,
            so2: so2,
            co: co,
            temperature: weatherData.tp ?? null,
            humidity: weatherData.hu ?? null,
            windSpeed: weatherData.ws ?? null
          }
        });

        return airQualityData;
      } else {
        throw new Error('Could not fetch pollution data from WAQI API');
      }
    } catch (error) {
      console.error('Error fetching air quality data:', error.message);
      return { error: 'Could not fetch air quality data' };
    }
  }
}
