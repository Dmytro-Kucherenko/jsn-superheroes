import { ConfigModule, ConfigService } from '@nestjs/config';
import type { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

const databaseConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    username: config.getOrThrow('DB_USERNAME'),
    password: config.getOrThrow('DB_PASSWORD'),
    database: config.getOrThrow('DB_NAME'),
    host: config.getOrThrow('DB_HOST'),
    port: config.getOrThrow('DB_PORT'),
    autoLoadEntities: true,
    synchronize: true,
  }),
  inject: [ConfigService],
};

export { databaseConfig };
