import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Test from "./pages/Test";
import About from "./pages/About";
import MainMenu from "./pages/MainMenu";
import AIChat from "./pages/AIChat";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: "1rem" }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', gap: '1.2rem' }}>
          <a href="/" style={{
            textDecoration: 'none',
            color: window.location.pathname === '/' ? '#f43f5e' : '#a21caf',
            fontWeight: 700,
            fontSize: '1.08rem',
            background: window.location.pathname === '/' ? 'rgba(244,63,94,0.09)' : 'transparent',
            borderRadius: '0.7rem',
            padding: '0.4rem 1.2rem',
            transition: 'background 0.2s, color 0.2s'
          }}>Main Menu</a>
          <a href="/aichat" style={{
            textDecoration: 'none',
            color: window.location.pathname === '/aichat' ? '#f43f5e' : '#a21caf',
            fontWeight: 700,
            fontSize: '1.08rem',
            background: window.location.pathname === '/aichat' ? 'rgba(244,63,94,0.09)' : 'transparent',
            borderRadius: '0.7rem',
            padding: '0.4rem 1.2rem',
            transition: 'background 0.2s, color 0.2s'
          }}>AI Chat</a>
        </div>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/aichat" element={<AIChat />} />
          <Route path="/about" element={<About />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
