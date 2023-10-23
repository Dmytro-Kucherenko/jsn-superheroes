import { Link } from 'react-router-dom';
import { AppRoute } from '../../enums';

import './style.scss';

const Header: React.FC = () => {
  return (
    <header>
      <div className="title">
        <Link to={AppRoute.ROOT} className="link">
          Superheroes
        </Link>
      </div>
    </header>
  );
};

export { Header };
