import React, { useState, useEffect, useRef } from 'react';
import '../css/ChatInterface.css';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!userInput.trim()) return; // Prevent sending empty messages
  
    // Add user message to the conversation
    const userMessage = {
      role: 'user',
      content: userInput,
      name: 'You' // Replace 'You' with the desired username
    };
  
    setMessages(messages => [...messages, userMessage]);

    // Prepare the payload with the 'messages' key
    const payload = {
      messages: [
        // If you have a static message you always send, like the 'system' one below, include it
        { role: 'system', content: 'You are a helpful assistant designed to output JSON.' },
        userMessage
      ]
    };
  
    // Send user input to Flask /chat endpoint and handle the response
    const response = await fetch('http://127.0.0.1:5000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
  
    const responseData = await response.json();
  
    try {
      const parsedResponse = JSON.parse(responseData.response);
  
      const gptResponse = {
        role: 'gpt',
        content: parsedResponse.joke, // Replace 'joke' with the appropriate key if needed
        name: 'ChatGPT' // Name for the GPT responses
      };
  
      // Add GPT response to the conversation
      setMessages(messages => [...messages, gptResponse]);
  
    } catch (error) {
      console.error("Error parsing response: ", error);
      // Handle the error appropriately in your UI, maybe add an error message to the conversation
    }
  
    // Clear the user input field
    setUserInput('');
  };  

  return (
    <div className="chat-container">
      <ChatHeader />
      <MessageList messages={messages} messagesEndRef={messagesEndRef} />
      {/* No need for a separate div for ref, it should be inside MessageList */}
      <ChatInput 
        userInput={userInput} 
        setUserInput={setUserInput} 
        sendMessage={sendMessage} 
      />
    </div>
  );
};

export default ChatInterface;