import { HttpCode } from '../enums';

class HttpError extends Error {
  public status: HttpCode;

  public constructor({
    message,
    status,
    cause,
  }: {
    message: string;
    status: HttpCode;
    cause?: unknown;
  }) {
    super(message, { cause });

    this.status = status;
  }
}

export { HttpError };
