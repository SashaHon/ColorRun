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

export { getPlayerIndex, getCtx, getCurrentPlayer, getFirstNameLetters };
