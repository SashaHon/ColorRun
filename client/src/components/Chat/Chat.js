import React, { useEffect, useState, useCallback } from "react";
import "./Chat.css";
import socket from "utils/socket";

export function Chat({ player }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); ///pass array of messages;

  const sendMessage = () => {
    const messageData = { message, player };
    socket.emit("send_message", messageData);
    handleReceiveMessage(messageData);
    setMessage("");
  };

  const handleReceiveMessage = useCallback(
    (data) => {
      setMessages([...messages, data]);
    },
    [messages]
  );

  useEffect(() => {
    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    }; //clean up function does unsubscription when and before next call of useEffect is made;
  }, [handleReceiveMessage]);

  return (
    <div className="Chat">
      <h2>Chat</h2>
      <div className="Chat-display">
        {messages.map((obj, index) => {
          return <div key={obj.player.id + index}>{obj.message}</div>;
        })}
      </div>
      <input
        placeholder="  your message..."
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}>Send message</button>
    </div>
  );
}
