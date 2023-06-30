import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'https://toni-weckroth.onrender.com/'],
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(1337);
}

bootstrap();
