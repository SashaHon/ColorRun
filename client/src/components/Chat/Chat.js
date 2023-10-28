import React, { useEffect, useState } from "react";
import "./Chat.css";
import socket from "utils/socket";

export function Chat({ player }) {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState(""); ///pass array of messages;

  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

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
