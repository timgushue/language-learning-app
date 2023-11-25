// MessageItem.jsx
import React from 'react';
import '../css/MessageItem.css'; // Make sure this path is correct
import userAvatar from '../assets/images/user-avatar.jpg'; // Update the path as necessary
import chatGptAvatar from '../assets/images/chatgpt-avatar.jpg'; // Update the path as necessary
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';


const MessageItem = ({ message, onPlay }) => (
  <div className={`message ${message.role}`}>
    <img src={message.role === 'user' ? userAvatar : chatGptAvatar} alt="Avatar" className="avatar" />
    <div className="message-content">
      <strong>{message.name}: </strong>
      {message.content}
      <button className="play-button">
        <FontAwesomeIcon icon={faPlay} />
      </button>
    </div>
  </div>
);

export default MessageItem;
