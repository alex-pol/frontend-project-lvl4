import io from 'socket.io-client';

const initSocket = () => {
  const socketUrl = window.location.origin;
  return io(socketUrl);
};

export default initSocket;
