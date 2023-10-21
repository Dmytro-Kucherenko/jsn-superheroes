import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { type HeroUpsertRequestDto as HeroUpsertRequestDtoSchema } from 'shared/src';

class HeroUpsertRequestDto implements HeroUpsertRequestDtoSchema {
  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  realName: string;

  @IsNotEmpty()
  description: string;

  @IsString({ each: true })
  powers: string[];

  @IsNotEmpty()
  phrase: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  images: Buffer[];
}

export { HeroUpsertRequestDto };