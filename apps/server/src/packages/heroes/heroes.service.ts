import { Injectable, NotFoundException } from '@nestjs/common';
import { HeroUpsertRequestDto, HeroItemResponseDto } from './libs/types';
import { HeroesRepository } from './heroes.repository.js';
import { HeroItem } from './hero.item.js';

@Injectable()
export class HeroesService {
  constructor(private heroesRepository: HeroesRepository) {}

  async getById(id: number): Promise<HeroItemResponseDto> {
    const hero = await this.heroesRepository.findById(id);

    if (!hero) {
      throw new NotFoundException('Hero was not found.');
    }

    return hero;
  }

  getAll(): Promise<HeroItemResponseDto[]> {
    return this.heroesRepository.findAll();
  }

  create(hero: HeroUpsertRequestDto): HeroItemResponseDto {
    return this.heroesRepository.create(new HeroItem(hero));
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

    if (!updatedHero) {
      throw new NotFoundException('Hero was not found.');
    }

    return updatedHero;
  }

  async delete(id: number): Promise<HeroItemResponseDto> {
    const hero = await this.heroesRepository.delete(id);

    if (!hero) {
      throw new NotFoundException('Hero was not found.');
    }

    return hero;
  }
}
