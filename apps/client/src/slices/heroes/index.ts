import {
  getAllHeroes,
  createHero,
  updateHero,
  deleteHero,
} from './heroes.actions.js';
import { actions } from './heroes.slice.js';

const heroesActions = {
  ...actions,
  getAllHeroes,
  createHero,
  updateHero,
  deleteHero,
};

export { heroesActions };
export { reducer as heroesReducer } from './heroes.slice.js';
