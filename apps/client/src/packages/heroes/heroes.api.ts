import { ApiRoute, ContentType } from '../../libs/enums';
import { Api } from '../../libs/packages/api';
import type {
  HeroGetAllResponseDto,
  HeroItemResponseDto,
  HeroUpsertRequestDto,
} from './types';

class HeroesApi extends Api {
  constructor(baseUrl: string) {
    super({ baseUrl, path: ApiRoute.HEROES });
  }

  getAll() {
    return this.load<HeroGetAllResponseDto>({ method: 'GET' });
  }

  getById(id: number) {
    return this.load<HeroItemResponseDto>({ method: 'GET' }, id.toString());
  }

  create(hero: HeroUpsertRequestDto) {
    return this.load<HeroItemResponseDto>({
      method: 'POST',
      payload: JSON.stringify(hero),
      contentType: ContentType.JSON,
    });
  }

  update(id: number, hero: HeroUpsertRequestDto) {
    return this.load<HeroItemResponseDto>(
      {
        method: 'PUT',
        payload: JSON.stringify(hero),
        contentType: ContentType.JSON,
      },
      id.toString(),
    );
  }

  delete(id: number) {
    return this.load<HeroItemResponseDto>({ method: 'DELETE' }, id.toString());
  }
}

export { HeroesApi };
