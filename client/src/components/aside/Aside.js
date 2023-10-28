import React, { useState, useEffect } from "react";
import "./Aside.css";
import socket from "utils/socket";
import { getCurrentPlayer } from "helpers/board-helpers";

let gameState = {};

export function Aside() {
  let [player, setPlayer] = useState({});

  socket.on("user_connect", ({ currentPlayerId }) => {
    gameState.currentPlayerId = currentPlayerId;
  });

  useEffect(() => {
    socket.on("render_aside", (state) => {
      gameState = { ...state, currentPlayerId: gameState.currentPlayerId };
      player = getCurrentPlayer(gameState);
      setPlayer(player);
    });
  }, []);

  return (
    <aside>
      <h2>
        Welcome,{" "}
        <span className={"color-" + player.name + " bold"}>
          {player.name} !
        </span>
      </h2>
      <p>Your first time in Color Run?</p>
      <p>
        No worries, the rules are easy-peasy :) Use arrows{" "}
        <span className="grey">← ↑ ↓ → </span>to move your character on the
        board.
      </p>
      <p>
        You see other characters? Try to escape them! They might infect you with
        colorless virus to make you loose your shine x_x
      </p>
    </aside>
  );
}
