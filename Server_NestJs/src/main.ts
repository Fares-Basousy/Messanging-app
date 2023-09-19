import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  require('dotenv').config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe)
  await app.listen(4000);
  console.log('running on local http://localhost:4000/')
}
bootstrap();
