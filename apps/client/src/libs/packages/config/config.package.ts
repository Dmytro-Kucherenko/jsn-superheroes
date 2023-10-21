import type { EnvironmentSchema } from './libs/types/types.js';

class Config {
  public ENV: EnvironmentSchema;

  public constructor() {
    this.ENV = {
      API_URL: import.meta.env.VITE_APP_API_ORIGIN_URL,
    };
  }
}

export { Config };
