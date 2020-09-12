import { createContext } from 'react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import channelSlice from './slices/channels';
import messagesSlice from './slices/messages';
import modalsSlice from './slices/modals';

export const DataContext = createContext({});

const initStore = (data) => {
  const preloadedState = {
    channels: { list: data.channels, activeChannel: data.channels[0].id },
    messages: data.messages,
  };
  return configureStore({
    reducer: combineReducers({
      channels: channelSlice.reducer,
      messages: messagesSlice.reducer,
      modals: modalsSlice.reducer,
    }),
    preloadedState,
  });
};

export default initStore;
