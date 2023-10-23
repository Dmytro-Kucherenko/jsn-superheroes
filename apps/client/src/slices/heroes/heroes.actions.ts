import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AsyncThunkConfig } from '../../libs/types';
import type { HeroGetAllResponseDto, HeroItemResponseDto, HeroUpsertRequestDto } from '../../packages/heroes/types/index.js';
import { name as sliceName } from './heroes.slice.js';

const getAllHeroes = createAsyncThunk<
  HeroGetAllResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-all-heroes`, async (_, { extra }) => {
  const { heroesApi } = extra;

  return await heroesApi.getAll();
});

const createHero = createAsyncThunk<
  HeroItemResponseDto,
  HeroUpsertRequestDto,
  AsyncThunkConfig
>(`${sliceName}/create-hero`, async (hero, { extra }) => {
  const { heroesApi } = extra;

  return await heroesApi.create(hero);
});

const updateHero = createAsyncThunk<
  HeroItemResponseDto,
  { id: number, hero: HeroUpsertRequestDto },
  AsyncThunkConfig
>(`${sliceName}/update-hero`, async ({id, hero}, { extra }) => {
  const { heroesApi } = extra;

  return await heroesApi.update(id, hero);
});

const deleteHero = createAsyncThunk<
  HeroItemResponseDto,
  number,
  AsyncThunkConfig
>(`${sliceName}/delete-hero`, async (id, { extra }) => {
  const { heroesApi } = extra;

  return await heroesApi.delete(id);
});

export { getAllHeroes, createHero, updateHero, deleteHero };
