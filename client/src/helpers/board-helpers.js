function getPlayerIndex(array, socketId) {
  return array.findIndex((player) => {
    return player.id === socketId;
  });
}

function getCtx(canvasRefCurrent) {
  const canvas = canvasRefCurrent;
  return {
    canvas: canvas,
    ctx: canvas.getContext("2d"),
  };
}

function getCurrentPlayer(gameState) {
  let currentPlayerIndex = getPlayerIndex(
    gameState.players,
    gameState.currentPlayerId
  );
  return gameState.players[currentPlayerIndex];
}

function getFirstNameLetters(player) {
  return player.name.slice(0, 2);
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

// function drawCircle(ctx, x, y, color, nameLetters) {
//   ctx.beginPath();
//   ctx.arc(x, y, 16, 0, 2 * Math.PI);
//   ctx.fillStyle = color;
//   ctx.fill();
//   // ctx.stroke();
//   ctx.font = "10px Arial sans-serif";
//   ctx.fillStyle = "black";
//   // console.log("width:", nameLetters.width, "height:", nameLetters.height);
//   ctx.fillText(nameLetters, x - 5, y + 3);
//   return ctx;
// }

// function draw(gameState, ctx, canvas, x, y, color, nameLetters) {
//   // console.log(canvas.width);
//   return (ctx, canvas, x, y, color, nameLetters) => {
//     // ctx.clearRect(0, 0, canvas.width, canvas.height);

//     drawCircle(ctx, x, y, color, nameLetters);
//     requestAnimationFrame(draw(ctx, canvas));
//   };
// }

export {
  getPlayerIndex,
  getCtx,
  getCurrentPlayer,
  getFirstNameLetters,
  checkArrowDirection,
};
