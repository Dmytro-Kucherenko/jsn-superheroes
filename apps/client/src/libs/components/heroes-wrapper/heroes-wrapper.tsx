import { useEffect } from 'react';
import { DataStatus } from '../../enums';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { heroesActions } from '../../../slices/heroes/index.js';
import { Loader } from '../loader/loader.js';

const HeroesWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();

  const { dataStatus } = useAppSelector(({ heroes }) => ({
    dataStatus: heroes.getAllDataStatus,
  }));

  useEffect(() => {
    dispatch(heroesActions.getAllHeroes());
  }, [dispatch]);

  if (dataStatus === DataStatus.IDLE || dataStatus === DataStatus.PENDING) {
    return <Loader />;
  }

  return <div>{children}</div>;
};

export { HeroesWrapper };
