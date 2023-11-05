const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const {
  state,
  createPlayer,
  getPlayerFromState,
  removePlayerFromState,
  setPlayerIdToZeroInDataMock,
  calculateMovement,
} = require("./state");

app.use(cors());

const server = http.createServer(app);
const clientUrl = process.env.clientUrl;

const io = new Server(server, {
  cors: {
    origin: clientUrl || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log(`User Connected: ${socket.id}`);

  createPlayer(socket);
  const currentPlayer = getPlayerFromState(socket.id);

  socket.emit("user_connect", {
    id: currentPlayer.id,
    name: currentPlayer.name,
    color: currentPlayer.color,
  });
  // socket.emit("render_aside", { ...state });

  socket.on("is_moving", ({ movingDirection }) => {
    let currentPlayer = getPlayerFromState(socket.id);
    calculateMovement(currentPlayer, movingDirection, socket);
  });

  let intervalId = setInterval(() => {
    socket.emit("state_change", { ...state });
  }, 30);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    // console.log("disconnected", socket.id);
    // here I have to clear from state.players the Id of the disconnected player;
    setPlayerIdToZeroInDataMock(socket.id);
    removePlayerFromState(socket.id);

    // when state has changed and a new player is in I want Board.js to know it and to re-render;
    // socket.emit("state_change", { ...state, currentPlayerId });
  });
});

server.listen(3001, () => {
  //i will use this 3001 port to receive msgs;
  console.log("SERVER IS RUNNING");
});
