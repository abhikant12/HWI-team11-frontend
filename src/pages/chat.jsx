import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello, how can I help you?', isUser: false, timestamp: new Date().toLocaleTimeString() },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);



  const sendMessage = async () => {
    if (newMessage.trim()) {
      const userMessage = { text: newMessage, isUser: true, timestamp: new Date().toLocaleTimeString() };
      setMessages([...messages, userMessage]);
      setNewMessage('');
      setIsTyping(false);
  
      try {
        const response = await axios.post('http://localhost:4000/api/v1/aichat/chat', {
          prompt: `"Only provide answers related to weather forecasts, floods, natural disasters, or geographical locations. For any other types of questions, 
          respond with: 'I'm sorry, but I am unable to answer your question. My expertise lies in weather forecasting, floods, natural disasters, and 
          geographical locations.' The user's question is: '${newMessage}'. Limit the response to a maximum of 200 words; otherwise, mention that the 
          response is limited to 200 words."`,
        });
  
        if(response.status === 200){
          const aiMessageText = response.data.data; 

          const aiMessage = { text: aiMessageText, isUser: false, timestamp: new Date().toLocaleTimeString() };
          setMessages((prevMessages) => [...prevMessages, aiMessage]);
        } else {
          console.error('Failed to fetch AI response:', response.statusText);
        }
      } catch (error) {
        console.error('Error occurred while sending message:', error);
      }
    }
  };
  

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <h1 style={{ textAlign: 'center', fontSize: '24px', color: '#333', marginBottom: '20px' }} className="font-bold mt-10">
        Your Weather AI Assistant
      </h1>
      <div style={{ width: '90%', maxWidth: '600px', margin: 'auto', border: '1px solid #ccc', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ height: '400px', overflowY: 'auto', padding: '10px', backgroundColor: '#fafafa' }}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                marginBottom: '10px',
                display: 'flex',
                justifyContent: message.isUser ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  maxWidth: '80%',
                  wordWrap: 'break-word',
                  backgroundColor: message.isUser ? '#007bff' : '#e1f5fe',
                  color: message.isUser ? 'white' : 'black',
                  position: 'relative',
                  transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = message.isUser ? '#0056b3' : '#cde7f9')
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = message.isUser ? '#007bff' : '#e1f5fe')
                }
              >
                {message.text}
                <div
                  style={{
                    color: message.isUser ? '#ffeb3b' : '#888',
                    fontSize: '10px',
                    marginTop: '5px',
                    textAlign: message.isUser ? 'right' : 'left',
                  }}
                >
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* For auto-scrolling */}
        </div>
        {isTyping && (
          <div style={{ padding: '10px', backgroundColor: '#fff', textAlign: 'left', fontSize: '12px', color: '#888' }}>
            User is typing...
          </div>
        )}
        <div style={{ display: 'flex', padding: '10px', borderTop: '1px solid #ccc', backgroundColor: '#fff' }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              setIsTyping(true);
            }}
            placeholder="Type your message here..."
            style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginRight: '10px' }}
          />
          <button
            onClick={sendMessage}
            style={{
              padding: '10px 20px',
              border: '1px solid #007bff',
              borderRadius: '5px',
              backgroundColor: '#007bff',
              color: 'white',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatApp;
