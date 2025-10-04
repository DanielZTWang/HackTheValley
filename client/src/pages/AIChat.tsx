import React, { useState, useRef, useEffect } from 'react';
import '../App.css';

const initialMessages = [
  { sender: 'ai', text: 'Hi! I am your StudyHacks AI. How can I help you with your study goals today?' }
];

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    // Simulate AI response
    setTimeout(() => {
      setMessages(msgs => [...msgs, { sender: 'ai', text: "I'm here to help! (AI response placeholder)" }]);
    }, 800);
    setInput('');
  };

  return (
    <div className="aichat-bg">
      <div className="aichat-container">
        <h2 className="aichat-title">AI Chat</h2>
        <div className="aichat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`aichat-msg aichat-msg-${msg.sender}`}>{msg.text}</div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form className="aichat-form" onSubmit={handleSend}>
          <input
            className="aichat-input"
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button className="aichat-send-btn" type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default AIChat;
