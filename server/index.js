const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
const crypto = require("crypto");

io.on("connection", (socket) => {
  socket.io = io;

  socket.on("joinRoom", ({ roomCode, username }) => {
    socket.join(roomCode);

    socket.emit("waiting_room", {
      token: crypto.randomUUID(),
      isRegistered: true,
    });
  });

  socket.on("game_load", (roomCode) => {
    const users = io.sockets.adapter.rooms.get(roomCode) || {};
    const user_count = Array.from(users).length;
    if (user_count === 2) {
      socket.nsp.to(roomCode).emit("game_start", true);
    }
  });

  socket.on("play", ({ id, roomCode, restart }) => {
    if (!restart) {
      return socket.broadcast
        .to(roomCode)
        .emit("updateGame", { id, restart: false });
    }
    return socket.nsp.to(roomCode).emit("updateGame", { restart: true });
  });

  socket.on("getUsers", ({ roomCode, name }) => {
    socket.broadcast.to(roomCode).emit("updateUsers", name);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("server running"));
