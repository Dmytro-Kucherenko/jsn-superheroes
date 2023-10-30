import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  HttpCode,
  Put,
  Delete,
} from '@nestjs/common';
import { HeroesService } from './heroes.service';
import {
  HeroUpsertRequestDto,
  HeroItemResponseDto,
  HeroRequestParams,
  HeroGetAllResponseDto,
} from './libs/types';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Get(':id')
  @HttpCode(200)
  getById(@Param() { id }: HeroRequestParams): Promise<HeroItemResponseDto> {
    return this.heroesService.getById(id);
  }

  @Get()
  @HttpCode(200)
  getAll(): Promise<HeroGetAllResponseDto> {
    return this.heroesService.getAll();
  }

  @Post()
  @HttpCode(201)
  create(@Body() body: HeroUpsertRequestDto): Promise<HeroItemResponseDto> {
    return this.heroesService.create(body);
  }

  @Put(':id')
  @HttpCode(200)
  update(
    @Param() { id }: HeroRequestParams,
    @Body() body: HeroUpsertRequestDto,
  ): Promise<HeroItemResponseDto> {
    return this.heroesService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(200)
  delete(@Param() { id }: HeroRequestParams): Promise<HeroItemResponseDto> {
    return this.heroesService.delete(id);
  }
}
