import React, { useEffect, useState, useCallback, useRef } from "react";
import "./Chat.css";
import socket from "utils/socket";

export function Chat({ player }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState(null);

  const sendMessage = useCallback(() => {
    if (message === "") return;
    const messageData = { message, player };
    messageData.isFirstMessage = true;

    socket.emit("send_message", messageData);

    handleReceiveMessage(messageData);
    setMessage("");
  });

  // function toRenderName() {
  //   const lastMessage = messages[messages.length - 1];
  //   const previousMessage = messages[messages.length - 2];

  //   if (lastMessage.player.id === previousMessage?.player.id) {
  //     return false;
  //   }
  //   // return true;
  //   // console.log(lastMessage.player == previousMessage?.player);
  //   return lastMessage.player.name;
  // }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function isFirstMessage(lastMessageData) {
    const previousMessage = messages[messages.length - 1];
    if (lastMessageData.player.id === previousMessage?.player?.id) {
      console.log("same player");
      lastMessageData.isFirstMessage = false;
    }
  }

  const handleReceiveMessage = useCallback(
    (data) => {
      isFirstMessage(data);
      setMessages([...messages, data]);

      // setLastMessage(data);
    },
    [isFirstMessage, messages]
  );

  const handleKeyDownEnter = useCallback(
    (e) => {
      //sprosit' pochemu jeltym podcherkivaet.
      if (e.key !== "Enter") {
        return;
      }
      sendMessage();
      // console.log("cu", message); ///sprosit' pochemy tak mnogo console.log kogda input dlennee chem 1 esli ne obernuto v useCallback
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
        {messages.map((obj, index) => {
          return (
            <div className="message-wrapper" key={obj.player.id + index}>
              {obj.isFirstMessage && (
                <div className="user-name">{obj.player.name}:</div>
              )}

              <div
                className="text-message"
                style={{ border: "2px solid" + obj.player.color }}
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
