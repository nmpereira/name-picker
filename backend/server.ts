import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
  UserWithRoom,
} from "./common/types";

import express from "express";

import { createServer } from "http";
import { Server } from "socket.io";
import { UserStore } from "./common/UserStore";
const port = process.env.PORT || 3000;

const app = express();
const httpServer = createServer(app);

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: "*",
  },
});

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Name picker API!");
});

io.on("connection", (socket) => {
  const roomName = socket.handshake.query.roomName as string;
  console.log(`User connected: ${socket.id} to room ${roomName}`);

  if (!UserStore[roomName]) {
    UserStore[roomName] = {};
    console.log(`Created room ${roomName}`);
  }

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  socket.on("join", ({ roomname, username }: UserWithRoom) => {
    socket.join(roomname);
    io.to(roomname).emit("user-list", UserStore[roomname]);
    console.log(`${username} has joined the room ${roomname}`);
  });

  socket.on("add-name", ({ roomname, username }: UserWithRoom) => {
    UserStore[roomname][username] = true;
    io.to(roomname).emit("user-list", UserStore[roomname]);
    console.log(`Name added: ${username}`);
  });

  socket.on("remove-name", ({ roomname, username }: UserWithRoom) => {
    delete UserStore[roomname][username];
    io.to(roomname).emit("user-list", UserStore[roomname]);
    console.log(`Name removed: ${username}`);
  });

  socket.on("check-name", ({ roomname, username }: UserWithRoom) => {
    UserStore[roomname][username] = true;
    io.to(roomname).emit("user-list", UserStore[roomname]);
    console.log(`Name checked: ${username}`);
  });

  socket.on("uncheck-name", ({ roomname, username }: UserWithRoom) => {
    UserStore[roomname][username] = false;
    io.to(roomname).emit("user-list", UserStore[roomname]);
    console.log(`Name unchecked: ${username}`);
  });

  socket.on("roll-dice", ({ roomname }: { roomname: string }) => {
    const names = Object.keys(UserStore[roomname]).filter(
      (name) => UserStore[roomname][name]
    );
    const randomIndex = Math.floor(Math.random() * names.length);
    const randomName = names[randomIndex];
    io.to(roomname).emit("random-name", randomName);
    console.log(`Rolled a random name: ${randomName}`);
  });
});
