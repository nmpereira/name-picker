import { IRoom } from "./UserStore";

export interface UserWithRoom {
  username: string;
  roomname: string;
}

export interface ServerToClientEvents {
  // "add-name": (name: string) => void;
  // "remove-name": (name: string) => void;
  // "check-name": (name: string) => void;
  // "uncheck-name": (name: string) => void;
  "user-list": (userList: IRoom) => void;
}

export interface ClientToServerEvents {
  join: (data: UserWithRoom) => void;
  "add-name": (data: UserWithRoom) => void;
  "remove-name": (data: UserWithRoom) => void;
  "check-name": (data: UserWithRoom) => void;
  "uncheck-name": (data: UserWithRoom) => void;
}

export interface InterServerEvents {}

export interface SocketData {}
