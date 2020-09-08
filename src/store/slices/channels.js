/* eslint-disable no-param-reassign */
import { findIndex, propEq } from 'lodash/fp';
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
      const removedIdx = findIndex(propEq('id', channelId), state.list);
      if (removedIdx !== -1) {
        state.list.splice(removedIdx, 1);
        if (state.activeChannel === channelId) {
          state.activeChannel = state.list.length
            ? state.list[removedIdx % state.list.length].id
            : null;
        }
      }
    },
    updateChannel(state, { payload }) {
      const updatedIdx = findIndex(propEq('id', payload.id), state.list);
      if (updatedIdx !== -1) {
        state.list.splice(updatedIdx, 1, payload);
      }
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
