/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modals',
  initialState: {
    type: null,
    modalProps: null,
  },
  reducers: {
    openModal(state, { payload }) {
      state.type = payload.type;
      state.modalProps = payload.modalProps;
    },
    closeModal(state) {
      state.type = null;
      state.modalProps = null;
    },
  },
});
export const { actions } = slice;
export const { openModal, closeModal } = slice.actions;
export default slice;
