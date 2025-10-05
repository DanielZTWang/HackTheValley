import React, { useState, useRef, useEffect } from "react";

const GEMINI_MODEL = "gemini-2.5-flash";
function getApiUrl() {
  return `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${
    import.meta.env.VITE_GEMINI_API_KEY
  }`;
}

const initialMessages = [
  {
    sender: "ai",
    text: "Hi! I am your StudyHack AI (Gemini). How can I help you with your study goals today?",
  },
];

const AIChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

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
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            zIndex: 1000,
            background: "#a21caf",
            color: "#fff",
            borderRadius: "2em",
            padding: "0.7em 1.5em",
            fontWeight: 700,
            boxShadow: "0 2px 8px 0 rgba(124, 58, 237, 0.18)",
            border: "1px solid #a21caf",
            cursor: "pointer",
          }}
        >
          AI Chat
        </button>
      )}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            zIndex: 1000,
            width: "350px",
            minHeight: "300px",
            maxHeight: "480px",
            background: "#f8e1f4",
            borderRadius: "2em",
            boxShadow: "0 12px 48px 0 rgba(124, 58, 237, 0.18)",
            border: "1px solid #a21caf",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            style={{
              background: "linear-gradient(90deg, #e0c3fc 0%, #f9c0d7 100%)",
              padding: "0.7em",
              fontWeight: 900,
              textAlign: "center",
              color: "#a21caf",
              fontSize: "1.1em",
              fontFamily: "Comic Sans MS, Comic Sans, cursive",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderBottom: "1px solid #a21caf",
            }}
          >
            <span style={{ fontSize: "1.18em" }}>AI Chat</span>
            <button
              onClick={() => setOpen(false)}
              style={{
                position: "absolute",
                top: "50%",
                right: "0.2em",
                transform: "translateY(-50%)",
                background: "#fff",
                border: "1px solid #a21caf",
                color: "#a21caf",
                fontSize: "2.2em",
                fontWeight: 900,
                cursor: "pointer",
                lineHeight: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                width: "1.1em",
                height: "1.1em",
                boxShadow: "0 1px 4px 0 rgba(124, 58, 237, 0.08)",
                padding: 0,
              }}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
          <div
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              padding: "1.2em 1em 1em 1em",
              background: "transparent",
              display: "flex",
              flexDirection: "column",
              gap: "1em",
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE 10+
            }}
            className="hide-scrollbar"
            /* Add this style to the file (or in your global CSS):
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
*/
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  background:
                    msg.sender === "user"
                      ? "linear-gradient(90deg, #f9c0d7 0%, #e0c3fc 100%)"
                      : "rgba(255, 240, 250, 0.85)",
                  color: msg.sender === "user" ? "#a21caf" : "#7c3aed",
                  borderRadius: "1.3em",
                  padding: "0.7em 1.2em",
                  maxWidth: "80%",
                  fontSize: "1.05em",
                  boxShadow:
                    msg.sender === "user"
                      ? "0 2px 8px 0 rgba(244, 63, 94, 0.13)"
                      : "0 1px 6px 0 rgba(124, 58, 237, 0.10)",
                  border:
                    msg.sender === "user"
                      ? "1px solid #a21caf"
                      : "1px solid #e0c3fc",
                  marginBottom: "0.1em",
                  transition: "box-shadow 0.2s",
                }}
              >
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form
            onSubmit={handleSend}
            style={{
              display: "flex",
              gap: "0.7em",
              padding: "0.7em 0.7em 0.7em 0.7em",
              borderTop: "1px solid #e0c3fc",
              background: "#fff",
              alignItems: "center",
              minHeight: "3.2em",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder="Type your message..."
              style={{
                flex: 1,
                minWidth: 0,
                border: "1.5px solid #e0c3fc",
                borderRadius: "1em",
                padding: "0.5em 1em",
                fontSize: "1em",
                outline: "none",
                background: "#fff",
                color: "#a21caf",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                background: "linear-gradient(90deg, #f43f5e 0%, #a21caf 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "1em",
                padding: "0.5em 1.2em",
                fontSize: "1em",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 1px 4px 0 rgba(244, 63, 94, 0.08)",
                transition: "background 0.2s",
                minWidth: "4.5em",
              }}
            >
              {loading ? "..." : "Send"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;
