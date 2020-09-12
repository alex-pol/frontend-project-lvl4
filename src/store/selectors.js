export const getActiveChannel = (state) => {
  const { list, activeChannel } = state.channels;
  return list.find((channel) => channel.id === activeChannel);
};

export const getMessages = (state) => {
  const { activeChannel } = state.channels;
  return state.messages.filter(
    (message) => message.channelId === activeChannel,
  );
};
