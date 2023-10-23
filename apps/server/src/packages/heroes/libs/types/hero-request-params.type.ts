import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

class HeroRequestParams {
  @Type(() => Number)
  @IsNumber()
  id!: number;
}

export { HeroRequestParams };
