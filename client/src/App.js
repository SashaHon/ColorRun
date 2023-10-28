import "./App.css";
import { Header } from "components/header/Header";
import { Aside } from "components/aside/Aside";
import Board from "components/board/Board";
import { Chat } from "components/Chat/Chat";
import React, { useEffect, useState } from "react";
// import socket from "utils/socket";
//we can create state have there value from the button and pass there data which we can to re-use later
function App() {
  return (
    <div className="App">
      <Header />
      <Aside />
      <Board />
      <Chat />
    </div>
  );
}

export default App;
