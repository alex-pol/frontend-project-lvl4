// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import '../assets/application.scss';

// import faker from 'faker';
import gon from 'gon';
import App from './App';
import DataContext from './store';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
render(
  <DataContext.Provider value={gon}>
    <App />
  </DataContext.Provider>,
  document.getElementById('root'),
);
