import { Base64File } from '../../libs/types';

class HeroItem {
  public id: number | null;
  public nickname: string;
  public realName: string;
  public description: string;
  public powers: string;
  public phrase: string;
  public images: Base64File[];
  public createdAt: Date;
  public updatedAt: Date;

  constructor(hero: {
    id?: number;
    nickname: string;
    realName: string;
    description: string;
    powers: string;
    phrase: string;
    images: Base64File[];
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = hero.id ?? null;
    this.nickname = hero.nickname;
    this.realName = hero.realName;
    this.description = hero.description;
    this.powers = hero.powers;
    this.phrase = hero.phrase;
    this.images = hero.images;
    this.createdAt = hero.createdAt ?? new Date();
    this.updatedAt = hero.updatedAt ?? new Date();
  }

  get fields() {
    return {
      id: this.id as number,
      nickname: this.nickname,
      realName: this.realName,
      description: this.description,
      powers: this.powers,
      phrase: this.phrase,
      images: this.images,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export { HeroItem };
