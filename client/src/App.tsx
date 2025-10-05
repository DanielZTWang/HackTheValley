import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AIChat from "./pages/AIChat";
import Leaderboard from "./pages/Leaderboard";
import MessagingApp from "./pages/MessagingApp";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aichat" element={<AIChat />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/contact" element={<AIChat />} />
          <Route path="/messaging" element={<MessagingApp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
