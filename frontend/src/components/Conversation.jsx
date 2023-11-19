import React from 'react';
import '../css/Conversation.css'

const Conversation = ({ conversation }) => (
    <div className="conversation">
      <pre>{conversation}</pre>
    </div>
  );
  

export default Conversation;