import { Injectable, NotFoundException } from '@nestjs/common';
import { HeroUpsertRequestDto, HeroItemResponseDto } from './libs/types';
import { HeroesRepository } from './heroes.repository';
import { HeroItem } from './hero.item';

@Injectable()
export class HeroesService {
  constructor(private heroesRepository: HeroesRepository) {}

  async getById(id: number): Promise<HeroItemResponseDto> {
    const hero = await this.heroesRepository.findById(id);

    if (!hero) {
      throw new NotFoundException('Hero was not found.');
    }

    return hero.fields;
  }

  async getAll(): Promise<HeroItemResponseDto[]> {
    const heroes = await this.heroesRepository.findAll();

    return heroes.map((hero) => hero.fields);
  }

  async create(hero: HeroUpsertRequestDto): Promise<HeroItemResponseDto> {
    const createdHero = await this.heroesRepository.create(new HeroItem(hero));

    return createdHero.fields;
  }

  async update(
    id: number,
    {
      nickname,
      realName,
      description,
      powers,
      phrase,
      images,
    }: HeroUpsertRequestDto,
  ): Promise<HeroItemResponseDto> {
    const foundHero = await this.heroesRepository.findById(id as number);

    if (!foundHero) {
      throw new NotFoundException('Hero was not found.');
    }

    const updatedHero = await this.heroesRepository.update(
      new HeroItem({
        id,
        nickname,
        realName,
        description,
        powers,
        phrase,
        images,
      }),
    );

    return updatedHero.fields;
  }

  async delete(id: number): Promise<HeroItemResponseDto> {
    const hero = await this.heroesRepository.findById(id);

    if (!hero) {
      throw new NotFoundException('Hero was not found.');
    }

    await this.heroesRepository.delete(id);
    return hero.fields;
  }
}
