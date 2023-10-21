import { IsNumberString, IsInt } from 'class-validator';

class HeroRequestParams {
  @IsNumberString()
  //@Type(() => Number)
  @IsInt()
  id!: number;
}

export { HeroRequestParams };
