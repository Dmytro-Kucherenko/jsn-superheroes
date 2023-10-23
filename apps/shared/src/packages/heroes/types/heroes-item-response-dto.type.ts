import { Base64File } from 'src/libs/types';

type HeroItemResponseDto = {
  id: number;
  nickname: string;
  realName: string;
  description: string;
  powers: string;
  phrase: string;
  images: Base64File[];
  createdAt: Date;
  updatedAt: Date;
};

export type { HeroItemResponseDto };
