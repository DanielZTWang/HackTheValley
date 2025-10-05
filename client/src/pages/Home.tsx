import React from "react";

const Home: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-fuchsia-100">
    <div className="bg-white/90 rounded-3xl shadow-2xl border-4 border-fuchsia-200 max-w-xl w-full flex flex-col gap-6 p-10 items-center">
      <h1 className="text-4xl font-extrabold text-fuchsia-500 mb-2 tracking-widest text-center">
        Welcome to StudyHack!
      </h1>
      <p className="text-lg text-gray-700 text-center max-w-md">
        Track your study hours, chat with friends, compete on the leaderboard,
        and get AI-powered study help. Start logging your progress and join the
        StudyHack community!
      </p>
      <img src="/vite.svg" alt="StudyHack Logo" className="w-24 h-24 mt-4" />
    </div>
  </div>
);

export default Home;
