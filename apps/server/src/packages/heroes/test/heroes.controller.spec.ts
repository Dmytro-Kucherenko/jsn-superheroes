import { type TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroesController } from '../heroes.controller';
import { HeroEntity } from '../hero.entity';
import { HeroImageEntity } from '../hero-image.entity';
import { HeroesService } from '../heroes.service';
import { HeroesRepository } from '../heroes.repository';

describe('HeroesController', () => {
  let controller: HeroesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([HeroEntity, HeroImageEntity])],
      controllers: [HeroesController],
      providers: [HeroesService, HeroesRepository],
    }).compile();

    controller = module.get<HeroesController>(HeroesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
