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

      {/* Right section: AI Chat + Auth buttons */}
      <div className="flex items-center gap-4">
        <Link
          to="/aichat"
          className="bg-gradient-to-r from-pink-300 via-purple-300 to-fuchsia-400 text-purple-900 font-semibold text-base px-4 py-2 rounded-full shadow hover:from-pink-400 hover:to-fuchsia-500 hover:text-white transition-colors flex items-center gap-2"
        >
          <span role="img" aria-label="AI">🤖</span> AI Chat
        </Link>
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
        <button
          style={{
            marginLeft: "1.5rem",
            padding: "0.4rem 1.2rem",
            background: "#7C3AED",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "1.05rem",
            transition: "background 0.2s"
          }}
          onClick={() => {
            window.location.href = "https://studyhack.ca.auth0.com/authorize?response_type=token&client_id=rfm0iV2T99Nn99uKt0uVkVqDqDcXaco8&redirect_uri=http://localhost:5000/callback";
          }}
        >
          Login
        </button>
      </div>
    </nav>
  );
}
