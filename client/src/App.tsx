import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Test from "./pages/Test";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Test />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
