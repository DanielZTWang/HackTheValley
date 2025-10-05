import React, { useState } from "react";

const motivationalMessages = [
  "Keep going, you're doing amazing!",
  "Every minute counts. Proud of you!",
  "Small steps every day lead to big results.",
  "Stay focused, your goals are within reach!",
  "Believe in yourself and all that you are.",
];

type Friend = {
  name: string;
  seconds: number;
};

const friendsInitial: Friend[] = [
  { name: "Alice", seconds: 36000 }, // 10h
  { name: "Bob", seconds: 28800 },   // 8h
  { name: "Charlie", seconds: 21600 } // 6h
];

const formatTime = (totalSeconds: number): string => {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const parseTime = (timeStr: string): number => {
  const parts = timeStr.split(":").map(Number);
  if (parts.some(isNaN)) return NaN;
  if (parts.length === 2) return parts[0] * 3600 + parts[1] * 60;
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return NaN;
};

const Dashboard: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [input, setInput] = useState("00:00:00");
  const [message, setMessage] = useState(
    motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
  );
  const [friends, setFriends] = useState<Friend[]>(friendsInitial);
  const [error, setError] = useState("");

  const handleLog = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const addedSeconds = parseTime(input.trim());
    if (isNaN(addedSeconds) || addedSeconds <= 0) {
      setError("Please enter a valid time (HH:MM:SS or HH:MM).");
      return;
    }

    const newTotal = seconds + addedSeconds;
    setSeconds(newTotal);

    // Update leaderboard
    const updatedFriends = [...friends];
    const me = updatedFriends.find((f) => f.name === "You");
    if (me) {
      me.seconds += addedSeconds;
    } else {
      updatedFriends.push({ name: "You", seconds: newTotal });
    }

    updatedFriends.sort((a, b) => b.seconds - a.seconds);
    setFriends(updatedFriends);

    // Reset
    setInput("00:00:00");
    setMessage(
      motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-fuchsia-100">
      <div className="bg-white/90 rounded-3xl shadow-2xl border-4 border-fuchsia-200 max-w-2xl w-full flex flex-col gap-8 p-10 items-center">
        <h1 className="text-4xl font-extrabold text-fuchsia-500 mb-2 tracking-widest text-center">
          StudyHack Dashboard
        </h1>

        <div className="w-full flex flex-col md:flex-row gap-8 justify-between">
          {/* --- Study Time --- */}
          <div className="flex flex-col items-center gap-4 bg-blue-50 rounded-2xl p-6 shadow-md border border-blue-100">
            <div className="text-2xl font-bold text-blue-500">
              Your Study Time
            </div>

            <div className="text-5xl font-extrabold text-fuchsia-400">
              {formatTime(seconds)}
            </div>

            <form className="flex flex-col items-center gap-2 mt-2" onSubmit={handleLog}>
              <input
                className="border border-fuchsia-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-200 w-40 text-center text-lg"
                type="text"
                placeholder="HH:MM:SS"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
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

          {/* --- Leaderboard --- */}
          <div className="flex flex-col items-center gap-4 bg-purple-50 rounded-2xl p-6 shadow-md border border-purple-100">
            <div className="text-2xl font-bold text-purple-500 mb-2">
              Leaderboard
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
                    {formatTime(friend.seconds)}
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
