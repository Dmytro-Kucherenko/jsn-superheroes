import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroesController } from './heroes.controller.js';
import { HeroesService } from './heroes.service.js';
import { HeroEntity } from './hero.entity.js';
import { HeroesRepository } from './heroes.repository.js';
import { HeroImageEntity } from './hero-image.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([HeroEntity, HeroImageEntity])],
  controllers: [HeroesController],
  providers: [HeroesService, HeroesRepository],
})
export class HeroesModule {}
