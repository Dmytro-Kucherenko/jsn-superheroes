import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, Toast } from './libs/components';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toast />
    <RouterProvider />
  </React.StrictMode>,
);
