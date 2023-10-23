import {
  type AnyAction,
  configureStore,
  MiddlewareArray,
  ThunkMiddleware,
} from '@reduxjs/toolkit';
import { heroesApi } from '../../../packages/heroes';
import { heroesReducer } from '../../../slices/heroes';
import { notification } from '../notification';
import { handleError } from './middlewares';

type Reducers = {
  heroes: ReturnType<typeof heroesReducer>;
};

type ExtraArgument = {
  heroesApi: typeof heroesApi;
  notification: typeof notification;
};

class Store {
  public extra: ExtraArgument;

  public instance: ReturnType<
    typeof configureStore<
      Reducers,
      AnyAction,
      MiddlewareArray<[ThunkMiddleware<Reducers, AnyAction, ExtraArgument>]>
    >
  >;

  public constructor() {
    this.extra = {
      heroesApi,
      notification,
    };

    this.instance = configureStore({
      devTools: true,
      reducer: {
        heroes: heroesReducer,
      },
      middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
          thunk: {
            extraArgument: this.extra,
          },
        }),
        handleError,
      ],
    });
  }
}

export { Store };
