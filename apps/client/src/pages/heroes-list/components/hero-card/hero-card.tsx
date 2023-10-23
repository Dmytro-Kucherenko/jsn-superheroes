import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../libs/enums';
import { HeroItemResponseDto } from '../../../../packages/heroes';

import './style.scss';

const HeroCard: React.FC<{ hero: HeroItemResponseDto }> = ({ hero }) => {
  return (
    <Link
      className="card"
      to={AppRoute.HERO_$ID.replace(':id', hero.id.toString())}
    >
      <img
        className="image"
        src={`data:${hero.images[0].contentType};base64,${hero.images[0].binary}`}
        alt={`Image of the ${hero.nickname}`}
      />
      <div className="info">
        <span className="title">{hero.nickname}</span>
      </div>
    </Link>
  );
};

export { HeroCard };
