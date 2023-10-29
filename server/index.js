const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { playersDataMock } = require("./data/players-mock");
const state = require("./state/state");
const { stat } = require("fs");
const { calc_movement, getPlayerFromState } = require("./server-helpers");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

function assignNextPlayerId(playersArr, socket) {
  //checks which next player in data has no socket id and assigns it;
  let newPlayer = playersArr.find((player) => {
    return !player.id;
  });
  newPlayer.id = socket.id;
  return newPlayer;
}

function createPlayer(playersMockArr, socket) {
  let player = assignNextPlayerId(playersMockArr, socket);
  state.players.push(player);
  return player.id;
}

function getPlayerIndex(array, socketId) {
  return array.findIndex((player) => {
    return player.id === socketId;
  });
}

function removePlayerFromState(socketId) {
  let disconnectedPlayerId = getPlayerIndex(state.players, socketId);
  //console.log("before:", state.players);
  state.players = [
    ...state.players.slice(0, disconnectedPlayerId),
    ...state.players.slice(disconnectedPlayerId + 1),
  ];
  //console.log("after:", state.players);
}

function setPlayerIdToZeroInData(socketId) {
  //sets disconn Player Id to Null in Data
  // console.log("before:", playersDataMock);
  let disconnectedPlayerId = getPlayerIndex(playersDataMock, socketId);
  playersDataMock[disconnectedPlayerId].id = null;
  // console.log("after:", playersDataMock);
  // console.log("that disconn player:", playersDataMock[disconnectedPlayerId]);
  // console.log("diconnId:", disconnectedPlayerId);
}

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  const currentPlayerId = createPlayer(playersDataMock, socket);
  const currentPlayer = getPlayerFromState(state.players, socket.id);
  // console.log("state players after connection:", state.players);
  // console.log("curr player id", currentPlayerId);

  // console.log(currentPlayer);
  socket.emit("user_connect", {
    id: currentPlayer.id,
    name: currentPlayer.name,
    color: currentPlayer.color,
  });

  socket.emit("render_aside", { ...state });

  socket.on("is_moving", ({ movingDirection }) => {
    let currentPlayer = getPlayerFromState(state.players, socket.id);
    calculateMovement(currentPlayer, movingDirection, socket);
    // calc_movement({ id, movingDirection })
  });

  socket.on("end_moving", ({ message }) => {
    console.log(message);
  });

  let intervalId = setInterval(() => {
    socket.emit("state_change", { ...state });
  }, 1);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
    console.log("data", data);
    // socket.emit("message", { type: "helo" });
  });

  socket.on("disconnect", () => {
    console.log("disconnected", socket.id);
    // here I have to clear from state.players the Id of the disconnected player;
    removePlayerFromState(socket.id);
    // here I set player Id to zero in playersDataMock, so that a new player can use the same char;
    setPlayerIdToZeroInData(socket.id);
    // when state has changed and a new player is in I want Board.js to know it and to re-render;
    socket.emit("state_change", { ...state, currentPlayerId });
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});

function calculateMovement(currentPlayer, movingDirection, socket) {
  const velocity = 10;

  if (movingDirection === "ArrowLeft") {
    console.log("moving left", currentPlayer.x, currentPlayer.y);
    if (currentPlayer.x <= 33) {
      currentPlayer.x = 33;
      return;
    }
    currentPlayer.x -= velocity;
  } else if (movingDirection === "ArrowRight") {
    if (currentPlayer.x >= 1167) {
      currentPlayer.x = 1167;
      return;
    }
    currentPlayer.x += velocity;
  } else if (movingDirection === "ArrowUp") {
    if (currentPlayer.y <= 33) {
      currentPlayer.y = 33;
      return;
    }
    currentPlayer.y -= velocity;
  } else if (movingDirection === "ArrowDown") {
    if (currentPlayer.y >= 1167) {
      currentPlayer.y = 1167;
      return;
    }
    currentPlayer.y += velocity;
  } else {
    console.log("no such direction:", movingDirection);
  }
}
