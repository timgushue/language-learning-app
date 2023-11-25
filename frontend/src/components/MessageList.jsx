// MessageList.jsx
import React from 'react';
import MessageItem from './MessageItem';
import '../css/MessageItem.css'; // Ensure this path is correct

const MessageList = ({ messages, onPlay, messagesEndRef }) => (
  <div className="chat-messages">
  {messages.map((message, index) => (
      <MessageItem key={index} message={message} onPlay={onPlay} />
    ))}
    <div ref={messagesEndRef} /> {/* This element is for auto-scrolling */}
  </div>
);

export default MessageList;
