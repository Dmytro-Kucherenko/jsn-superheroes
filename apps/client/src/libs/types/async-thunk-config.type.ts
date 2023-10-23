import { type store } from '../packages/store';

type AsyncThunkConfig = {
  state: ReturnType<typeof store.instance.getState>;
  dispatch: typeof store.instance.dispatch;
  extra: typeof store.extra;
};

export { type AsyncThunkConfig };
