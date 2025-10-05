import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Test from "./pages/Test";
import About from "./pages/About";
import AIChat from "./pages/AIChat";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import MessagingApp from "./pages/MessagingApp";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/leaderboard" element={<Leaderboard />} />
          {/* <Route path="/aichat" element={<AIChat />} /> */}
          <Route path="/contact" element={<AIChat />} />
          <Route path="/about" element={<About />} />
          <Route path="/test" element={<Test />} />
          <Route path="/messaging" element={<MessagingApp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
