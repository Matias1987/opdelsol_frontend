import { useEffect, useState } from "react";
import { useSocket } from "./SocketProvider";

const SocketStatus = (_) => {
  const socket = useSocket();
  const [status, setStatus] = useState("Disconnected");
  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
        setStatus("Connected: " + socket.id);
    });

    socket.on("message", (msg) => {
      console.log("New message:", msg);
    });

    return () => {
      socket.off("connect");
      socket.off("message");
      setStatus("Disconnected");
    };
  }, [socket]);

  return <>{status}</>;
};

export default SocketStatus;
