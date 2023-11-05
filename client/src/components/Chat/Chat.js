import React, { useEffect, useState, useCallback, useRef } from "react";
import "./Chat.css";
import socket from "utils/socket";

export function Chat({ player }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageWrapperRef = useRef();

  useEffect(() => {
    const divElement = messageWrapperRef.current;
    divElement?.scrollIntoView();
  }, [messages]);

  const isFistMessageBySamePlayer = useCallback(
    (lastMessageData) => {
      const previousMessage = messages[messages.length - 1];
      if (lastMessageData.player.id === previousMessage?.player?.id) {
        lastMessageData.isFistMessageBySamePlayer = false;
      }
    },
    [messages]
  );

  const handleReceiveMessage = useCallback(
    (data) => {
      isFistMessageBySamePlayer(data);
      setMessages([...messages, data]);
    },
    [isFistMessageBySamePlayer, messages]
  );

  const sendMessage = useCallback(() => {
    if (message.trim() === "") return;
    const messageData = { message, player };
    messageData.isFistMessageBySamePlayer = true;
    socket.emit("send_message", messageData);
    handleReceiveMessage(messageData);
    setMessage("");

    //somewhere here make element scroll into view;
  }, [handleReceiveMessage, message, player]);

  const handleKeyDownEnter = useCallback(
    (e) => {
      if (e.key !== "Enter") {
        return;
      }
      sendMessage();
    },
    [sendMessage]
  );

  document.addEventListener("keydown", handleKeyDownEnter);

  useEffect(() => {
    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      document.removeEventListener("keydown", handleKeyDownEnter);
    }; //clean up function does unsubscription when and before next call of useEffect is made;
  }, [handleReceiveMessage, handleKeyDownEnter]);

  return (
    <div className="Chat">
      <h2>Chat</h2>

      <div className="Chat-display">
        {messages.map((obj, index, array) => {
          return (
            <div
              ref={index === array.length - 1 ? messageWrapperRef : undefined}
              key={obj.player.id + index}
            >
              {obj.isFistMessageBySamePlayer && (
                <div className="user-name">{obj.player.name}</div>
              )}

              <div
                className="text-message"
                style={{
                  backgroundColor: obj.player.color + 80,
                }}
              >
                {obj.message}
              </div>
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
