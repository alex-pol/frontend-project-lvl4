import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Rollbar from 'rollbar';
import Channels from './components/Channels';
import Chat from './components/Chat';
import ModalManager from './components/modals/ModalManager';

const isProduction = process.env.NODE_ENV === 'production';

export const rollbar = new Rollbar({
  accessToken: 'ef89b91d68e74f6f837c960fcfc1b12f',
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: isProduction,
});

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
    <ModalManager />
  </Container>
);

export default App;
