type HeroUpsertRequestDto = {
  nickname: string;
  realName: string;
  description: string;
  powers: string[];
  phrase: string;
  images: Buffer[];
};

export { type HeroUpsertRequestDto };
