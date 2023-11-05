import "./App.css";
import { Header } from "components/header/Header";
import { Aside } from "components/aside/Aside";
import Board from "components/board/Board";
import { Chat } from "components/chat/Chat";
import React, { useState, useEffect } from "react";
import socket from "utils/socket";

function App() {
  let [player, setPlayer] = useState(null);

  useEffect(() => {
    socket.on("user_connect", (player) => {
      setPlayer(player);
    });
  }, []);

  return (
    <div className="App">
      {player && (
        <>
          <Header />
          <Aside player={player} />
          <Board player={player.id} />
          <Chat player={player} />
        </>
      )}
    </div>
  );
}

export default App;
