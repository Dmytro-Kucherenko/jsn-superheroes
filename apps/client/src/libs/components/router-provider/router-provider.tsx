import {
  RouterProvider as LibraryRouterProvider,
  Navigate,
  createBrowserRouter,
} from 'react-router-dom';
import { AppRoute } from '../../enums';
import { HeroesList } from '../../../pages/heroes-list/heroes-list';
import { HeroCreate } from '../../../pages/hero-create/hero-create';
import { HeroInfo } from '../../../pages/hero-info/hero-info';
import { App } from '../app/app';
import { HeroesWrapper } from '../heroes-wrapper/heroes-wrapper';

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
