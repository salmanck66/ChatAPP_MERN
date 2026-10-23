import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser, clearSession } = useAuthContext();

  useEffect(() => {
    if (!authUser) return;

    // Same origin as the API; the server authenticates the socket from the httpOnly JWT cookie
    const socketInstance = io({ withCredentials: true });

    socketInstance.on("getOnlineUsers", setOnlineUsers);
    socketInstance.on("connect_error", (err) => {
      if (err.message === "Unauthorized") clearSession();
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
      setSocket(null);
      setOnlineUsers([]);
    };
  }, [authUser, clearSession]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
