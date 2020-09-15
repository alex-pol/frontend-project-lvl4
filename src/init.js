import cookies from 'js-cookie';
import faker from 'faker';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import initStore from './store';
import { addMessage } from './store/slices/messages';
import resources from './locales';

const init = async (data, socket) => {
  const userName = cookies.get('slack-username') || faker.internet.userName();
  cookies.set('slack-username', userName);
  const store = initStore(data);

  socket.on('newMessage', (res) => {
    const parsedData = typeof res === 'string' ? JSON.parse(res) : res;
    store.dispatch(addMessage({ message: parsedData.data.attributes }));
  });
  await i18next.use(initReactI18next).init({
    lng: 'en',
    resources,
  });

  return { store, context: { userName } };
};

export default init;
