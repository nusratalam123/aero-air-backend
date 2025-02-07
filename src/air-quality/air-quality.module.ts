import { Module } from '@nestjs/common';
import { AirQualityService } from './air-quality.service';
import { AirQualityController } from './air-quality.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AirQualityController],
  providers: [AirQualityService,PrismaService],
})
export class AirQualityModule {}
