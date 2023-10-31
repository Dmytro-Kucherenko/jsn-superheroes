import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HeroesModule } from '../heroes.module';
import { HeroEntity } from '../hero.entity';
import { HeroImageEntity } from '../hero-image.entity';
import type { HeroUpsertRequestDto, HeroItemResponseDto } from '../libs/types';
import { ContentType } from '../../../libs/enums';

describe('HeroesController (e2e)', () => {
  let app: INestApplication;

  const dateNow = new Date();

  const createHeroEntity = (hero: HeroUpsertRequestDto): HeroItemResponseDto => ({
    ...hero,
    id: 1,
    createdAt: dateNow,
    updatedAt: dateNow,
  });

  const transformHeroWithDate = (hero: HeroItemResponseDto): HeroItemResponseDto => ({
    ...hero,
    createdAt: new Date(hero.createdAt),
    updatedAt: new Date(hero.updatedAt),
  });

  const mockedRequestHero: HeroUpsertRequestDto = {
    nickname: 'Nickname',
    realName: 'Real name',
    description: 'Description',
    powers: 'Superpowers',
    phrase: 'Hey',
    images: [{
      binary: 'Binary code',
      contentType: ContentType.JPEG,
    }],
  };

  const mockedResponseHero = createHeroEntity(mockedRequestHero);

  const mockedHeroesRepository = {
    find: jest.fn().mockReturnValue(Promise.resolve([mockedResponseHero])),
    findOneBy: jest.fn().mockImplementation(({ id }: {id: number}) => Promise.resolve(id === mockedResponseHero.id ? mockedResponseHero : null)),
    create: jest.fn().mockImplementation((hero: HeroUpsertRequestDto) => createHeroEntity(hero)),
    save: jest.fn().mockImplementation((hero: HeroItemResponseDto) => Promise.resolve(hero)),
    delete: jest.fn().mockImplementation((id: number) => Promise.resolve(id === mockedResponseHero.id ? { affected: 1 } : { affected: 0 })),
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
    await app.init();
  });

  describe('/heroes (GET)',  () => {
    it('should return success', async () => {
      await request(app.getHttpServer())
        .get('/heroes')
        .expect(HttpStatus.OK)
        .then((response) => {
          expect((response.body as HeroItemResponseDto[]).map((hero) => transformHeroWithDate(hero))).toEqual([mockedResponseHero]);
        });

      expect(mockedHeroesRepository.find).toBeCalled();
    });
  });

  describe('/heroes/:id (GET)',  () => {
    it('should return success', async () => {
      await request(app.getHttpServer())
        .get('/heroes/:id'.replace(':id', mockedResponseHero.id.toString()))
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(transformHeroWithDate(response.body)).toEqual(mockedResponseHero);
        });

      expect(mockedHeroesRepository.findOneBy).toBeCalled();
    });

    it('should return validation error', async () => {
      const invalidId = 'string';

      await request(app.getHttpServer())
        .get('/heroes/:id'.replace(':id', invalidId))
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return not found error', async () => {
      const invalidId = 2;

      await request(app.getHttpServer())
        .get('/heroes/:id'.replace(':id', invalidId.toString()))
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/heroes (POST)',  () => {
    it('should return success', async () => {
      await request(app.getHttpServer())
        .post('/heroes')
        .send(mockedRequestHero)
        .expect(HttpStatus.CREATED)
        .then((response) => {
          expect(transformHeroWithDate(response.body)).toEqual(mockedResponseHero);
        });

      expect(mockedHeroesRepository.create).toBeCalled();
      expect(mockedHeroesRepository.save).toBeCalled();
    });

    it('should return validation error', async () => {
      await request(app.getHttpServer())
        .post('/heroes')
        .send({ data: 'falsy' })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/heroes (PUT)',  () => {
    it('should return success', async () => {
      await request(app.getHttpServer())
        .put('/heroes/:id'.replace(':id', mockedResponseHero.id.toString()))
        .send(mockedRequestHero)
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(transformHeroWithDate(response.body)).toEqual(mockedResponseHero);
        });

      expect(mockedHeroesRepository.findOneBy).toBeCalled();
      expect(mockedHeroesRepository.create).toBeCalled();
      expect(mockedHeroesRepository.save).toBeCalled();
    });

    it('should return not found error', async () => {
      const invalidId = 2;

      await request(app.getHttpServer())
        .put('/heroes/:id'.replace(':id', invalidId.toString()))
        .send(mockedRequestHero)
        .expect(HttpStatus.NOT_FOUND);

      expect(mockedHeroesRepository.findOneBy).toBeCalled();
    });

    it('should return validation error', async () => {
      await request(app.getHttpServer())
        .put('/heroes/:id'.replace(':id', mockedResponseHero.id.toString()))
        .send({ data: 'falsy' })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/heroes/:id (DELETE)',  () => {
    it('should return success', async () => {
      await request(app.getHttpServer())
        .delete('/heroes/:id'.replace(':id', mockedResponseHero.id.toString()))
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(transformHeroWithDate(response.body)).toEqual(mockedResponseHero);
        });

      expect(mockedHeroesRepository.findOneBy).toBeCalled();
      expect(mockedHeroesRepository.delete).toBeCalled();
    });

    it('should return validation error', async () => {
      const invalidId = 'string';

      await request(app.getHttpServer())
        .delete('/heroes/:id'.replace(':id', invalidId))
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return not found error', async () => {
      const invalidId = 2;

      await request(app.getHttpServer())
        .delete('/heroes/:id'.replace(':id', invalidId.toString()))
        .expect(HttpStatus.NOT_FOUND);

      expect(mockedHeroesRepository.findOneBy).toBeCalled();
      expect(mockedHeroesRepository.delete).toBeCalled();
    });
  });
});
