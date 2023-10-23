import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

const databaseConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (config: ConfigService) =>
    ({
      username: config.getOrThrow('DB_USERNAME'),
      password: config.getOrThrow('DB_PASSWORD'),
      database: config.getOrThrow('DB_NAME'),
      type: config.getOrThrow('DB_TYPE'),
      host: config.getOrThrow('DB_HOST'),
      port: config.getOrThrow('DB_PORT'),
      autoLoadEntities: true,
      synchronize: true,
    }) as TypeOrmModuleOptions,
  inject: [ConfigService],
};

export { databaseConfig };
