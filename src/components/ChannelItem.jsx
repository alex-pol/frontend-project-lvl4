import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash/fp';
import { selectChannel } from '../store/slices/channels';
import { actions as modalActions } from '../store/slices/modals';

const ChannelItem = ({ channel, onRemove, onEdit }) => {
  const { activeChannel } = useSelector(get('channels'));
  const dispatch = useDispatch();
  const { id, name, removable } = channel;
  const isActive = activeChannel === id;
  const onClick = () => dispatch(selectChannel(id));
  const handleRemove = (e) => {
    e.stopPropagation();
    onRemove(id);
    dispatch(modalActions.openRemoveModal());
  };
  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(id);
    dispatch(modalActions.openEditModal());
  };
  return (
    <ListGroup.Item active={isActive} onClick={onClick}>
      <div className="d-flex align-items-center">
        {name}
        {removable && (
          <div className="ml-auto">
            <Button
              size="sm"
              variant="link"
              aria-label="editChannel"
              onClick={handleEdit}
            >
              edit
            </Button>
            <Button
              size="sm"
              variant="link"
              onClick={handleRemove}
              style={{ color: 'red' }}
              aria-label="removeChannel"
            >
              X
            </Button>
          </div>
        )}
      </div>
    </ListGroup.Item>
  );
};

export default ChannelItem;
