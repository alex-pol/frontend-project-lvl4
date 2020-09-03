import { find, filter } from 'lodash/fp';

export const getActiveChannel = (state) => {
  const { list, activeChannel } = state.channels;
  return find({ id: activeChannel }, list);
};

export const getMessages = (state) => {
  const { activeChannel } = state.channels;
  return filter({ channelId: activeChannel }, state.messages);
};
