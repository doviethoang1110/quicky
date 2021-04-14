import { io } from "socket.io-client";
import {authHeader} from "./authHeader";
import config from '../config';

const socket = io(`${config.HOST}`,{
    transportOptions: {
        polling: {
            extraHeaders: authHeader()
        }
    }
});

export default socket;