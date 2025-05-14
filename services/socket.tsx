// socket.js
import { io } from "socket.io-client";
import { MAINURL } from "./APIURL";

const socket = io(MAINURL); // Replace <your-ip> with your PC's local IP

export default socket;
