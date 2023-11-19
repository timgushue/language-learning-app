// ChatInterface.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatInterface from './ChatInterface'; // Import the component to test

test('renders chat interface', () => {
  render(<ChatInterface />);
  
  // Find the chat interface element by its test id
  const chatElement = screen.getByTestId('chat-interface');
  
  expect(chatElement).toBeInTheDocument();
});
