import React, { useEffect, useState } from "react";
import "./Chat.css";
import socket from "utils/socket";

export function Chat() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  // useEffect(() => {

  // })

  useEffect(() => {
    socket.on("receive_message", (data) => {
      // alert(data.message);
      setMessageReceived(data.message);
    });
  }, []);

  return (
    <div className="Chat">
      <h2>Chat</h2>
      <div className="Chat-display">{messageReceived}</div>
      <input
        placeholder="your message..."
        onChange={(event) => {
          setMessage(event.target.value);
          console.log(message);
        }}
      />
      <button onClick={sendMessage}>Send message</button>
    </div>
  );
}
