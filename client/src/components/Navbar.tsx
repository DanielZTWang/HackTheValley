import { Link } from "react-router-dom";
import logo from "../assets/studyhack-logo.svg";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-gradient-to-r from-pink-50 to-pink-100 border-b-4 border-pink-200 shadow-md">
      {/* Left section: Logo + links */}
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center no-underline mr-10">
          <img
            src={logo}
            alt="StudyHack Logo"
            className="h-10 w-10 mr-2 object-contain drop-shadow-md"
          />
          <span className="text-2xl font-extrabold text-fuchsia-700 tracking-tight drop-shadow-sm">
            StudyHack
          </span>
        </Link>
        <div className="flex gap-6 text-lg font-medium">
          <Link
            to="/contact"
            className="text-emerald-500 px-3 py-1.5 rounded-md hover:bg-emerald-100 transition-colors"
          >
            <span role="img" aria-label="AI">
              🤖
            </span>
            AI Chat
          </Link>
          <Link
            to="/leaderboard"
            className="text-pink-500 px-3 py-1.5 rounded-md hover:bg-pink-100 hover:text-pink-700 transition-colors font-semibold tracking-wide"
          >
            Study Hours
          </Link>
          <Link
            to="/messaging"
            className="text-blue-900 px-3 py-1.5 rounded-md hover:bg-blue-50 hover:text-blue-700 transition-colors font-semibold tracking-wide"
          >
            Messaging
          </Link>
          <Link
            to="/forum"
            className="text-fuchsia-700 px-3 py-1.5 rounded-md hover:bg-fuchsia-100 hover:text-fuchsia-900 transition-colors font-semibold tracking-wide flex items-center gap-2"
          >
            <span role="img" aria-label="Forum">💬</span>
            Forum
          </Link>
        </div>
      </div>

      {/* Right section: Auth buttons */}
      <div className="flex items-center gap-4">
        <a
          href="https://studyhack.ca.auth0.com/authorize?response_type=token&client_id=rfm0iV2T99Nn99uKt0uVkVqDqDcXaco8&redirect_uri=http://localhost:5000/callback"
          className="bg-gradient-to-r from-fuchsia-400 to-pink-400 text-white font-semibold text-base px-5 py-2 rounded-lg shadow hover:from-fuchsia-500 hover:to-pink-500 transition-colors"
        >
          Login/Sign Up
        </Link>
      </div>
    </nav>
  );
}
