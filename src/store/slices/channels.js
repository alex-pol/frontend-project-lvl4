/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channels',
  initialState: { list: [], activeChannel: null },
  reducers: {
    selectChannel(state, { payload: channelId }) {
      state.activeChannel = channelId;
    },
    addChannel(state, { payload }) {
      state.list.push(payload);
      state.activeChannel = payload.id;
    },
    removeChannel(state, { payload: channelId }) {
      state.list = state.list.filter(({ id }) => channelId !== id);
      state.activeChannel = state.list.length ? state.list[0].id : null;
    },
    updateChannel(state, { payload }) {
      const channel = state.list.find(({ id }) => id === payload.id);
      channel.name = payload.name;
    },
  },
});

export const {
  selectChannel,
  addChannel,
  removeChannel,
  updateChannel,
} = slice.actions;
export default slice;
