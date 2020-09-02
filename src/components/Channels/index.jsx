import React, { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import DataContext from '../../store';

const Channels = () => {
  const { channels } = useContext(DataContext);
  const renderChannel = ({ id, name }) => (
    <ListGroup.Item key={id}>{name}</ListGroup.Item>
  );
  return (
    <div>
      <div>Channels</div>
      <ListGroup>{channels.map(renderChannel)}</ListGroup>
    </div>
  );
};

export default Channels;
