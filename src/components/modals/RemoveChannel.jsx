import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import routes from '../../routes';
import { removeChannel } from '../../store/slices/channels';

const RemoveChannelModal = ({ onClose, channelId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
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
      <Modal.Header closeButton>{t('removeChannelTitle')}</Modal.Header>
      <Modal.Body>{t('actionConfirmation')}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {t('cancel')}
        </Button>
        <Button
          aria-label="confirmBtn"
          variant="primary"
          onClick={onConfirm}
          disabled={isDeleting}
        >
          {t('confirm')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;
