import React from "react";
import "./Board.css";
// import gameState from "gameState";
import socket from "utils/socket";
import { useEffect, useRef } from "react";
import "../../helpers/board-helpers";
import {
  getCtx,
  getCurrentPlayer,
  getFirstNameLetters,
  checkArrowDirection,
} from "../../helpers/board-helpers";

let gameState = {};

export default function Board() {
  /////write Board as a function!! then it uses useEffect and renders player on the data it receive
  const canvasRef = useRef(); //it's a refference for React

  // useEffect(() => {
  //   //    some code. here in the end there is an array, it is a dependency. and with an empty array it will be called only once;
  //   // const canvas = canvasRef.current;
  //   // let ctx = canvas.getContext("2d");
  //   // draw(ctx, canvas)();
  //   // return () => {
  //   //   // onUnmount
  //   // }
  // }, []);

  useEffect(() => {
    gameState.isMoving = false;

    socket.on("user_connect", (state) => {
      gameState = state;

      let currentPlayer = getCurrentPlayer(gameState);
      let { canvas, ctx } = getCtx(canvasRef.current);
      let nameLetters = getFirstNameLetters(currentPlayer);

      // console.log(ctx);

      const scaleFactor = window.devicePixelRatio;
      canvas.width = canvas.width * scaleFactor;
      canvas.height = canvas.height * scaleFactor;
      canvas.style.width = canvas.width / scaleFactor + "px";
      canvas.style.height = canvas.height / scaleFactor + "px";

      draw(ctx, canvas, currentPlayer)();
      ctx.imageSmoothingQuality = "high";

      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
    });

    socket.on("state_change", (state) => {
      gameState = state;
      // console.log(state);
    });
  }, []); // empty arr means i subscribed to "state_change" only one time, so that it always listens to it. no need to resubscribe.

  return <canvas ref={canvasRef} width="600" height="600" id="board" />;
}

function drawCircle(ctx, x, y, color, nameLetters) {
  //creating a circle and defining it's color
  ctx.beginPath();
  ctx.arc(x, y, 32, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
  //creating text and defining it's color, size and location
  ctx.font = "20px Arial sans-serif";
  ctx.fillStyle = "black";
  ctx.fillText(nameLetters, x - 10, y + 5);
  return ctx;
}

const draw = (ctx, canvas, currentPlayer) => () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let nameLetters = getFirstNameLetters;
  console.log({ gameState });
  drawCircle(
    ctx,
    currentPlayer.x,
    currentPlayer.y,
    currentPlayer.color,
    nameLetters
  );
  requestAnimationFrame(draw(ctx, canvas, currentPlayer));
};

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
  // console.log("KeyUP!!");
  // gameState.isMoving = !gameState.isMoving;
  socket.emit("end_moving", { message: "stop moving!" });
}
