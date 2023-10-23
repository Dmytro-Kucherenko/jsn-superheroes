import type { store } from '../index.js';

type AppDispatch = typeof store.instance.dispatch;

export type { AppDispatch };
