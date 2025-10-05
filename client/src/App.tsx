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
