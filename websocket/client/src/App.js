import React from 'react';
import './App.css';
import { sendMessage, setMessageListener, getMessages } from './messageService';

function App() {
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState('');

  setMessageListener((messages) => {
    setMessages(messages.map(m => m.message).join('\n'))
  });

  return (
    <div className="App">
      <header className="App-header">
        <p>Simple Message app</p>
      </header>
      <div className="Message-Area">
        <textarea value={messages} readOnly={true}/>
      </div>
      <div className="Message-Actions">
        <input type="text" value={message} onChange={(e) => {
          setMessage(e.target.value);
        }} />
        <button onClick={() => {
          sendMessage(message);
          setMessage('');
        }}>Send</button>
      </div>
    </div>
  );
}

export default App;
