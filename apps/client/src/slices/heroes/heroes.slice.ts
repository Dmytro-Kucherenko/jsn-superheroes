import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { DataStatus } from '../../libs/enums';
import {
  getAllHeroes,
  createHero,
  updateHero,
  deleteHero,
} from './heroes.actions';
import { HeroGetAllResponseDto } from '../../packages/heroes/types';

const initialState: {
  heroes: HeroGetAllResponseDto;
  getAllDataStatus: DataStatus;
  upsertDataStatus: DataStatus;
  selectedPage: number;
} = {
  heroes: [],
  getAllDataStatus: DataStatus.IDLE,
  upsertDataStatus: DataStatus.IDLE,
  selectedPage: 0,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'meditation',
  reducers: {
    selectPage: (
      state,
      action: {
        payload: number;
        type: string;
      },
    ) => {
      state.selectedPage = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllHeroes.pending, (state) => {
      state.getAllDataStatus = DataStatus.PENDING;
    });
    builder.addCase(getAllHeroes.fulfilled, (state, action) => {
      state.heroes = action.payload;
      state.getAllDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(getAllHeroes.rejected, (state) => {
      state.getAllDataStatus = DataStatus.REJECTED;
    });

    builder.addCase(createHero.fulfilled, (state, action) => {
      state.heroes.push(action.payload);
      state.upsertDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(updateHero.fulfilled, (state, action) => {
      const heroes = state.heroes.filter(
        (hero) => hero.id !== action.payload.id,
      );
      heroes.unshift(action.payload);
      state.heroes = heroes;
      state.upsertDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(deleteHero.fulfilled, (state, action) => {
      state.heroes = state.heroes.filter(
        (hero) => hero.id !== action.payload.id,
      );
      state.upsertDataStatus = DataStatus.FULFILLED;
    });

    builder.addMatcher(
      isAnyOf(createHero.pending, updateHero.pending, deleteHero.pending),
      (state) => {
        state.upsertDataStatus = DataStatus.PENDING;
      },
    );
    builder.addMatcher(
      isAnyOf(createHero.pending, updateHero.pending, deleteHero.pending),
      (state) => {
        state.upsertDataStatus = DataStatus.REJECTED;
      },
    );
  },
});

export { actions, name, reducer };
