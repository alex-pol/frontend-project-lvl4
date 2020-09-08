import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import routes from '../../routes';
import { removeChannel } from '../../store/slices/channels';
import { closeRemoveModal } from '../../store/slices/modals';

const RemoveChannelModal = ({ channelId }) => {
  const dispatch = useDispatch();
  const onClose = () => dispatch(closeRemoveModal());
  const [isDeleting, setDeleting] = useState(false);
  const onConfirm = async () => {
    setDeleting(true);
    const url = routes.channelPath(channelId);
    await axios.delete(url);
    dispatch(removeChannel(channelId));
    onClose();
  };
  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>Remove channel</Modal.Header>
      <Modal.Body>Are you sure?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm} disabled={isDeleting}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;
