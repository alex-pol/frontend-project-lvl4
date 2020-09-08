/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modals',
  initialState: {
    newModal: false,
    removeModal: false,
    editModal: false,
  },
  reducers: {
    openNewModal(state) {
      state.newModal = true;
    },
    closeNewModal(state) {
      state.newModal = false;
    },
    openRemoveModal(state) {
      state.removeModal = true;
    },
    closeRemoveModal(state) {
      state.removeModal = false;
    },
    openEditModal(state) {
      state.editModal = true;
    },
    closeEditModal(state) {
      state.editModal = false;
    },
  },
});
export const { actions } = slice;
export const {
  openNewModal,
  closeNewModal,
  openRemoveModal,
  closeRemoveModal,
  openEditModal,
  closeEditModal,
} = slice.actions;
export default slice;
