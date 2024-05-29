const express = require("express");

const { createServer } = require("http");
const { Server } = require("socket.io");
const port = process.env.PORT || 3000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
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
  console.log(`User connected: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  socket.on("message", (msg) => {
    console.log(`Message: ${msg}`);
    io.emit("message", msg);
  });

  socket.on("join", ({ room, username }) => {
    socket.join(room);
    io.to(room).emit("message", `${username} has joined the room`);
    console.log(`${username} has joined the room ${room}`);
  });
});
