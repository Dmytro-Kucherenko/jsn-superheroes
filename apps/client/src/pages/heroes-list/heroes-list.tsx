import { Link } from 'react-router-dom';
import { HeroCard } from './components/hero-card/hero-card.js';
import { AppRoute } from '../../libs/enums';
import './style.scss';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../libs/hooks/use-app-selector.hook.js';

const HeroesList: React.FC = () => {
  const heroes = useAppSelector(({ heroes }) => heroes.heroes)
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = heroes.slice(startIndex, endIndex);

  useEffect(() => {
    setTotalPages(Math.ceil(heroes.length / itemsPerPage));
  }, [])

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className="container">
      <ReactPaginate
        className='pagination'
        pageClassName='pagination-item'
        previousClassName='pagination-item'
        nextClassName='pagination-item'
        activeClassName='pagination-active'
        pageCount={totalPages}
        onPageChange={handlePageChange}
        forcePage={currentPage}
      />
      <div className="list">
        {subset.map((hero) => (
          <HeroCard key={hero.id} hero={hero} />
        ))}
      </div>
      <Link className="create-link" to={AppRoute.HERO_CREATE}>
        Create superhero
      </Link>
    </div>
  );
};

export { HeroesList };
