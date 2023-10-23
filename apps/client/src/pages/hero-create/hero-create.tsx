import { useNavigate } from 'react-router';
import { HeroForm } from '../../libs/components';
import { useAppDispatch } from '../../libs/hooks';
import { AppRoute } from '../../libs/enums/app-route.enum.js';
import type { HeroItemFormPayload } from '../../packages/heroes';
import { heroesActions } from '../../slices/heroes';

const HeroCreate: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = (hero: HeroItemFormPayload) => {
    dispatch(heroesActions.createHero(hero))
      .unwrap()
      .then((hero) => {
        navigate(AppRoute.HERO_$ID.replace(':id', hero.id.toString()));
      });
  };

  return (
    <HeroForm editable={false} label="Create new hero" onSubmit={handleClick} />
  );
};

export { HeroCreate };
