import { DataStatus } from '../../enums/data-status.enum.js';
import { useAppDispatch, useAppSelector } from '../../hooks/index.js';
import { Loader } from '../index.js';
import { useEffect } from 'react';
import { heroesActions } from '../../../slices/heroes/index.js';

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
