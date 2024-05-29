import { io } from "socket.io-client";

const NODE_ENV = import.meta.env.VITE_NODE_ENV;
const BACKEND_URL = import.meta.env.BACKEND_URL || "null";
export const SERVER_URL =
  NODE_ENV === "production" ? BACKEND_URL : "http://localhost:3000";

const roomName = window.location.href.split("/")[3] || "default";

console.log("Connecting to server at", SERVER_URL, "with room name", roomName);

const socket = io(SERVER_URL, {
  query: {
    roomName,
  },
});

export default socket;
