import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';
import { HeroEntity } from './hero.entity';
import { HeroesRepository } from './heroes.repository';
import { HeroImageEntity } from './hero-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HeroEntity, HeroImageEntity])],
  controllers: [HeroesController],
  providers: [HeroesService, HeroesRepository],
})
export class HeroesModule {}
