import React, { useState, useEffect, useRef } from 'react';
import '../css/ChatInterface.css';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { GermanPrompt } from './prompts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';


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
        {"role": "system", "content": "You are a helpful assistant designed to output JSON."},
        { "role": "system", "content": GermanPrompt },
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
        content: parsedResponse.response, // Replace 'joke' with the appropriate key if needed
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

  const handlePlay = async (text) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text })
      });
  
      if (response.ok) {
        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        audio.play();
  
        // Clean up when the audio has finished playing
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
        };
      } else {
        console.error('Failed to fetch TTS audio');
        // Handle non-OK responses
      }
    } catch (error) {
      console.error("Error playing text-to-speech: ", error);
      // Handle the error appropriately in your UI
    }
  };
  
  return (
    <div className="chat-container">
      <ChatHeader />
      <MessageList messages={messages} onPlay={handlePlay} messagesEndRef={messagesEndRef} />
      {/* No need for a separate div for ref, it should be inside MessageList */}
      <div className="input-wrapper">
        <textarea
          className="user-input"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button className="send-button" onClick={sendMessage}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;