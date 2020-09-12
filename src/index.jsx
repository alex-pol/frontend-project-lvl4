// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import gon from 'gon';
import '../assets/application.scss';
import App from './App';
import initSocket from './socket';
import init from './init';
import { DataContext } from './store';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

export const socket = initSocket();
export const { store, context } = init(gon, socket);

render(
  <Provider store={store}>
    <DataContext.Provider value={context}>
      <App />
    </DataContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
