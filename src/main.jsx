// import React from 'react'
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import SocketProvider from "./context/socket.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <SocketProvider>
      <App />
    </SocketProvider>
  </BrowserRouter>
  // </React.StrictMode>,
);
