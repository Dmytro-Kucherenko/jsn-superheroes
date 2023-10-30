import {
  getAllHeroes,
  createHero,
  updateHero,
  deleteHero,
} from './heroes.actions';
import { actions } from './heroes.slice';

const heroesActions = {
  ...actions,
  getAllHeroes,
  createHero,
  updateHero,
  deleteHero,
};

export { heroesActions };
export { reducer as heroesReducer } from './heroes.slice';
