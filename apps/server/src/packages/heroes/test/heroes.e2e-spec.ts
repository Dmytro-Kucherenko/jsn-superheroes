import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HeroesModule } from '../heroes.module';
import { HeroEntity } from '../hero.entity';
import { HeroImageEntity } from '../hero-image.entity';

describe('HeroesController (e2e)', () => {
  let app: INestApplication;

  const mockedHeroesRepository = {
    find: jest.fn().mockReturnValue(Promise.resolve([])),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HeroesModule],
    })
      .overrideProvider(getRepositoryToken(HeroEntity))
      .useValue(mockedHeroesRepository)
      .overrideProvider(getRepositoryToken(HeroImageEntity))
      .useValue(mockedHeroesRepository)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('/heroes (GET)',  () => {
    it('should return success', async () => {
      await request(app.getHttpServer())
        .get('/heroes')
        .expect(200);

      expect(mockedHeroesRepository.find).toBeCalled();
    });
  });
});
