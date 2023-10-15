const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    // console.log("something!!!!");
    // console.log(data);
    socket.broadcast.emit("receive_message", data);

    // socket.emit("message", { type: "helo" });
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
