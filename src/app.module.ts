import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AirQualityModule } from './air-quality/air-quality.module';

@Module({
  imports: [UserModule, AuthModule, AirQualityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
