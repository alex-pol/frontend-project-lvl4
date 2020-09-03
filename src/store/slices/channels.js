/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channels',
  initialState: { list: [], activeChannel: null },
  reducers: {
    selectChannel(state, { payload }) {
      const { channel } = payload;
      state.activeChannel = channel.id;
    },
  },
});

export default slice;
