import { Base64File } from 'src/libs/types';

type HeroUpsertRequestDto = {
  nickname: string;
  realName: string;
  description: string;
  powers: string;
  phrase: string;
  images: Base64File[];
};

export { type HeroUpsertRequestDto };
