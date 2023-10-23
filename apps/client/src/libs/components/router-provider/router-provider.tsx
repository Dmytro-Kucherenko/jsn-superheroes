import {
  RouterProvider as LibraryRouterProvider,
  Navigate,
  createBrowserRouter,
} from 'react-router-dom';
import { AppRoute } from '../../enums';
import { HeroesList } from '../../../pages/heroes-list/heroes-list.js';
import { HeroCreate } from '../../../pages/hero-create/hero-create.js';
import { HeroInfo } from '../../../pages/hero-info/hero-info.js';
import { App } from '../app/app.js';
import { HeroesWrapper } from '../heroes-wrapper/heroes-wrapper.js';

const RouterProvider: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: AppRoute.ROOT,
      element: <App />,
      children: [
        {
          path: AppRoute.ROOT,
          element: (
            <HeroesWrapper>
              <HeroesList />
            </HeroesWrapper>
          ),
        },
        {
          path: AppRoute.HERO_$ID,
          element: (
            <HeroesWrapper>
              <HeroInfo />
            </HeroesWrapper>
          ),
        },
        {
          path: AppRoute.HERO_CREATE,
          element: (
            <HeroesWrapper>
              <HeroCreate />
            </HeroesWrapper>
          ),
        },
        {
          path: AppRoute.OTHER,
          element: <Navigate to={AppRoute.ROOT} />,
        },
      ],
    },
  ]);

  return <LibraryRouterProvider router={router} />;
};

export { RouterProvider };
