import { io } from "socket.io-client";

export const socket = io(
  import.meta.env.VITE_API_URL || "http://localhost:4000",
  {
    path: "/api/socket",
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
  }
);
