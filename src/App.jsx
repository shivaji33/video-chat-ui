import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Preview from "./pages/Preview";

function App() {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/:roomId" element={<Room />} />
    <Route path="/:roomId/preview" element={<Preview />} />
  </Routes>;
}

export default App;
