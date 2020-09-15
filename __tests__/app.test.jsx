import 'regenerator-runtime/runtime';
import { SocketIO, Server } from 'mock-socket';
import delay from 'delay';
import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import React from 'react';
import nock from 'nock';
import userEvent from '@testing-library/user-event';
import { DataContext } from '../src/store';
import App from '../src/App';
import init from '../src/init';
import routes from '../src/routes';

let mockClient; //eslint-disable-line
let mockServer; //eslint-disable-line

const host = 'http://localhost';
const socketHost = 'ws://localhost';

beforeEach(async () => {
  if (mockServer) {
    mockServer.stop();
  }
  mockServer = new Server(socketHost);
  mockServer.on('connection', (socket) => {
    socket.on('sendMessage', (data) => {
      socket.emit('newMessage', JSON.stringify(data));
    });
  });

  mockClient = new SocketIO(socketHost);
  const data = {
    channels: [
      { id: 1, name: 'General' },
      { id: 2, name: 'random', removable: true },
    ],
    messages: [],
  };
  const { store, context } = await init(data, mockClient);

  render(
    <Provider store={store}>
      <DataContext.Provider value={context}>
        <App />
      </DataContext.Provider>
    </Provider>,
  );
});

test('add channel', async () => {
  const scope = nock(host)
    .post(routes.channelsPath())
    .reply(201, {
      data: {
        type: 'channels',
        id: 3,
        attributes: { name: 'test channel', removable: true, id: 3 },
      },
    });
  const newChannelBtn = screen.getByRole('button', { name: 'openNewChannelBtn' });
  await userEvent.click(newChannelBtn);
  await act(async () => {
    const input = screen.getByRole('textbox', { name: 'newChannelInput' });
    const submitBtn = screen.getByRole('button', { name: 'submitChannelForm' });
    await userEvent.type(input, 'test channel');
    await userEvent.click(submitBtn);
    await delay(100);
    scope.done();
  });
  await waitFor(() => {
    expect(screen.getByText(/test channel/i)).toBeInTheDocument();
  });
});

test('remove channel', async () => {
  const scope = nock(host).delete(routes.channelPath(2)).reply(204);
  const channel = screen.getByText(/random/i);
  expect(channel).toBeInTheDocument();
  await act(async () => {
    const removeBtn = screen.getByRole('button', { name: 'removeChannel' });
    await userEvent.click(removeBtn);
    const confirmBtn = screen.getByRole('button', { name: 'confirmBtn' });
    await userEvent.click(confirmBtn);
    await delay(100);
    scope.done();
  });
  await waitFor(() => {
    expect(channel).not.toBeInTheDocument();
  });
});

test('edit channel', async () => {
  const newChannelName = 'random edited';
  const scope = nock(host)
    .patch(routes.channelPath(2))
    .reply(200, {
      data: {
        type: 'channels',
        id: 2,
        attributes: { name: newChannelName, removable: true, id: 2 },
      },
    });
  const channel = screen.getByText(/random/i);
  expect(channel).toBeInTheDocument();
  await act(async () => {
    const removeBtn = screen.getByRole('button', { name: 'editChannel' });
    await userEvent.click(removeBtn);
    const input = screen.getByRole('textbox', { name: 'editChannelInput' });
    await userEvent.type(input, newChannelName);
    const confirmBtn = screen.getByRole('button', { name: 'confirmBtn' });
    await userEvent.click(confirmBtn);
    await delay(100);
    scope.done();
  });
  await waitFor(() => {
    expect(channel).toHaveTextContent(newChannelName);
  });
});

test('add message', async () => {
  const message = 'test message';
  const scope = nock(host).post(routes.channelMessagesPath(1)).reply(200);
  const input = screen.getByRole('textbox', { name: 'message' });
  const form = screen.getByRole('form', { name: 'messageForm' });

  await act(async () => {
    await userEvent.type(input, message);
    await fireEvent.submit(form);
    await delay(100);
    scope.done();
    mockClient.emit('sendMessage', {
      data: {
        attributes: {
          id: 1,
          message,
          userName: 'TestUsername',
          channelId: 1,
        },
      },
    });
  });
  await waitFor(() => {
    const messageItem = screen.getByText(/test message/i);
    expect(messageItem).toBeInTheDocument();
    expect(messageItem).toHaveTextContent('TestUsername');
  });
});
