import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Allow frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Allow cookies and credentials if needed
  });

   // Enable Cookie Parser
   app.use(cookieParser());


  await app.listen(process.env.PORT || 7000);
}
bootstrap();
