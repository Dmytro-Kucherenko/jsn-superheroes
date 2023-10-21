import { HttpCode } from '../enums/enums.js';

class HttpError extends Error {
  public status: HttpCode;

  public constructor({
    message,
    status,
    cause,
  }: {
    message: string;
    status: HttpCode;
    cause?: string;
  }) {
    super(message, { cause });

    this.status = status;
  }
}

export { HttpError };
