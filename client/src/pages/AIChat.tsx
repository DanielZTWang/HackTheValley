import React, { useState, useRef, useEffect } from 'react';

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' +
  import.meta.env.VITE_GEMINI_API_KEY;

const initialMessages = [
  { sender: 'ai', text: 'Hi! I am your StudyHacks AI (Gemini). How can I help you with your study goals today?' }
];

const AIChat: React.FC = () => {
  console.log('Gemini API Key:', import.meta.env.VITE_GEMINI_API_KEY);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, { sender: 'user', text: input }]);
    setLoading(true);
    try {
      const res = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: input }] }
          ]
        })
      });
      const data = await res.json();
      const aiText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Sorry, I could not generate a response.';
      setMessages(msgs => [...msgs, { sender: 'ai', text: aiText }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { sender: 'ai', text: 'Error connecting to Gemini API.' }]);
    }
    setLoading(false);
    setInput('');
  };

  return (
    <div className="aichat-bg">
      <div className="aichat-container">
        <h2 className="aichat-title">AI Chat</h2>
        <div className="aichat-messages h-96 max-h-[60vh] min-h-[200px] overflow-y-auto rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 p-4 mb-4 flex flex-col-reverse gap-3 scrollbar scrollbar-thumb-fuchsia-400 scrollbar-track-white">
          <div ref={chatEndRef} />
          {messages.slice().reverse().map((msg, idx) => (
            <div key={idx} className={`aichat-msg aichat-msg-${msg.sender}`}>{msg.text}</div>
          ))}
        </div>
        <form className="aichat-form" onSubmit={handleSend}>
          <input
            className="aichat-input"
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={loading}
          />
          <button className="aichat-send-btn" type="submit" disabled={loading}>{loading ? '...' : 'Send'}</button>
        </form>
        <div className="aichat-hint">Paste your Gemini API key in <code>.env</code> as <b>VITE_GEMINI_API_KEY</b>.</div>
      </div>
    </div>
  );
};

export default AIChat;
