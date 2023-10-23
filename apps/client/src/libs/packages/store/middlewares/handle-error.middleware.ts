import { type AnyAction, isRejected, type Middleware } from '@reduxjs/toolkit';

import { AppDispatch } from '../types';
import { appActions } from '../../../../slices/app';
import { NotificationType } from '../../notification';

const handleError: Middleware<unknown, unknown, AppDispatch> = ({
  dispatch,
}) => {
  return (next) => {
    return (action: AnyAction) => {
      if (isRejected(action)) {
        void dispatch(
          appActions.notify({
            message: action.error.message ?? 'Something went wrong',
            type: NotificationType.ERROR,
          }),
        );
      }

      return next(action);
    };
  };
};

export { handleError };
