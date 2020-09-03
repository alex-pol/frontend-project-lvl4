import React from 'react';
import { useSelector } from 'react-redux';
import { getActiveChannel, getMessages } from '../store/selectors';
import MessageForm from './MessageForm';

const renderMessage = (message) => (
  <div key={message.id}>
    <strong>{message.userName}</strong>
    :
    {message.message}
  </div>
);

const Chat = () => {
  const channel = useSelector(getActiveChannel);
  const messages = useSelector(getMessages);
  return (
    <div className="pb-3 d-flex flex-column h-100">
      <div>
        {messages.map(renderMessage)}
      </div>
      <div className="mt-auto">
        <MessageForm channel={channel} />
      </div>
    </div>
  );
};

export default Chat;
