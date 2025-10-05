import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import MessagingApp from "./pages/MessagingApp";
import ForumPage from "./pages/Forum";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/callback" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/messaging" element={<MessagingApp />} />
          <Route path="/forum" element={<ForumPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
