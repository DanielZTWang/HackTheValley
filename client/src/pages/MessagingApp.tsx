import React, { useState, useRef, useEffect } from "react";

const users = [
  { id: "you", name: "You", color: "bg-blue-500", text: "text-blue-500" },
  { id: "alice", name: "Alice", color: "bg-pink-400", text: "text-pink-400" },
  { id: "bob", name: "Bob", color: "bg-green-500", text: "text-green-500" },
  {
    id: "charlie",
    name: "Charlie",
    color: "bg-purple-500",
    text: "text-purple-500",
  },
];

const initialMessages = [
  { sender: "alice", recipient: "you", text: "Hey! Ready to study together?" },
  {
    sender: "you",
    recipient: "alice",
    text: "Yes! Let’s motivate each other.",
  },
  {
    sender: "bob",
    recipient: "you",
    text: "I just finished a 2 hour session!",
  },
];

const MessagingApp: React.FC = () => {
  const [messages, setMessages] = useState<any[]>(initialMessages);
  const [input, setInput] = useState("");
  const [selectedFriend, setSelectedFriend] = useState(users[1].id); // default to Alice
  const [image, setImage] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !image) return;
    if (image) {
      setMessages([
        ...messages,
        { sender: "you", recipient: selectedFriend, image },
      ]);
      setImage(null);
    }
    if (input.trim()) {
      setMessages([
        ...messages,
        { sender: "you", recipient: selectedFriend, text: input },
        ...(image ? [{ sender: "you", recipient: selectedFriend, image }] : []),
      ]);
      setInput("");
      setImage(null);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-[85vh] h-[85vh] flex items-stretch bg-gradient-to-br from-pink-100 via-purple-100 to-fuchsia-100 p-4 scrollbar-hide">
      <div className="flex flex-1 flex-col justify-end items-center bg-white/90 shadow-2xl border-l-4 border-r-4 border-pink-200 h-[80vh] max-h-[80vh] w-full overflow-y-auto rounded-2xl scrollbar-hide">
        <div className="sticky top-0 z-20 w-full bg-white/95 rounded-t-2xl shadow-lg pb-2 px-6 pt-4 border-b border-pink-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-2xl font-extrabold text-pink-500 tracking-widest flex items-center gap-2">
              <span role="img" aria-label="Chat">
                💬
              </span>{" "}
              Messaging App
            </h2>
            <div className="flex gap-2 flex-wrap justify-center">
              {users
                .filter((u) => u.id !== "you")
                .map((u) => (
                  <button
                    key={u.id}
                    className={`px-3 py-1 rounded-full font-bold border-2 transition ${
                      selectedFriend === u.id
                        ? `${u.color} text-white border-fuchsia-400`
                        : "bg-white text-gray-500 border-gray-200 hover:border-fuchsia-400"
                    }`}
                    onClick={() => setSelectedFriend(u.id)}
                  >
                    {u.name}
                  </button>
                ))}
            </div>
          </div>
        </div>
        <div className="flex-1 w-full flex flex-col justify-end">
          <div
            className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl shadow p-5 overflow-y-auto flex flex-col gap-3"
            style={{
              height: "60vh",
              maxHeight: "60vh",
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE 10+
            }}
          >
            {/* Hide scrollbar for Chrome, Safari, Opera */}
            <style>{`
              .hide-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>
            {messages
              .filter(
                (msg) =>
                  (msg.sender === "you" && msg.recipient === selectedFriend) ||
                  (msg.sender === selectedFriend && msg.recipient === "you")
              )
              .map((msg, idx) => {
                const user = users.find((u) => u.id === msg.sender) || users[0];
                const align = msg.sender === "you" ? "self-end" : "self-start";
                const boxColor =
                  msg.sender === "you"
                    ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white"
                    : "bg-gradient-to-r from-purple-400 to-fuchsia-500 text-white";
                return (
                  <div
                    key={idx}
                    className={`px-4 py-2 rounded-xl shadow-sm font-semibold max-w-[80%] ${boxColor} ${align}`}
                  >
                    {msg.sender === "you" ? (
                      <div className="text-xs text-blue-200 font-bold mb-1 text-right">
                        You
                      </div>
                    ) : (
                      <div className="text-xs text-purple-200 font-bold mb-1 text-left">
                        {user.name}
                      </div>
                    )}
                    {msg.text && <span>{msg.text}</span>}
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="uploaded"
                        className="rounded-lg mt-2 max-w-[180px] max-h-[120px] border border-white shadow"
                      />
                    )}
                  </div>
                );
              })}
            <div ref={chatEndRef} />
          </div>
          <form
            className="flex gap-2 items-center p-4 border-t border-pink-100 bg-white/80 w-full"
            onSubmit={handleSend}
          >
            <label className="cursor-pointer flex items-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <span className="inline-block px-3 py-2 rounded-xl bg-pink-100 text-pink-500 font-bold border border-pink-200 hover:bg-pink-200 transition mr-1">
                <span style={{ fontSize: "1.5rem", lineHeight: "1" }}>+</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="rounded-xl border-2 border-pink-200 px-4 py-2 text-pink-500 focus:outline-none focus:border-fuchsia-400 bg-white/80 font-semibold flex-1"
            />
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-pink-300 to-fuchsia-400 text-white font-bold px-5 py-2 shadow hover:from-fuchsia-400 hover:to-pink-300 transition"
            >
              Send
            </button>
          </form>
          {image && (
            <div className="flex justify-center mt-2">
              <img
                src={image}
                alt="preview"
                className="rounded-lg max-w-[180px] max-h-[120px] border border-pink-200 shadow"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagingApp;
