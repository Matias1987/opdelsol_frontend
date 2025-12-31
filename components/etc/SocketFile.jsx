import globals from "@/src/globals";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function SocketClient() {
  const [status, setStatus] = useState("Connecting...");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to server
    const s = io("http://localhost:3001/", { auth: { token: globals.getToken() } }); 
    setSocket(s);

    s.on("connect", () => {
      setStatus("Connected");
      console.log("Connected to server");
    });

    s.on("ping", () => {
      console.log("Ping received from server");
      s.emit("pong"); // respond with pong
    });

    s.on("disconnect", () => {
      setStatus("Disconnected");
      console.log("Disconnected from server");
    });

    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <div>
      <span style={{fontSize:"10px"}}>Status: {status}</span>
    </div>
  );
}
