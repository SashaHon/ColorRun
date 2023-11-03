import io from "socket.io-client";

const serverUrl = process.env.REACT_APP_URL;
const socket = io.connect(serverUrl ? serverUrl : "http://localhost:3001");

export default socket;
