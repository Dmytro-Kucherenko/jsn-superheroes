type HeroItemResponseDto = {
  id: number;
  nickname: string;
  realName: string;
  description: string;
  powers: string[];
  phrase: string;
  images: Buffer[];
  createdAt: Date;
  updatedAt: Date;
};

export type { HeroItemResponseDto };
