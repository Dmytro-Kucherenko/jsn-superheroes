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

  create({
    nickname,
    realName,
    description,
    powers,
    phrase,
    images,
  }: HeroItem): HeroItem {
    const hero = this.heroesRepository.create({
      nickname,
      realName,
      description,
      powers,
      phrase,
      images,
    });

    return new HeroItem(hero);
  }

  async findById(id: number): Promise<HeroItem | null> {
    const hero = await this.heroesRepository.findOneBy({ id });
    return hero ? new HeroItem(hero) : null;
  }

  async findAll(): Promise<HeroItem[]> {
    const heroes = await this.heroesRepository.find()
    return heroes.map(hero => new HeroItem(hero));
  }

  async update({
    id,
    nickname,
    realName,
    description,
    powers,
    phrase,
    images,
  }: HeroItem): Promise<HeroItem> {
    const foundHero = await this.findById(id);

    if(!foundHero) {
      return null;
    }

    const hero = await this.heroesRepository.save({
      id,
      nickname,
      realName,
      description,
      powers,
      phrase,
      images,
      updatedAt: new Date(),
    });

    return new HeroItem(hero);
  }

  async delete(id: number): Promise<HeroItem> {
    const foundHero = await this.findById(id);

    if(!foundHero) {
      return null;
    }

    await this.heroesRepository.delete(id);
    return new HeroItem(foundHero);
  }
}

export { HeroesRepository };
