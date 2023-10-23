import { Base64File } from '../../../libs/types/index.js';

type HeroItemFormPayload = {
  nickname: string;
  realName: string;
  description: string;
  powers: string;
  phrase: string;
  images: Base64File[];
};

export { HeroItemFormPayload };
