import { ArrayMinSize, IsArray, IsNotEmpty, IsObject } from 'class-validator';
import { type HeroUpsertRequestDto as HeroUpsertRequestDtoSchema } from 'shared/src';
import { Base64File } from '../../../../libs/types';

class HeroUpsertRequestDto implements HeroUpsertRequestDtoSchema {
  @IsNotEmpty()
  nickname!: string;

  @IsNotEmpty()
  realName!: string;

  @IsNotEmpty()
  description!: string;

  @IsNotEmpty()
  powers!: string;

  @IsNotEmpty()
  phrase!: string;

  @IsArray()
  @IsObject({ each: true })
  @ArrayMinSize(1)
  images!: Base64File[];
}

export { HeroUpsertRequestDto };
