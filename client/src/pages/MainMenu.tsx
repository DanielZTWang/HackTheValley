import React, { useState } from 'react';
import logo from '../assets/studyhacks-logo.svg';

// Dummy data for demonstration
const dummyUser = {
  name: 'You',
  hours: 18.5,
};
const dummyFriends = [
  { name: 'Alice', hours: 22 },
  { name: 'Bob', hours: 15 },
  { name: 'Charlie', hours: 19 },
];

const MainMenu: React.FC = () => {
  const [friends, setFriends] = useState(dummyFriends);
  const [friendName, setFriendName] = useState('');

  const leaderboard = [...friends, dummyUser].sort((a, b) => b.hours - a.hours);

  const handleAddFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (friendName.trim() && !friends.some(f => f.name.toLowerCase() === friendName.trim().toLowerCase())) {
      setFriends([...friends, { name: friendName.trim(), hours: Math.floor(Math.random() * 25) + 5 }]);
      setFriendName('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-fuchsia-100 py-8">
      <div className="bg-white/90 rounded-3xl shadow-2xl border-4 border-pink-200 max-w-md w-full flex flex-col gap-8 p-8">
        <div className="flex flex-col items-center gap-2">
          <img src={logo} alt="StudyHacks Logo" className="w-16 h-16 mb-1" />
          <h1 className="text-3xl font-extrabold text-pink-500 tracking-tight mb-1">
            <span className="bg-gradient-to-r from-pink-200 via-purple-200 to-fuchsia-200 px-4 py-1 rounded-full text-pink-700 shadow">StudyHacks</span>
          </h1>
          <p className="text-pink-400 text-center font-semibold">Compare your study hours with friends and climb the leaderboard!</p>
        </div>
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl shadow p-5">
          <h2 className="text-lg font-bold text-fuchsia-500 text-center mb-4">Leaderboard</h2>
          <ol className="flex flex-col gap-2">
            {leaderboard.map((user, idx) => (
              <li
                key={user.name}
                className={`flex items-center justify-between px-4 py-2 rounded-xl shadow-sm font-semibold ${user.name === 'You' ? 'bg-gradient-to-r from-pink-200 to-fuchsia-200 text-white' : 'bg-white/80 text-pink-500'}`}
              >
                <span className="text-fuchsia-400 font-bold mr-2">{idx + 1}</span>
                <span className="flex-1 text-left ml-2">{user.name}</span>
                <span className="text-pink-400 font-bold">{user.hours} hrs</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl shadow p-5">
          <h2 className="text-lg font-bold text-fuchsia-500 text-center mb-4">Add a Friend</h2>
          <form className="flex gap-3 justify-center" onSubmit={handleAddFriend}>
            <input
              type="text"
              placeholder="Friend's name"
              value={friendName}
              onChange={e => setFriendName(e.target.value)}
              className="rounded-xl border-2 border-pink-200 px-4 py-2 text-pink-500 focus:outline-none focus:border-fuchsia-400 bg-white/80 font-semibold"
            />
            <button type="submit" className="rounded-xl bg-gradient-to-r from-pink-300 to-fuchsia-400 text-white font-bold px-5 py-2 shadow hover:from-fuchsia-400 hover:to-pink-300 transition">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
