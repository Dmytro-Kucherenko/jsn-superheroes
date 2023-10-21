import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AppModule } from './packages/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      const cause = errors.map((error) => error.constraints[Object.keys(error.constraints)[0]]);
      return new BadRequestException('Validation is failed.', { cause });
    },
    transform: true,
  }));
  await app.listen(configService.get('PORT'));
}

bootstrap();
