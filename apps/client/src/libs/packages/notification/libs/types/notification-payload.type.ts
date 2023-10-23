import { type NotificationType } from '../enums';

type NotificationPayload = {
  type: NotificationType;
  message: string;
};

export { type NotificationPayload };
