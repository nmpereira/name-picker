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
    UserStore[roomName] = {
      users: {},
      lastRoll: null,
      isRolling: false,
    };
    console.log(`Created room ${roomName}`);
  }

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id} from room ${roomName}`);

    io.to(roomName).emit(
      "online-users",
      io.sockets.adapter.rooms.get(roomName)?.size || 0
    );
  });

  socket.on("join", ({ roomname, username }: UserWithRoom) => {
    socket.join(roomname);
    io.to(roomname).emit("user-list", UserStore[roomname].users);

    if (UserStore[roomname].lastRoll && !UserStore[roomname].isRolling) {
      io.to(roomname).emit(
        "random-name",
        UserStore[roomname].lastRoll as string
      );
    }
    console.log(`${username} has joined the room ${roomname}`);

    io.to(roomname).emit(
      "online-users",
      io.sockets.adapter.rooms.get(roomname)?.size || 0
    );
  });

  socket.on("add-name", ({ roomname, username }: UserWithRoom) => {
    UserStore[roomname].users[username] = false;
    io.to(roomname).emit("user-list", UserStore[roomname].users);
    console.log(`Name added: ${username}`);
  });

  socket.on("remove-name", ({ roomname, username }: UserWithRoom) => {
    delete UserStore[roomname].users[username];
    io.to(roomname).emit("user-list", UserStore[roomname].users);
    console.log(`Name removed: ${username}`);
  });

  socket.on("check-name", ({ roomname, username }: UserWithRoom) => {
    UserStore[roomname].users[username] = true;
    io.to(roomname).emit("user-list", UserStore[roomname].users);
    console.log(`Name checked: ${username}`);
  });

  socket.on("uncheck-name", ({ roomname, username }: UserWithRoom) => {
    UserStore[roomname].users[username] = false;
    io.to(roomname).emit("user-list", UserStore[roomname].users);
    console.log(`Name unchecked: ${username}`);
  });

  socket.on("roll-dice", async ({ roomname }: { roomname: string }) => {
    if (
      Object.keys(UserStore[roomname].users).length === 0 ||
      !Object.values(UserStore[roomname].users).some((checked) => checked)
    ) {
      console.log("No names to roll");
      io.to(roomname).emit("random-name", null);
      return;
    }

    io.to(roomname).emit("rolling");
    UserStore[roomname].isRolling = true;

    const names = Object.keys(UserStore[roomname].users).filter(
      (name) => UserStore[roomname].users[name]
    );
    const randomIndex = Math.floor(Math.random() * names.length);
    const randomName = names[randomIndex];
    UserStore[roomname].lastRoll = randomName;
    console.log(`Rolled a random name: ${randomName}`);

    await new Promise((resolve) => {
      const timeout = Math.floor(Math.random() * 3000) + 1000;
      console.log(`Rolling for ${timeout}ms`);
      setTimeout(resolve, timeout);
    });

    io.to(roomname).emit("random-name", randomName);
    UserStore[roomname].isRolling = false;
  });

  socket.on("clear-names", ({ roomname }: { roomname: string }) => {
    Object.keys(UserStore[roomname].users).forEach((name) => {
      UserStore[roomname].users[name] = false;
    });
    io.to(roomname).emit("user-list", UserStore[roomname].users);
    console.log("Cleared all names");
  });
});
