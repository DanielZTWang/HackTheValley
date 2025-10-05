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
  const [selectedFriend, setSelectedFriend] = useState(() => {
    return localStorage.getItem('selectedFriend') || '';
  });
  const [image, setImage] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Persist selectedFriend in localStorage
  useEffect(() => {
    if (selectedFriend) {
      localStorage.setItem('selectedFriend', selectedFriend);
    }
  }, [selectedFriend]);

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
  <div className="flex items-stretch bg-gradient-to-br from-pink-100 via-purple-100 to-fuchsia-100 py-2 sm:py-4 px-2 sm:px-4">
      <div className="flex flex-1 h-full w-full bg-white/90 shadow-2xl border-l-4 border-r-4 border-pink-200 rounded-2xl overflow-hidden min-h-[70vh] max-h-[95vh]">
        {/* Sidebar */}
        <div className="w-20 sm:w-64 min-w-[60px] sm:min-w-[180px] max-w-[80px] sm:max-w-[240px] bg-gradient-to-b from-fuchsia-100 to-pink-50 border-r border-fuchsia-200 flex flex-col p-2 sm:p-4 gap-2 transition-all duration-200">
          <h2 className="hidden sm:flex text-xl font-extrabold text-fuchsia-500 mb-4 tracking-widest items-center gap-2">
            <span role="img" aria-label="Chat">💬</span> Chats
          </h2>
          {users.filter(u => u.id !== 'you').map(u => (
            <button
              key={u.id}
              className={`w-full text-left px-2 sm:px-4 py-2 sm:py-3 rounded-lg font-bold border-2 transition text-base sm:text-lg mb-2 ${selectedFriend === u.id ? 'bg-fuchsia-400 text-white border-fuchsia-500 shadow' : 'bg-white text-fuchsia-500 border-fuchsia-100 hover:border-fuchsia-400 hover:bg-fuchsia-50'}`}
              onClick={() => setSelectedFriend(u.id)}
            >
              <span className="hidden sm:inline">{u.name}</span>
              <span className="sm:hidden">{u.name[0]}</span>
            </button>
          ))}
        </div>
        {/* Chat area */}
  <div className="flex-1 flex flex-col justify-end items-center h-full min-w-0">
          {!selectedFriend ? (
            <div className="flex flex-1 items-center justify-center w-full h-full">
              <div className="text-2xl text-fuchsia-400 font-bold opacity-70">Select a chat to start messaging</div>
            </div>
          ) : (
            <>
              <div className="sticky top-0 z-10 w-full bg-gradient-to-r from-pink-50 to-purple-50 px-2 sm:px-4 py-2 border-b border-pink-200">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-fuchsia-500">Chatting with:</span>
                  <span className="text-lg font-extrabold text-fuchsia-700">{users.find(u => u.id === selectedFriend)?.name}</span>
                </div>
              </div>
              <div className="w-full flex-1 flex flex-col justify-end min-w-0">
                <div
                  className="bg-gradient-to-r from-pink-50 to-purple-50 shadow p-2 sm:p-5 overflow-y-auto flex flex-col gap-3 min-h-[40vh] max-h-[75vh] h-[60vh]"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                >
                  <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
                  {messages
                    .filter(
                      (msg) =>
                        (msg.sender === 'you' && msg.recipient === selectedFriend) ||
                        (msg.sender === selectedFriend && msg.recipient === 'you')
                    )
                    .map((msg, idx) => {
                      const user = users.find((u) => u.id === msg.sender) || users[0];
                      const align = msg.sender === 'you' ? 'self-end' : 'self-start';
                      const boxColor =
                        msg.sender === 'you'
                          ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white'
                          : 'bg-gradient-to-r from-purple-400 to-fuchsia-500 text-white';
                      return (
                        <div
                          key={idx}
                          className={`px-4 py-2 rounded-xl shadow-sm font-semibold max-w-[80%] ${boxColor} ${align}`}
                        >
                          {msg.sender === 'you' ? (
                            <div className="text-xs text-blue-200 font-bold mb-1 text-right">You</div>
                          ) : (
                            <div className="text-xs text-purple-200 font-bold mb-1 text-left">{user.name}</div>
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
                      <span style={{ fontSize: '1.5rem', lineHeight: '1' }}>+</span>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagingApp;
