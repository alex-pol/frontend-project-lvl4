import { find, filter, propEq } from 'lodash/fp';

export const getActiveChannel = (state) => {
  const { list, activeChannel } = state.channels;
  return find(propEq('id', activeChannel), list);
};

export const getMessages = (state) => {
  const { activeChannel } = state.channels;
  return filter(propEq('channelId', activeChannel), state.messages);
};
