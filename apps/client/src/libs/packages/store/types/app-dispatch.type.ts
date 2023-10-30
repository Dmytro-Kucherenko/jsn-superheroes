import type { store } from '../index';

type AppDispatch = typeof store.instance.dispatch;

export type { AppDispatch };
