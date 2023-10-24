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
  // console.log(
  //   "1 here newPlayer from assignNextPlayerId:",
  //   newPlayer,
  //   "1 this is players mock:",
  //   playersArr
  // );
  newPlayer.id = socket.id;
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

function getPlayerIndex(array, socketId) {
  return array.findIndex((player) => {
    return player.id === socketId;
  });
}

// function getPlayerFromState(id) {
//   return state.players.find((el, i) => {
//     if (el.id === id) {
//       return el;
//     }
//   });
// }

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
  // console.log("state players after connection:", state.players);
  socket.emit("user_connect", { ...state, currentPlayerId });

  socket.on("is_moving", ({ movingDirection }) => {
    let currPlayer = getPlayerFromState(state.players, socket.id);
    calculateMovingLeft(currPlayer, movingDirection, socket);
    // calc_movement({ id, movingDirection })
    // console.log(top, left);
  });

  socket.on("end_moving", ({ message }) => {
    //stop calculating and rendering;
    console.log(message);
  });

  let intervalId = setInterval(() => {
    socket.emit("state_change", { ...state });
  }, 100);

  socket.on("send_message", (data) => {
    // console.log("something!!!!");
    // console.log(data);
    socket.broadcast.emit("receive_message", data);

    // socket.emit("message", { type: "helo" });
  });

  // socket.on("move_left", (obj) => {
  //   console.log(obj);
  // });

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

function calculateMovingLeft(currPlayer, movingDirection, socket) {
  if (movingDirection === "ArrowLeft") {
    console.log("moving left", currPlayer.x, currPlayer.y);
    // console.log("curr player", currPlayer);
    currPlayer.x += 10;
    console.log(state);
    console.log(currPlayer);
    // socket.emit("state_change", { ...state });
    //calcFunc(x,y);
    // do left calcs and do left constrain;
  } else if (movingDirection === "ArrowRight") {
    // do right calcs and do right constrain;
  } else if (movingDirection === "ArrowUp") {
    // do up calcs and do up constrain;
  } else if (movingDirection === "ArrowDown") {
    // do down calcs and do down constrain;
  } else {
    console.log("no such direction:", movingDirection);
  }
}
