import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

const databaseConfig = {
  imports: [ConfigModule],
  useFactory: (config: ConfigService) => ({
    username: config.get('DB_USERNAME'),
    password: config.get('DB_PASSWORD'),
    database: config.get('DB_NAME'),
    type: config.get('DB_TYPE'),
    host: config.get('DB_HOST'),
    port: config.get('DB_PORT'),
    autoLoadEntities: true,
    synchronize: true,
  }),
  inject: [ConfigService],
} as TypeOrmModuleAsyncOptions;

export { databaseConfig };
