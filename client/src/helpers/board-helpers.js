import socket from "utils/socket";

// function getPlayerIndex(array, socketId) {
//   return array.findIndex((player) => {
//     return player.id === socketId;
//   });
// }

function getCtx(canvasRefCurrent) {
  const canvas = canvasRefCurrent;
  return {
    canvas: canvas,
    ctx: canvas.getContext("2d"),
  };
}

// function getCurrentPlayer(gameState) {
//   let currentPlayerIndex = getPlayerIndex(
//     gameState.players,
//     gameState.currentPlayerId
//   );
//   return gameState.players[currentPlayerIndex];
// }

// function getFirstNameLetters(player) {
//   return player.name.slice(0, 2);
// }

function handleKeyDown(e) {
  const keyDirectionString = checkArrowDirection(e.key);
  if (!keyDirectionString) {
    return;
  }
  socket.emit(`is_moving`, {
    movingDirection: keyDirectionString,
  });
}

function handleKeyUp(e) {
  if (
    e.key !== "ArrowLeft" &&
    e.key &&
    "ArrowRight" &&
    e.key !== "ArrowUp" &&
    e.key !== "ArrowDown"
  ) {
    return;
  }
  socket.emit("end_moving", { message: "stop moving!" });
}

function checkArrowDirection(key) {
  if (key === "ArrowLeft") {
    return "ArrowLeft";
  } else if (key === "ArrowRight") {
    return "ArrowRight";
  } else if (key === "ArrowUp") {
    return "ArrowUp";
  } else if (key === "ArrowDown") {
    return "ArrowDown";
  } else return null;
}

export { getCtx, handleKeyDown, handleKeyUp };
