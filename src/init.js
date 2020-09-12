import cookies from 'js-cookie';
import faker from 'faker';
import initStore from './store';
import { addMessage } from './store/slices/messages';

const init = (data, socket) => {
  const userName = cookies.get('slack-username') || faker.internet.userName();
  cookies.set('slack-username', userName);
  const store = initStore(data);

  socket.on('newMessage', (res) => {
    const parsedData = typeof res === 'string' ? JSON.parse(res) : res;
    store.dispatch(addMessage({ message: parsedData.data.attributes }));
  });

  return { store, context: { userName } };
};

export default init;
