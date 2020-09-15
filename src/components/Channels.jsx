import React, { useCallback } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { get } from 'lodash/fp';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { openModal } from '../store/slices/modals';
import ChannelItem from './ChannelItem';
import { modalType } from './modals/ModalManager';

const Channels = () => {
  const { t } = useTranslation();
  const { list } = useSelector(get('channels'));
  const dispatch = useDispatch();
  const openNewModal = () => dispatch(openModal({ type: modalType.ADD_CHANNEL }));
  const renderChannel = useCallback(
    (channel) => <ChannelItem channel={channel} key={channel.id} />,
    [],
  );
  return (
    <div>
      <div className="mb-2 d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{t('channels')}</h5>
        <Button
          variant="link"
          aria-label="openNewChannelBtn"
          onClick={openNewModal}
        >
          <h5>+</h5>
        </Button>
      </div>
      <ListGroup>{list.map(renderChannel)}</ListGroup>
    </div>
  );
};

export default Channels;
