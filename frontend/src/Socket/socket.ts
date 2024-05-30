import { io, Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../../backend/common/types";

const NODE_ENV = import.meta.env.VITE_NODE_ENV;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "null";
export const SERVER_URL =
  NODE_ENV === "production" ? BACKEND_URL : "http://localhost:3000";

export const roomName = window.location.href.split("/")[3] || "default";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  SERVER_URL,
  {
    query: {
      roomName,
    },
  }
);

export default socket;
