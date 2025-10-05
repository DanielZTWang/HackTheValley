
import { Link } from "react-router-dom";
import logo from "../assets/studyhacks-logo.svg";

export default function Navbar() {
  return (
    <nav
      style={{
        padding: "1.1rem 2.2rem",
        background: "#f4f4f4",
        display: "flex",
        alignItems: "center",
        boxShadow: "0 2px 12px 0 rgba(124, 58, 237, 0.07)",
        gap: "2.5rem"
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", marginRight: "2.5rem" }}>
        <img src={logo} alt="StudyHacks Logo" style={{ height: "2.2rem", width: "2.2rem", marginRight: "0.6rem", display: "block", objectFit: "contain", verticalAlign: "middle" }} />
        <span className="studyhacks-brand" style={{
          fontSize: "1.25rem",
          fontWeight: 600,
          padding: "0.07em 0.45em",
          verticalAlign: "middle"
        }}>
          StudyHacks
        </span>
      </Link>
      <div style={{ display: "flex", gap: "1.7rem", fontSize: "1.08rem", fontWeight: 500, alignItems: "center" }}>
        <Link to="/about" style={{ textDecoration: "none", color: "#7C3AED", padding: "0.3rem 1rem", borderRadius: "0.5rem", transition: "background 0.2s" }}>
          About
        </Link>
        <Link to="/contact" style={{ textDecoration: "none", color: "#10B981", padding: "0.3rem 1rem", borderRadius: "0.5rem", transition: "background 0.2s" }}>
          Contact
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
