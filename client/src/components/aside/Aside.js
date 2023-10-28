import React from "react";
import "./Aside.css";

export function Aside({ player }) {
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
        <span className={"color-" + player.name + " bold"}>← ↑ ↓ → </span>to
        move your character on the board.
      </p>
      <p>
        You see other characters? Try to escape them! They might infect you with
        colorless virus to make you loose your shine x_x
      </p>
    </aside>
  );
}
