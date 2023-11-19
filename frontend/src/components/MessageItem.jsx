// MessageItem.jsx
import React from 'react';
import '../css/MessageItem.css'; // Make sure this path is correct

const MessageItem = ({ message }) => (
  <div className={`message ${message.role}`}>
    <strong>{message.name}: </strong>{message.content}
  </div>
);

export default MessageItem;
