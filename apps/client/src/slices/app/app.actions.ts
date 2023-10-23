import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationPayload } from '../../libs/packages/notification';
import { AsyncThunkConfig } from '../../libs/types';

const notify = createAsyncThunk<unknown, NotificationPayload, AsyncThunkConfig>(
  `app/notify`,
  (payload, { extra }) => {
    const { notification } = extra;
    const { type, message } = payload;

    notification[type](message);
  },
);

export { notify };
