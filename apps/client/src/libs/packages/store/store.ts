import {
  type AnyAction,
  configureStore,
  MiddlewareArray,
  ThunkMiddleware,
} from '@reduxjs/toolkit';
import { heroesApi } from '../../../packages/heroes';
import { heroesReducer } from '../../../slices/heroes';

type Reducers = {
  heroes: ReturnType<typeof heroesReducer>;
};

type ExtraArgument = {
  heroesApi: typeof heroesApi;
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
      ],
    });
  }
}

export { Store };

// const store = configureStore({
//   devTools: true,
//   reducer: {
//     heroes: heroesReducer,
//   },
//   middleware: (getDefaultMiddleware) => [
//     ...getDefaultMiddleware(),
//   ]
// });
