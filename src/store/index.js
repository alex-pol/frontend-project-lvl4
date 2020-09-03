import { createContext } from 'react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cookies from 'js-cookie';
import faker from 'faker';
import gon from 'gon';
import channelSlice from './slices/channels';
import messagesSlice from './slices/messages';

export const DataContext = createContext({});

const initStore = (data) => {
  const userName = cookies.get('slack-username') || faker.internet.userName();
  const preloadedState = {
    channels: { list: data.channels, activeChannel: data.channels[0].id },
    messages: data.messages,
  };
  const store = configureStore({
    reducer: combineReducers({ channels: channelSlice.reducer, messages: messagesSlice.reducer }),
    preloadedState,
  });
  cookies.set('slack-username', userName);
  return { store, context: { userName } };
};

export const { store, context } = initStore(gon);
