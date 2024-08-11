import React, { useState } from 'react';

const ChatApp = () => {
  // State for storing messages
  const [messages, setMessages] = useState([
    'Hello, how are you?',
    'I am good, thanks for asking!',
    'What are you up to today?'
  ]);

  // State for the input field
  const [newMessage, setNewMessage] = useState('');

  // Function to handle sending a new message
  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, newMessage]);
      setNewMessage('');
    }
  };

  return (
<>
    <h1 style={{ textAlign: 'center', fontSize: '24px', color: '#333', marginBottom: '20px' }}>
    Your AI Assistant
  </h1>
    <div style={{ width: '60%',margin:'auto', border: '1px solid #ccc', padding: '10px' }}>
      <div style={{ height: '100%', overflowY: 'scroll', borderBottom: '1px solid #ccc', padding: '10px' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <div style={{ padding: '5px', backgroundColor: '#f1f1f1', borderRadius: '5px' }}>
              {message}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{ width: '80%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
        />
        <button
          onClick={sendMessage}
          style={{ width: '18%', padding: '10px', marginLeft: '2%', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}
        >
          Send
        </button>
      </div>
    </div>
    </>
  );
};

export default ChatApp;
