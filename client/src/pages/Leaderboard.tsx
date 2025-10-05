import React, { useState } from 'react';

const leaderboardData = [
  { name: 'You', hours: 12, days: 5 },
  { name: 'Alice', hours: 10, days: 4 },
  { name: 'Bob', hours: 8, days: 3 },
  { name: 'Charlie', hours: 6, days: 2 },
];

const StudyHours: React.FC = () => {
  const [hours, setHours] = useState(leaderboardData[0].hours);
  const [input, setInput] = useState('');
  const handleLog = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(input);
    if (!isNaN(h) && h > 0) {
      setHours(hours + h);
      setInput('');
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-fuchsia-100 to-pink-100">
      <div className="bg-white/90 rounded-3xl shadow-2xl border-4 border-blue-200 max-w-lg w-full flex flex-col gap-6 p-10 items-center">
        <h2 className="text-3xl font-extrabold text-blue-500 mb-2 tracking-widest text-center">Study Hours</h2>
        <form className="flex gap-2 mb-4" onSubmit={handleLog}>
          <input
            className="border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-200 w-24 text-center"
            type="number"
            min="0"
            step="0.1"
            placeholder="Log hours"
            value={input}
            onChange={e => setInput(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-400 text-white px-4 py-2 rounded font-bold hover:bg-blue-500 transition"
          >
            Log
          </button>
        </form>
        <div className="text-2xl font-bold text-fuchsia-500 mb-4">Your Total: {hours} hours</div>
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="text-fuchsia-500">Rank</th>
              <th className="text-fuchsia-500">Name</th>
              <th className="text-fuchsia-500">Hours</th>
              <th className="text-fuchsia-500">Days</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user, idx) => (
              <tr key={user.name} className={idx === 0 ? 'bg-fuchsia-100 font-bold' : 'bg-blue-50'}>
                <td className="px-3 py-2 rounded-l-xl">{idx + 1}</td>
                <td className="px-3 py-2">{user.name}</td>
                <td className="px-3 py-2">{user.name === 'You' ? hours : user.hours}</td>
                <td className="px-3 py-2 rounded-r-xl">{user.days}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudyHours;
