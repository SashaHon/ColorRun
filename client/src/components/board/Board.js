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
    socket.on("state_change", (state) => {
      gameState = state;

      let currentPlayer = getCurrentPlayer(gameState);
      let { canvas, ctx } = getCtx(canvasRef.current);
      let nameLetters = getFirstNameLetters(currentPlayer);
      console.log(nameLetters);

      console.log("curr player color:", typeof currentPlayer.color);
      let circle = draw(
        ctx,
        canvas,
        currentPlayer.x,
        currentPlayer.y,
        currentPlayer.color,
        nameLetters
      )();
      console.log("circle:", circle);
      console.log("ctx:", ctx);
    });
  }, []); // empty arr means i subscribed to "state_change" only one time, so that it always listens to it. no need to resubscribe.

  //event keydown
  //eventKeyUp
  //addeventlisteners

  return <canvas ref={canvasRef} width="600" height="600" id="board" />;
}

function drawCircle(ctx, x, y, color, nameLetters) {
  ctx.beginPath();
  // ctx.arc(x, y, 10, 0, 2 * Math.PI);
  // ctx.stroke();
  ctx.fillStyle = color;
  // console.log(color);
  ctx.fill();
  ctx.font = "48px serif";
  ctx.fillText(nameLetters, x, y);
  return ctx;
}

const draw = (ctx, canvas, x, y, color, nameLetters) => () => {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  // console.log(gameState);

  drawCircle(ctx, x, y, color, nameLetters);
  // requestAnimationFrame(draw(ctx, canvas));
};
