import io from "socket.io-client";

const serverUrl = process.env.REACT_APP_SOCKETIO_SERVER;
// console.log(serverUrl);

//send websocket msgs to port 3001
const socket = io.connect(serverUrl || "http://localhost:3001");

export default socket;
