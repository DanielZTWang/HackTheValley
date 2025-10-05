import { Link } from "react-router-dom";
import logo from "../assets/studyhack-logo.svg";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-gray-100 shadow-[0_2px_12px_0_rgba(124,58,237,0.07)]">
      {/* Left section: Logo + links */}
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center no-underline mr-10">
          <img
            src={logo}
            alt="StudyHack Logo"
            className="h-9 w-9 mr-2 object-contain"
          />
          <span className="text-xl font-semibold">StudyHack</span>
        </Link>
        <div className="flex gap-7 text-lg font-medium">
          <Link
            to="/about"
            className="text-purple-600 px-3 py-1.5 rounded-md hover:bg-purple-100 transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-purple-900 px-3 py-1.5 rounded-md hover:bg-purple-50 transition-colors font-semibold tracking-wide flex items-center gap-2"
          >
            <span role="img" aria-label="AI">🤖</span> AI Chat
          </Link>
          <Link
            to="/leaderboard"
            className="text-pink-500 px-3 py-1.5 rounded-md hover:bg-pink-100 transition-colors font-semibold tracking-wide"
          >
            Study Hours
          </Link>
          <Link
            to="/messaging"
            className="text-blue-900 px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors font-semibold tracking-wide"
          >
            Messaging
          </Link>
        </div>
      </div>

      {/* Right section: Auth buttons */}
      <div className="flex items-center gap-4">
        <a
          href="https://studyhack.ca.auth0.com/authorize?response_type=token&client_id=rfm0iV2T99Nn99uKt0uVkVqDqDcXaco8&redirect_uri=http://localhost:5000/callback"
          className="bg-[#c465e6] text-white font-semibold text-base px-4 py-2 rounded-md hover:bg-[#b452de] transition-colors"
        >
          Login/Sign Up
        </a>
      </div>
    </nav>
  );
}
