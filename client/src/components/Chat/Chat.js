import React, { useEffect, useState, useCallback, useRef } from "react";
import "./Chat.css";
import socket from "utils/socket";

export function Chat({ player }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

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
          return (
            <div
              className="message-wrapper"
              key={obj.player.id + index}
              style={{ border: "2px solid" + obj.player.color }}
            >
              <div className="chat-circle">{obj.player.name}:</div>
              <div className="text-message">{obj.message}</div>
            </div>
          );
        })}
      </div>

      <input
        placeholder="your message..."
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}>Send message</button>
    </div>
  );
}
