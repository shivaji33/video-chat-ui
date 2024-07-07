import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";

function App() {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/:roomId/:userName" element={<Room />} />
  </Routes>;
}

export default App;
