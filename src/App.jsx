import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Channels from './components/Channels';
import Chat from './components/Chat';

const App = () => (
  <Container className="h-100">
    <Row className="h-100">
      <Col className="h-100 border-right" xs={3}>
        <Channels />
      </Col>
      <Col className="h-100">
        <Chat />
      </Col>
    </Row>
  </Container>
);

export default App;
