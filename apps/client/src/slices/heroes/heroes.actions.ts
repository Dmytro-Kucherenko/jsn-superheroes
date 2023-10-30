import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AsyncThunkConfig } from '../../libs/types';
import type {
  HeroGetAllResponseDto,
  HeroItemResponseDto,
  HeroUpsertRequestDto,
} from '../../packages/heroes/types';
import { NotificationType } from '../../libs/packages/notification';
import { appActions } from '../app';
import { name as sliceName } from './heroes.slice';

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
>(`${sliceName}/create-hero`, async (hero, { extra, dispatch }) => {
  const { heroesApi } = extra;

  const createdHero = await heroesApi.create(hero);
  dispatch(
    appActions.notify({
      type: NotificationType.SUCCESS,
      message: `Hero ${createdHero.nickname} was created.`,
    }),
  );

  return createdHero;
});

const updateHero = createAsyncThunk<
  HeroItemResponseDto,
  { id: number; hero: HeroUpsertRequestDto },
  AsyncThunkConfig
>(`${sliceName}/update-hero`, async ({ id, hero }, { extra, dispatch }) => {
  const { heroesApi } = extra;

  const updatedHero = await heroesApi.update(id, hero);
  dispatch(
    appActions.notify({
      type: NotificationType.INFO,
      message: `Hero ${updatedHero.nickname} was updated.`,
    }),
  );

  return updatedHero;
});

const deleteHero = createAsyncThunk<
  HeroItemResponseDto,
  number,
  AsyncThunkConfig
>(`${sliceName}/delete-hero`, async (id, { extra, dispatch }) => {
  const { heroesApi } = extra;

  const deletedHero = await heroesApi.delete(id);
  dispatch(
    appActions.notify({
      type: NotificationType.WARNING,
      message: `Hero ${deletedHero.nickname} was deleted.`,
    }),
  );

  return deletedHero;
});

export { getAllHeroes, createHero, updateHero, deleteHero };
