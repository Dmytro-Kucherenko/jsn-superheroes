import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as LibraryRepository } from 'typeorm';
import { HeroEntity } from './hero.entity';
import { HeroItem } from './hero.item.js';
import { Repository } from 'src/libs/types';

@Injectable()
class HeroesRepository implements Repository<HeroItem> {
  constructor(
    @InjectRepository(HeroEntity)
    private heroesRepository: LibraryRepository<HeroEntity>,
  ) {}

  async create({
    nickname,
    realName,
    description,
    powers,
    phrase,
    images,
  }: HeroItem): Promise<HeroItem> {
    const hero = this.heroesRepository.create({
      nickname,
      realName,
      description,
      powers,
      phrase,
      images,
    });

    const savedHero = await this.heroesRepository.save(hero);

    return new HeroItem(savedHero);
  }

  async findById(id: number): Promise<HeroItem | null> {
    const hero = await this.heroesRepository.findOneBy({ id });
    return hero ? new HeroItem(hero) : null;
  }

  async findAll(): Promise<HeroItem[]> {
    const heroes = await this.heroesRepository.find({ relations: ['images'] });

    return heroes.map((hero) => new HeroItem(hero));
  }

  async update(hero: HeroItem): Promise<HeroItem> {
    const { id, nickname, realName, description, powers, phrase, images } =
      hero.fields;

    const createdHero = this.heroesRepository.create({
      id: id as number,
      nickname,
      realName,
      description,
      powers,
      phrase,
      images,
      updatedAt: new Date(),
    });

    const updateHero = await this.heroesRepository.save(createdHero);

    return new HeroItem(updateHero);
  }

  async delete(id: number): Promise<number> {
    const { affected } = await this.heroesRepository.delete(id);

    return affected ?? 0;
  }
}

export { HeroesRepository };
