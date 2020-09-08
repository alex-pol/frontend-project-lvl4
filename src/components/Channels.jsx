import React, { useCallback, useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { get } from 'lodash/fp';
import { useDispatch, useSelector } from 'react-redux';
import { actions as modalActions } from '../store/slices/modals';
import AddChannelModal from './modals/AddChannel';
import RemoveChannelModal from './modals/RemoveChannel';
import EditChannelModal from './modals/EditChannel';
import ChannelItem from './ChannelItem';

const Channels = () => {
  const { list } = useSelector(get('channels'));
  const { newModal, removeModal, editModal } = useSelector(get('modals'));
  const dispatch = useDispatch();
  const [removeId, setRemoveId] = useState(null);
  const [editId, setEditId] = useState(null);
  const openNewModal = () => dispatch(modalActions.openNewModal());
  const renderChannel = useCallback(
    (channel) => (
      <ChannelItem
        channel={channel}
        key={channel.id}
        onEdit={setEditId}
        onRemove={setRemoveId}
      />
    ),
    [],
  );
  return (
    <div>
      <div className="mb-2 d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Channels</h5>
        <Button variant="link" onClick={openNewModal}>
          <h5>+</h5>
        </Button>
      </div>
      <ListGroup>{list.map(renderChannel)}</ListGroup>
      {newModal && <AddChannelModal />}
      {removeModal && <RemoveChannelModal channelId={removeId} />}
      {editModal && <EditChannelModal channelId={editId} />}
    </div>
  );
};

export default Channels;
