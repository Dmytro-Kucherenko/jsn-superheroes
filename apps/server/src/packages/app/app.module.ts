import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from '../../libs/packages/database';
import { HeroesModule } from '../heroes';

@Module({
  imports: [
    HeroesModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(databaseConfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
