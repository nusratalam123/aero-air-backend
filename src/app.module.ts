import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AirQualityModule } from './air-quality/air-quality.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [UserModule, AuthModule, AirQualityModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/signup', method: RequestMethod.POST }
      )
      .forRoutes('*'); // Apply to all other routes
  }
}
