import React, { useState } from 'react';
import '../App.css';
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
    <div className="mainmenu-bg">
      <div className="mainmenu-container">
        <div className="mainmenu-header">
          <img src={logo} alt="StudyHacks Logo" className="mainmenu-logo" />
          <h1 className="mainmenu-title">
            <span className="studyhacks-brand" style={{ fontSize: '2rem', padding: '0.15em 0.7em' }}>StudyHacks</span>
          </h1>
          <p className="mainmenu-subtitle">Compare your study hours with friends and climb the leaderboard!</p>
        </div>
        <div className="mainmenu-leaderboard-card">
          <h2 className="mainmenu-section-title">Leaderboard</h2>
          <ol className="mainmenu-leaderboard">
            {leaderboard.map((user, idx) => (
              <li key={user.name} className={user.name === 'You' ? 'mainmenu-user-row' : 'mainmenu-friend-row'}>
                <span className="mainmenu-rank">{idx + 1}</span>
                <span className="mainmenu-name">{user.name}</span>
                <span className="mainmenu-hours">{user.hours} hrs</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="mainmenu-friends-card">
          <h2 className="mainmenu-section-title">Add a Friend</h2>
          <form className="mainmenu-addfriend-form" onSubmit={handleAddFriend}>
            <input
              type="text"
              placeholder="Friend's name"
              value={friendName}
              onChange={e => setFriendName(e.target.value)}
              className="mainmenu-input"
            />
            <button type="submit" className="mainmenu-add-btn">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
