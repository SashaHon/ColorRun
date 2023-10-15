import "./App.css";
import io from "socket.io-client";
import Board from "components/board/Board";

import React, { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");
//we can create state have there value from the button and pass there data which we can to re-use later
function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      // alert(data.message);
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <input
        placeholder="message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}>Send message</button>
      <h1>Message:</h1>
      {messageReceived}
      <Board />
    </div>
  );
}

export default App;
