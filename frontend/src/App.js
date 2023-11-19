import React from 'react';
import ChatInterface from './components/ChatInterface'; // Make sure to import your ChatInterface component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Your ChatInterface component */}
        <ChatInterface />
      </header>
    </div>
  );
}

export default App;
