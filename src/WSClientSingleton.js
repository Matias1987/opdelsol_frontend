import { io } from "socket.io-client";
import globals from "@/src/globals";

let socket = null;
let status = "Disconnected";

export const getSocket = () => {
  if (!socket) {
    socket = io("http://localhost:3001/", {
      auth: { token: globals.getToken() },
    });
    socket.on("connect", () => console.log("Connected"));
    socket.on("disconnect", () => console.log("Disconnected"));
    socket.on("error", (err) => console.error("WebSocket error", err));
    socket.on("ping", () => {
      console.log("Ping received from server");
      socket.emit("pong"); // respond with pong
    });
  }
  return socket;
};
