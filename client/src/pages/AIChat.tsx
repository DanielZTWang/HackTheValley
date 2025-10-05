import React, { useState, useRef, useEffect } from "react";

const GEMINI_MODEL = "gemini-2.5-flash";

function getApiUrl() {
  return `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${
    import.meta.env.VITE_GEMINI_API_KEY
  }`;
}

// Removed duplicate getApiUrl function that accepts a model parameter

const initialMessages = [
  {
    sender: "ai",
    text: "Hi! I am your StudyHacks AI (Gemini). How can I help you with your study goals today?",
  },
];

const AIChat: React.FC = () => {
  // Test Gemini API key
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  // Model selection removed; always use gemini-2.5-flash
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { sender: "user", text: input }]);
    setLoading(true);
    try {
      const apiUrl = getApiUrl();
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: input }] }],
        }),
      });
      const data = await res.json();
      const aiText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I could not generate a response.";
      setMessages((msgs) => [...msgs, { sender: "ai", text: aiText }]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { sender: "ai", text: "Error connecting to Gemini API." },
      ]);
    }
    setLoading(false);
    setInput("");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        width: "100%",
      }}
    >
      <div
        className="aichat-container"
        style={{ maxWidth: 600, width: "100%" }}
      >
        <h2 className="aichat-title">AI Chat</h2>
        <div className="aichat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`aichat-msg aichat-msg-${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form className="aichat-form" onSubmit={handleSend}>
          <input
            className="aichat-input"
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button className="aichat-send-btn" type="submit" disabled={loading}>
            {loading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChat;
