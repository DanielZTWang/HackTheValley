import React from 'react';
import '../App.css';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <div className="flex justify-center">
        <div className="rounded-3xl bg-white/80 shadow-lg p-2 w-full max-w-3xl">
          <svg width="100%" height="180" viewBox="0 0 600 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="90" cy="90" r="70" fill="#7C3AED" fillOpacity="0.2" />
            <rect x="200" y="30" width="120" height="120" rx="30" fill="#F59E42" fillOpacity="0.18" />
            <ellipse cx="480" cy="90" rx="80" ry="60" fill="#10B981" fillOpacity="0.18" />
            <circle cx="340" cy="60" r="30" fill="#F43F5E" fillOpacity="0.25" />
            <rect x="420" y="120" width="60" height="30" rx="15" fill="#3B82F6" fillOpacity="0.22" />
          </svg>
        </div>
      </div>
  <h1 className="about-title">About <span className="studyhacks-brand">StudyHacks</span></h1>
      <p className="about-lead">
  <strong className="studyhacks-brand">StudyHacks</strong> is your go-to platform for tracking and comparing your study progress with others. Whether you want to stay motivated, set new goals, or see how your study habits stack up against your peers, <span className="studyhacks-brand">StudyHacks</span> provides the tools and insights you need to succeed.
      </p>
  <h2>What can you do on <span className="studyhacks-brand">StudyHacks</span>?</h2>
      <ul className="about-list">
        <li>📈 Log your study sessions and monitor your progress over time.</li>
        <li>🤝 Compare your study stats with friends and the wider community.</li>
        <li>🏆 Set personal study goals and celebrate your achievements.</li>
        <li>💡 Discover study tips and strategies from top performers.</li>
      </ul>
      <h2>Why compare your progress?</h2>
      <p>
  Comparing your study progress can help you stay motivated, identify areas for improvement, and learn from others. With <span className="studyhacks-brand">StudyHacks</span>, you can turn studying into a fun and social experience!
      </p>
      <div className="about-cta">
  <h2>Join the <span className="studyhacks-brand">StudyHacks</span> community today!</h2>
        <p>
          Start tracking, comparing, and improving your study habits with <span className="studyhacks-brand">StudyHacks</span>. Together, we can achieve more!
        </p>
      </div>
    </div>
  );
};

export default About;
