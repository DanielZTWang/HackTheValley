import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", background: "#f4f4f4" }}>
      <Link to="/" style={{ marginRight: "1rem" }}>
        test
      </Link>
      <Link to="/about" style={{ marginRight: "1rem" }}>
        About
      </Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
