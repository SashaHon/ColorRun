const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { playersDataMock } = require("./data/players-mock");
const state = require("./state/state");
const { stat } = require("fs");
const {
  getPlayerFromState,
  createPlayer,
  removePlayerFromState,
  setPlayerIdToZeroInDataMock,
  calculateMovement,
} = require("./server-helpers");

app.use(cors());

const server = http.createServer(app);
const clientUrl = process.env.clientUrl;

const io = new Server(server, {
  cors: {
    origin: clientUrl || "http://localhost:3000/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log(`User Connected: ${socket.id}`);

  const currentPlayerId = createPlayer(playersDataMock, socket);
  const currentPlayer = getPlayerFromState(state.players, socket.id);

  socket.emit("user_connect", {
    id: currentPlayer.id,
    name: currentPlayer.name,
    color: currentPlayer.color,
  });
  socket.emit("render_aside", { ...state });

  socket.on("is_moving", ({ movingDirection }) => {
    let currentPlayer = getPlayerFromState(state.players, socket.id);
    calculateMovement(currentPlayer, movingDirection, socket);
  });

  let intervalId = setInterval(() => {
    socket.emit("state_change", { ...state });
  }, 1);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    // console.log("disconnected", socket.id);
    // here I have to clear from state.players the Id of the disconnected player;
    removePlayerFromState(socket.id);
    setPlayerIdToZeroInDataMock(socket.id);
    // when state has changed and a new player is in I want Board.js to know it and to re-render;
    socket.emit("state_change", { ...state, currentPlayerId });
  });
});

server.listen(3001, () => {
  //i will use this 3001 port to receive msgs;
  console.log("SERVER IS RUNNING");
});
