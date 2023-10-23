import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './packages/app';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });
  const configService = app.get(ConfigService);
  app.enableCors();
  app.useBodyParser('json', { limit: '10mb' });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const cause = errors.map(
          (error) => error.constraints?.[Object.keys(error.constraints)[0]],
        );
        return new BadRequestException('Validation is failed.', { cause });
      },
      transform: true,
    }),
  );
  await app.listen(Number(configService.getOrThrow('PORT')));
}

bootstrap();
