import React, { useState, useEffect } from "react";

const leaderboardData = [
  { name: "You", hours: 12, streak: 5 },
  { name: "Alice", hours: 10, streak: 4 },
  { name: "Bob", hours: 8, streak: 3 },
  { name: "Charlie", hours: 6, streak: 2 },
];

function getTodayDateStr() {
  const now = new Date();
  return now.toISOString().slice(0, 10); // YYYY-MM-DD
}

const StudyHours: React.FC = () => {
  // Helper to format hours as hh:mm:ss
  function formatTime(hours: number) {
    const totalSeconds = Math.floor(hours * 3600);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h}:${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  }
  const [hours, setHours] = useState(leaderboardData[0].hours);
  const [streak, setStreak] = useState(leaderboardData[0].streak);
  const [lastLogDate, setLastLogDate] = useState(getTodayDateStr());
  const [input, setInput] = useState("");

  // On mount, check if streak should be reset
  useEffect(() => {
    const storedDate = localStorage.getItem("study_lastLogDate");
    const storedStreak = localStorage.getItem("study_streak");
    if (storedDate && storedStreak) {
      if (storedDate !== getTodayDateStr()) {
        // If last log was not today, check if it was yesterday
        const last = new Date(storedDate);
        const today = new Date(getTodayDateStr());
        const diff = (today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);
        if (diff === 1) {
          setStreak(Number(storedStreak));
        } else {
          setStreak(0);
        }
      } else {
        setStreak(Number(storedStreak));
      }
      setLastLogDate(storedDate);
    }
  }, []);

  const handleLog = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(input);
    if (!isNaN(h) && h > 0) {
      setHours(hours + h);
      setInput("");
      const today = getTodayDateStr();
      if (lastLogDate === today) {
        // Already logged today, streak stays the same
        setStreak(streak);
      } else {
        // New day, increment streak
        setStreak(streak + 1);
      }
      setLastLogDate(today);
      localStorage.setItem("study_lastLogDate", today);
      localStorage.setItem(
        "study_streak",
        String(lastLogDate === today ? streak : streak + 1)
      );
    }
  };

  // On mount, check if streak should be reset if user missed a day
  useEffect(() => {
    const today = getTodayDateStr();
    if (lastLogDate !== today) {
      const last = new Date(lastLogDate);
      const diff =
        (new Date(today).getTime() - last.getTime()) / (1000 * 60 * 60 * 24);
      if (diff > 1) {
        setStreak(0);
        localStorage.setItem("study_streak", "0");
      }
    }
  }, [lastLogDate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-fuchsia-100 to-pink-100">
      <div className="bg-white/90 rounded-3xl shadow-2xl border-4 border-blue-200 max-w-lg w-full flex flex-col gap-6 p-10 items-center">
        <h2 className="text-3xl font-extrabold text-blue-500 mb-2 tracking-widest text-center">
          Study Hours
        </h2>
        <form className="flex gap-2 mb-4" onSubmit={handleLog}>
          <input
            className="border border-blue-200 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-200 w-40 text-center text-lg"
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
            className="bg-blue-400 text-white px-4 py-2 rounded font-bold hover:bg-blue-500 transition"
          >
            Log
          </button>
        </form>
        <div className="text-2xl font-bold text-fuchsia-500 mb-2">
          Your Total: {hours} hours
        </div>
        <div className="text-lg font-semibold text-blue-700 mb-4">
          Current Streak: {streak} {streak === 1 ? "day" : "days"}
        </div>
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="text-fuchsia-500">Rank</th>
              <th className="text-fuchsia-500">Name</th>
              <th className="text-fuchsia-500">Hours</th>
              <th className="text-fuchsia-500">Streak</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user, idx) => (
              <tr
                key={user.name}
                className={
                  idx === 0 ? "bg-fuchsia-100 font-bold" : "bg-blue-50"
                }
              >
                <td className="px-3 py-2 rounded-l-xl">{idx + 1}</td>
                <td className="px-3 py-2">{user.name}</td>
                <td className="px-3 py-2">
                  {user.name === "You" ? hours : user.hours}
                </td>
                <td className="px-3 py-2 rounded-r-xl">
                  {user.name === "You" ? streak : user.streak}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudyHours;
