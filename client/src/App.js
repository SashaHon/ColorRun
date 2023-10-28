import "App.css";
import { Header } from "components/header/Header";
import { Aside } from "components/aside/Aside";
import Board from "components/board/Board";
import { Chat } from "components/Chat/Chat";
import React, { useState, useEffect } from "react";
import socket from "utils/socket";
//we can create state have there value from the button and pass there data which we can to re-use later

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
