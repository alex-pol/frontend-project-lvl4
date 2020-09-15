import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddChannelModal from './AddChannel';
import EditChannelModal from './EditChannel';
import RemoveChannelModal from './RemoveChannel';
import { closeModal } from '../../store/slices/modals';

export const modalType = {
  ADD_CHANNEL: 'AddChannelModal',
  EDIT_CHANNEL: 'EditChannelModal',
  REMOVE_CHANNEL: 'RemoveChannelModal',
};

const modalComponentLookupTable = {
  AddChannelModal,
  EditChannelModal,
  RemoveChannelModal,
};

const ModalManager = () => {
  const dispatch = useDispatch();
  const { type, modalProps } = useSelector((state) => state.modals);
  const ModalComponent = type ? modalComponentLookupTable[type] : () => null;
  const onClose = () => dispatch(closeModal());

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ModalComponent onClose={onClose} {...modalProps} />;
};

export default ModalManager;
