const { playersDataMock } = require("../data/players-mock");

const state = { players: [] };

function getPlayerFromState(id) {
  return state.players.find((el) => {
    if (el.id === id) {
      return el;
    }
  });
}

function assignNextPlayerId(socket) {
  let newPlayer = playersDataMock.find((player) => {
    return !player.id;
  });
  newPlayer.id = socket.id;
  return newPlayer;
}

function createPlayer(socket) {
  let player = assignNextPlayerId(socket);
  state.players.push(player);
  return player.id;
}

function getPlayerIndex(socketId) {
  return state.players.findIndex((player) => {
    return player.id === socketId;
  });
}

function removePlayerFromState(socketId) {
  let disconnectedPlayerId = getPlayerIndex(socketId);
  state.players = [
    ...state.players.slice(0, disconnectedPlayerId),
    ...state.players.slice(disconnectedPlayerId + 1),
  ];
}

function setPlayerIdToZeroInDataMock(socketId) {
  let disconnectedPlayerId = getPlayerIndex(socketId);
  playersDataMock[disconnectedPlayerId].id = null;
}

function calculateMovement(currentPlayer, movingDirection) {
  const velocity = 10;

  if (movingDirection === "ArrowLeft") {
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

module.exports = {
  state,
  getPlayerFromState,
  createPlayer,
  removePlayerFromState,
  setPlayerIdToZeroInDataMock,
  calculateMovement,
};
