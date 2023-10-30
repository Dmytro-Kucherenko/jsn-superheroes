import { Outlet } from 'react-router';
import { Provider } from 'react-redux';
import { Header } from '../header/header';
import { store } from '../../packages/store';

import './style.scss';
import '../../../assets/css/styles.scss';
import '../../../assets/css/variables.scss';

function App() {
  return (
    <Provider store={store.instance}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </Provider>
  );
}

export { App };
