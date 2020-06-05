import React from 'react';
import './App.css';
import { sendMessage } from './messageService';

function App() {
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState('');

  return (
    <div className="App">
      <header className="App-header">
        <p>Simple Message app</p>
      </header>
      <textarea value={messages} />
      <input type="text" value={message} onChange={(e) => {
        setMessage(e.target.value);
      }} />
      <button onClick={() => {
        sendMessage(message);
        setMessage('');
      }}>Send</button>
    </div>
  );
}

export default App;
