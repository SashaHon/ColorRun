import React, { useEffect, useRef } from "react";
import "./Board.css";
import socket from "utils/socket";
import { getCtx, handleKeyDown, handleKeyUp } from "helpers/board-helpers";
let gameState = {};

export default function Board({ playerId }) {
  const canvasRef = useRef();

  useEffect(() => {
    gameState.currentPlayerId = playerId;

    let { canvas, ctx } = getCtx(canvasRef.current);
    const scaleFactor = window.devicePixelRatio;
    canvas.width = canvas.width * scaleFactor;
    canvas.height = canvas.height * scaleFactor;
    canvas.style.width = canvas.width / scaleFactor + "px";
    canvas.style.height = canvas.height / scaleFactor + "px";

    draw(ctx, canvas)();
    ctx.imageSmoothingQuality = "high";

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    socket.on("state_change", (state) => {
      gameState = { ...state, currentPlayerId: gameState.currentPlayerId };
    });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keydown", handleKeyUp);
      socket.off("state_change");
    };
  }, []);

  return <canvas ref={canvasRef} width="600" height="600" id="board" />;
}

function drawCircle(ctx, player) {
  //creating a circle and defining it's color
  ctx.beginPath();
  ctx.arc(player.x, player.y, 32, 0, 2 * Math.PI);
  ctx.fillStyle = player.color;
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = "grey";

  //creating text and defining it's color, size and location
  ctx.font = "14px KgSecondChancesSketch ";
  ctx.fillStyle = "black";
  ctx.fillText(
    player.name,
    player.x - ctx.measureText(player.name).width / 2,
    player.y + 5
  );
  return ctx;
}

const draw = (ctx, canvas) => () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  gameState.players?.forEach((player) => {
    drawCircle(ctx, player);
  });

  requestAnimationFrame(draw(ctx, canvas));
};
