import { Socket } from "socket.io";

export interface Client {
    client: Socket;
    user_id: string;
}
