// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import '../assets/application.scss';
import App from './App';
import { store, context, DataContext } from './store';
import './socket';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

render(
  <Provider store={store}>
    <DataContext.Provider value={context}>
      <App />
    </DataContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
