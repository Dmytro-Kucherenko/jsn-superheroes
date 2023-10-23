import type { EnvironmentSchema } from './libs/types';

class Config {
  public ENV: EnvironmentSchema;

  public constructor() {
    this.ENV = {
      API_URL: import.meta.env.VITE_APP_SERVER_URL,
    };
  }
}

export { Config };
