import { Link } from "react-router-dom";
import logo from "../assets/studyhacks-logo.svg";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-gray-100 shadow-[0_2px_12px_0_rgba(124,58,237,0.07)]">
      {/* Left section: Logo + links */}
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center no-underline mr-10">
          <img
            src={logo}
            alt="StudyHacks Logo"
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
            className="text-emerald-500 px-3 py-1.5 rounded-md hover:bg-emerald-100 transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Right section: Auth buttons */}
      <div className="flex items-center gap-4">
        <Link
          to="/signin"
          className="text-gray-700 font-medium text-base px-3 py-2 rounded-md hover:bg-gray-200 transition-colors"
        >
          Sign In
        </Link>
        <Link
          to="/signup"
          className="bg-[#c465e6] text-white font-semibold text-base px-4 py-2 rounded-md hover:bg-[#b452de] transition-colors"
        >
          Create Account
        </Link>
      </div>
    </nav>
  );
}
