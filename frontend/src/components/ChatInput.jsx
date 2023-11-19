// ChatInput.jsx
import React from 'react';
import '../css/ChatInput.css'; // Make sure this path is correct

const ChatInput = ({ userInput, setUserInput, sendMessage }) => (
  <div className="user-input">
    <textarea
      placeholder="Type your message..."
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
    />
    <button onClick={sendMessage}>Send</button>
  </div>
);

export default ChatInput;
