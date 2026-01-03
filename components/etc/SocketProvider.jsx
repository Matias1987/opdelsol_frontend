// socketContext.js
import globals from '@/src/globals';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Create the context
const SocketContext = createContext(null);

// Custom hook for easy access
export const useSocket = () => useContext(SocketContext);

// Provider component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io("http://localhost:3001/", {
      transports: ["websocket"], // optional, ensures WebSocket usage
      auth: { token: globals.getToken() }
    });

    setSocket(socketInstance);

      socketInstance.on("connect", () => {
      setStatus("Connected");
      console.log("Connected to server");
    });

    socketInstance.on("ping", () => {
      console.log("Ping received from server");
      socketInstance.emit("pong"); // respond with pong
    });

    socketInstance.on("disconnect", () => {
      setStatus("Disconnected");
      console.log("Disconnected from server");
    });

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
