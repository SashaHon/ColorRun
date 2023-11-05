import React from "react";
import "./Aside.css";

export function Aside({ player }) {
  return (
    <aside>
      <h2>
        Welcome,{" "}
        <span
          className="bold"
          style={{
            color: player.color,
          }}
        >
          {player.name} !
        </span>
      </h2>
      <p>Your first time in Color Run?</p>
      <p>
        No worries, the rules are easy-peasy :) Use arrows{" "}
        <span
          className="bold"
          style={{
            color: player.color,
          }}
        >
          ← ↑ ↓ →{" "}
        </span>
        to move your character on the board. If you feel bored try out to chat
        with your mates. Hope you enjoy it!
      </p>
      <br></br>
      <p className="grey">
        <em>These are upcoming features:</em>
      </p>
      <p className="grey">
        <em>
          See other characters? Try to escape them! They might infect you with
          colorless virus to make you loose your shine x_x
        </em>
      </p>
    </aside>
  );
}
