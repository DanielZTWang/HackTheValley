import React, { useState } from "react";

const motivationalMessages = [
  "Keep going, you're doing amazing!",
  "Every minute counts. Proud of you!",
  "Small steps every day lead to big results.",
  "Stay focused, your goals are within reach!",
  "Believe in yourself and all that you are.",
];

const friends = [
  { name: "Alice", hours: 10 },
  { name: "Bob", hours: 8 },
  { name: "Charlie", hours: 6 },
];

const Dashboard: React.FC = () => {
  const [hours, setHours] = useState(0);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState(
    motivationalMessages[
      Math.floor(Math.random() * motivationalMessages.length)
    ]
  );

  const handleLog = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(input);
    if (!isNaN(h) && h > 0) {
      setHours(hours + h);
      setInput("");
      setMessage(
        motivationalMessages[
          Math.floor(Math.random() * motivationalMessages.length)
        ]
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-fuchsia-100">
      <div className="bg-white/90 rounded-3xl shadow-2xl border-4 border-fuchsia-200 max-w-2xl w-full flex flex-col gap-8 p-10 items-center">
        <h1 className="text-4xl font-extrabold text-fuchsia-500 mb-2 tracking-widest text-center">
          StudyHack Dashboard
        </h1>
        <div className="w-full flex flex-col md:flex-row gap-8 justify-between">
          <div className="flex flex-col items-center gap-4 bg-blue-50 rounded-2xl p-6 shadow-md border border-blue-100">
            <div className="text-2xl font-bold text-blue-500">
              Your Study Hours
            </div>
            <div className="text-5xl font-extrabold text-fuchsia-400">
              {hours}
            </div>
            <form className="flex gap-2 mt-2" onSubmit={handleLog}>
              <input
                className="border border-fuchsia-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-200 w-40 text-center text-lg"
                type="number"
                min="0"
                step="0.1"
                placeholder="Log hours"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-fuchsia-400 text-white px-4 py-2 rounded font-bold hover:bg-fuchsia-500 transition"
              >
                Log
              </button>
            </form>
            <div className="mt-2 text-fuchsia-600 text-lg font-semibold text-center">
              {message}
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 bg-purple-50 rounded-2xl p-6 shadow-md border border-purple-100">
            <div className="text-2xl font-bold text-purple-500 mb-2">
              Your Friends
            </div>
            <ul className="w-full flex flex-col gap-2">
              {friends.map((friend) => (
                <li
                  key={friend.name}
                  className="flex justify-between items-center bg-purple-50 rounded-xl px-4 py-2 shadow"
                >
                  <span className="font-semibold text-purple-700">
                    {friend.name}
                  </span>
                  <span className="text-fuchsia-400 font-bold">
                    {friend.hours} hrs
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
