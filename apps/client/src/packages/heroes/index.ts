import { config } from '../../libs/packages/config';
import { HeroesApi } from './heroes.api.js';

const heroesApi = new HeroesApi(config.ENV.API_URL);

export { heroesApi };
