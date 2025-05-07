// socket.js
import { io } from "socket.io-client";
import { APIURL } from "./APIURL";

const socket = io(APIURL); // Replace <your-ip> with your PC's local IP

export default socket;
