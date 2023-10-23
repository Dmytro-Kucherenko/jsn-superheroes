import { useNavigate, useParams } from 'react-router';
import { HeroForm } from '../../libs/components';
import { useAppDispatch, useAppSelector } from '../../libs/hooks';
import { HeroItemFormPayload } from '../../packages/heroes/types';
import { AppRoute } from '../../libs/enums/app-route.enum.js';
import { heroesActions } from '../../slices/heroes';

const HeroInfo: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const heroes = useAppSelector(({ heroes }) => heroes.heroes);
  const hero = heroes.find(hero => hero.id.toString() === id);
  
  const handleSubmit = (hero: HeroItemFormPayload) => {
    dispatch(heroesActions.updateHero({ id: Number(id), hero }));
  };

  const handleDelete = () => {
    dispatch(heroesActions.deleteHero(Number(id)));
    navigate(AppRoute.ROOT);
  };

  if(!hero) {
    navigate(AppRoute.ROOT);
  }

  return (
    <HeroForm
      hero={hero}
      label="Confirm editing"
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      editable
    />
  );
};

export { HeroInfo };
