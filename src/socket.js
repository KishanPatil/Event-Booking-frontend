// src/socket.js
import { io } from "socket.io-client";

// use your backend URL
export const socket = io("http://localhost:4000", {
  transports: ["websocket"], // optional, ensures stable connection
  withCredentials: true,     // if backend uses cookies
});
