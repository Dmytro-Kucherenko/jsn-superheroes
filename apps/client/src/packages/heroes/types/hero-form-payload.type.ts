import type { Base64File } from '../../../libs/types';

type HeroItemFormPayload = {
  nickname: string;
  realName: string;
  description: string;
  powers: string;
  phrase: string;
  images: Base64File[];
};

export type { HeroItemFormPayload };
