"use strict";

module.exports = {
  calc_movement: function ({ data }) {
    console.log("i work");
    console.log({ data });
  },

  getPlayerFromState: function (stateArr, id) {
    return stateArr.find((el) => {
      if (el.id === id) {
        return el;
      }
    });
  },
  createPlayer: function (playersMockArr, socket) {
    let player = assignNextPlayerId(playersMockArr, socket);
    state.players.push(player);
    return player.id;
  },
  assignNextPlayerId: function (playersArr, socket) {
    //checks which next player in data has no socket id and assigns it;
    let newPlayer = playersArr.find((player) => {
      return !player.id;
    });
    newPlayer.id = socket.id;
    return newPlayer;
  },
  getPlayerIndex: function (array, socketId) {
    return array.findIndex((player) => {
      return player.id === socketId;
    });
  },
  removePlayerFromState: function (socketId) {
    let disconnectedPlayerId = getPlayerIndex(state.players, socketId);
    //console.log("before:", state.players);
    state.players = [
      ...state.players.slice(0, disconnectedPlayerId),
      ...state.players.slice(disconnectedPlayerId + 1),
    ];
    //console.log("after:", state.players);
  },
  setPlayerIdToZeroInDataMock: function (socketId) {
    //sets disconn Player Id to Null in Data
    // console.log("before:", playersDataMock);
    let disconnectedPlayerId = getPlayerIndex(playersDataMock, socketId);
    playersDataMock[disconnectedPlayerId].id = null;
    // console.log("after:", playersDataMock);
    // console.log("that disconn player:", playersDataMock[disconnectedPlayerId]);
    // console.log("diconnId:", disconnectedPlayerId);
  },
  calculateMovement: function (currentPlayer, movingDirection) {
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
  },
};
