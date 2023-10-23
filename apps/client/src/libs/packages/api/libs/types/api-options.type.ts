import { ContentType } from '../../../../enums';

type ApiOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  payload?: BodyInit | null;
  contentType?: ContentType;
};

export type { ApiOptions };
