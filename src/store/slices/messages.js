/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, { payload }) {
      const { message } = payload;
      state.push(message);
    },
  },
});

export const { addMessage } = slice.actions;

export default slice;
