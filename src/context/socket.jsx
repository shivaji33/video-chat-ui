import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketStore = createContext(null);
const ENDPOINT = "http://localhost:4000";

export const useSocket = () => useContext(SocketStore)

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  


  useEffect(() => {
 
    const socketIO = io(ENDPOINT);

    socketIO.on("connect", () => {
        setSocket(socketIO);
    });
  }, []);

  return <SocketStore.Provider value={socket}>{children}</SocketStore.Provider>;
};

export default SocketProvider;
