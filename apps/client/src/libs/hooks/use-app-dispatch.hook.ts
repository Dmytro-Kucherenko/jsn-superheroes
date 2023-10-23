import { useDispatch } from 'react-redux';
import { type store } from '../packages/store';

const useAppDispatch: () => typeof store.instance.dispatch = () => {
  return useDispatch<typeof store.instance.dispatch>();
};

export { useAppDispatch };
