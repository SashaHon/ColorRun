import React from "react";
import "./Aside.css";
// import gameState

export function Aside() {
  return (
    <aside>
      <h2>Welcome, Color!</h2>
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
