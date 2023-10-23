import { ContentType } from "../../../../enums/index.js";

type ApiOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  payload?: BodyInit | null;
  contentType?: ContentType;
};

export type { ApiOptions };
