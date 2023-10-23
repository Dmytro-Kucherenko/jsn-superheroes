import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { AppRoute } from '../../libs/enums';
import { useAppSelector, useAppDispatch } from '../../libs/hooks';
import { heroesActions } from '../../slices/heroes';
import { HeroCard } from './components';

import './style.scss';

const CRADS_PER_PAGE = 5;

const HeroesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { heroes, selectedPage } = useAppSelector(({ heroes }) => ({
    heroes: heroes.heroes,
    selectedPage: heroes.selectedPage,
  }));

  const [totalPages, setTotalPages] = useState(0);

  const startIndex = selectedPage * CRADS_PER_PAGE;
  const endIndex = startIndex + CRADS_PER_PAGE;
  const heroesCut = heroes.slice(startIndex, endIndex);

  useEffect(() => {
    const totalPages = Math.ceil(heroes.length / CRADS_PER_PAGE);
    setTotalPages(totalPages);

    if (totalPages <= selectedPage) {
      dispatch(heroesActions.selectPage(0));
    }
  }, [heroes]);

  const handlePageChange = (selectedPage: { selected: number }) => {
    dispatch(heroesActions.selectPage(selectedPage.selected));
  };

  return (
    <div className="container">
      <ReactPaginate
        className="pagination"
        pageClassName="pagination-item"
        previousClassName="pagination-item"
        nextClassName="pagination-item"
        activeClassName="pagination-active"
        pageCount={totalPages}
        onPageChange={handlePageChange}
        forcePage={selectedPage}
      />
      <div className="list">
        {heroesCut.map((hero) => (
          <HeroCard key={hero.id} hero={hero} />
        ))}
        {heroes.length === 0 && (
          <span className="list-placeholder">
            Create hero in order to see it
          </span>
        )}
      </div>
      <Link className="create-link" to={AppRoute.HERO_CREATE}>
        Create superhero
      </Link>
    </div>
  );
};

export { HeroesList };
