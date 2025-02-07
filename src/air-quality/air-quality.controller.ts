import { Controller, Get, Query } from '@nestjs/common';
import { AirQualityService } from './air-quality.service';

@Controller('air-quality')
export class AirQualityController {
  constructor(private readonly airQualityService: AirQualityService) {}

  @Get()
  async getAirQuality(@Query('location') location: string) {
    if (!location) {
      return { error: 'Location is required' };
    }
    
    const airQualityData = await this.airQualityService.getAirQualityData(location);
    if (!airQualityData) {
      return { error: 'Could not fetch air quality data' };
    }
    return airQualityData;
  }
}
