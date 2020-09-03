import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { get } from 'lodash/fp';
import { useSelector } from 'react-redux';

const renderChannel = ({ id, name }) => (
  <ListGroup.Item key={id}>{name}</ListGroup.Item>
);

const Channels = () => {
  const { list } = useSelector(get('channels'));
  return (
    <div>
      <h5 className="mb-2">Channels</h5>
      <ListGroup>{list.map(renderChannel)}</ListGroup>
    </div>
  );
};

export default Channels;
