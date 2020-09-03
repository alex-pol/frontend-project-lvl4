import io from 'socket.io-client';
import { store } from './store';
import messagesSlice from './store/slices/messages';

const socketUrl = window.location.origin;

const socket = io(socketUrl);

socket.on('newMessage', (res) => {
  store.dispatch(
    messagesSlice.actions.addMessage({ message: res.data.attributes }),
  );
});

export default socket;
