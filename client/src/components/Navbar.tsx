import { Link, useLocation } from "react-router-dom";
import logo from "../assets/studyhack-logo.svg";
import AIChatWidget from "./AIChatWidget";
import { useUser } from "../hooks/useUser";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;
  const { user, loading } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-gradient-to-r from-pink-50 to-pink-100 border-b-4 border-pink-200 shadow-md">
        {/* Left section: Logo + links */}
        <div className="flex items-center gap-2">
          {/* Homepage always visible */}
          <Link to="/" className="flex items-center no-underline mr-10">
            <img
              src={logo}
              alt="StudyHack Logo"
              className="h-10 w-10 mr-2 object-contain drop-shadow-md"
            />
            <span
              className="text-2xl font-extrabold tracking-tight drop-shadow-sm"
              style={{ color: "#3a3557" }}
            >
              StudyHack
            </span>
          </Link>

          {/* Other nav links: only show if logged in */}
          {!loading && user && (
            <div className="flex gap-6 text-lg font-medium">
              <Link
                to="/leaderboard"
                className="text-fuchsia-700 px-3 py-1.5 rounded-md hover:bg-fuchsia-100 hover:text-fuchsia-900 transition-colors font-semibold tracking-wide flex items-center gap-2"
              >
                <span role="img" aria-label="Hourglass">⏳</span>
                Study Hours
              </Link>
              <Link
                to="/messaging"
                className="text-fuchsia-700 px-3 py-1.5 rounded-md hover:bg-fuchsia-100 hover:text-fuchsia-900 transition-colors font-semibold tracking-wide flex items-center gap-2"
              >
                <span role="img" aria-label="Messaging">💬</span>
                Messaging
              </Link>
              <Link
                to="/forum"
                className="text-fuchsia-700 px-3 py-1.5 rounded-md hover:bg-fuchsia-100 hover:text-fuchsia-900 transition-colors font-semibold tracking-wide flex items-center gap-2"
              >
                <span role="img" aria-label="Forum">📢</span>
                Forum
              </Link>
            </div>
          )}
        </div>

        {/* Right section: Auth buttons */}
        <div className="flex items-center gap-4">
          {!loading && !user && (
            <a
              href="http://localhost:5001/login"
              className="bg-[#c465e6] text-white font-semibold text-base px-4 py-2 rounded-md hover:bg-[#b452de] transition-colors"
            >
              Sign In
            </a>
          )}

          {!loading && user && (
            <>
              <div className="flex items-center gap-3">
                <img
                  src={
                    user.picture ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.username || user.name
                    )}`
                  }
                  alt="Profile"
                  className="w-9 h-9 rounded-full border-2 border-purple-300 shadow"
                />
                <span className="font-semibold text-base text-gray-800">
                  {user.username || user.name}
                </span>
              </div>
              <a
                href="http://localhost:5001/logout"
                className="bg-red-500 text-white font-semibold text-base px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Log Out
              </a>
            </>
          )}
        </div>
      </nav>

      {pathname !== "/messaging" && <AIChatWidget />}
    </>
  );
}
