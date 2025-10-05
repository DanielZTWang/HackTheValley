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
            className="h-9 w-9 mr-2 object-contain"
          />
          <span className="text-xl font-semibold">StudyHack</span>
        </Link>
        <div className="flex gap-7 text-lg font-medium">
          <Link
            to="/contact"
            className="text-emerald-500 px-3 py-1.5 rounded-md hover:bg-emerald-100 transition-colors"
          >
            Contact
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
        <Link
          to="/signup"
          className="bg-[#c465e6] text-white font-semibold text-lg px-4 py-2 rounded-md hover:bg-[#b452de] transition-colors"
        >
          Login/Sign Up
        </Link>
      </div>
    </nav>
  );
}
