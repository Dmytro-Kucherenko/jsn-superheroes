import { HttpCode } from '../../enums';
import { HttpError } from '../../exceptions';
import type { ApiOptions } from './libs/types';

class Api {
  private baseUrl: string;

  private path: string;

  public constructor({ baseUrl, path }: { baseUrl: string; path: string }) {
    this.baseUrl = baseUrl;
    this.path = path;
  }

  public async load<T>(path: string, options: ApiOptions): Promise<T> {
    const { method, payload = null } = options;

    const endpoint = [this.baseUrl, this.path, path].join('/');

    const response = await fetch(endpoint, {
      method,
      body: payload,
    });

    return (await this.handleResponse(response)).json() as T;
  }

  private async handleResponse(response: Response): Promise<Response> {
    if (!response.ok) {
      try {
        const { statusCode, message, cause } = await response.json();
        throw new HttpError({
          status: statusCode as HttpCode,
          message: message,
          cause: cause,
        });
      } catch {
        throw new HttpError({
          status: HttpCode.BAD_REQUEST,
          message: 'Unknown error',
        });
      }
    }

    return response;
  }
}

export { Api };
