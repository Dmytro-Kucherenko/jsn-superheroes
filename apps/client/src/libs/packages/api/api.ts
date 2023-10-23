import { ContentType, HttpCode } from '../../enums';
import { HttpError } from '../../exceptions';
import type { ApiOptions } from './libs/types';

class Api {
  private baseUrl: string;

  private path: string;

  public constructor({ baseUrl, path }: { baseUrl: string; path: string }) {
    this.baseUrl = baseUrl;
    this.path = path;
  }

  public async load<T>(options: ApiOptions, path?: string): Promise<T> {
    const { method, payload = null, contentType } = options;

    const endpoint = [this.baseUrl, this.path, path].join('/');
    const headers = new Headers();

    if (contentType) {
      headers.append('content-type', ContentType.JSON);
    }

    const response = await fetch(endpoint, {
      method,
      headers,
      body: payload,
    });

    return this.handleResponse<T>(response);
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json().catch((error) => {
      throw new HttpError({
        status: HttpCode.INTERNAL_SERVER_ERROR,
        message: 'Response is not json.',
        cause: error,
      });
    });

    if (!response.ok) {
      if ('statusCode' in data && 'message' in data) {
        const { statusCode, message, cause } = data;

        throw new HttpError({
          status: statusCode as HttpCode,
          message,
          cause,
        });
      }

      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: 'Unknown exception.',
        cause: data,
      });
    }

    return data as T;
  }
}

export { Api };
