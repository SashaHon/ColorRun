const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { playersDataMock } = require("./data/players-mock");
const state = require("./state/state");
const { stat } = require("fs");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

function assignNextPlayerId(playersArr, soket) {
  //checks which next player in data has no soket id and assigns it;
  let newPlayer = playersArr.find((player) => {
    return !player.id;
  });
  // console.log(
  //   "1 here newPlayer from assignNextPlayerId:",
  //   newPlayer,
  //   "1 this is players mock:",
  //   playersArr
  // );
  newPlayer.id = soket.id;
  return newPlayer;
}

function createPlayer(playersMockArr, socket) {
  let player = assignNextPlayerId(playersMockArr, socket);
  // console.log("player:", player);
  state.players.push(player);
  // console.log(
  //   "state (here should be new ID in the player in playersDataMock:",
  //   state
  // );
  return player.id;
}

function findPlayerIndex(array, socketId) {
  return array.findIndex((player) => {
    return player.id === socketId;
  });
}

function removePlayerFromState(socketId) {
  let disconnectedPlayerId = findPlayerIndex(state.players, socketId);
  //console.log("before:", state.players);
  state.players = [
    ...state.players.slice(0, disconnectedPlayerId),
    ...state.players.slice(disconnectedPlayerId + 1),
  ];
  //console.log("after:", state.players);
}

function setPlayerIdToZeroInData(socketId) {
  //sets disconn Player Id to Null in Data
  console.log("before:", playersDataMock);
  let disconnectedPlayerId = findPlayerIndex(playersDataMock, socketId);
  playersDataMock[disconnectedPlayerId].id = null;
  console.log("after:", playersDataMock);
  // console.log("that disconn player:", playersDataMock[disconnectedPlayerId]);
  // console.log("diconnId:", disconnectedPlayerId);
}

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  const currentPlayerId = createPlayer(playersDataMock, socket);
  // console.log("state players after connection:", state.players);
  socket.emit("state_change", { ...state, currentPlayerId });

  socket.on("send_message", (data) => {
    // console.log("something!!!!");
    // console.log(data);
    socket.broadcast.emit("receive_message", data);

    // socket.emit("message", { type: "helo" });
  });

  //!!!!!!!!!!!!
  //io.on disconnection should remove disconnected player from state.players.
  //!!!!!!!!!!!!
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
