import { Socket } from "socket.io";
import { Client } from "../interfaces/clients";
import { Auth } from "../../auth/entities/auth.entity";
import { AuthService } from "../../auth/services/auth.service";
import { FindManyOptions } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SocketService {

    private clients: Client[] = []

    constructor(private authService: AuthService) {}

    addSocketClient(client: Socket, auth: Auth): void {
        const existingClient = this.clients.find(c => c.user_id === auth.id);
        if (existingClient) {
            this.clients[this.clients.indexOf(existingClient)] = { client, user_id: auth.id };
        } else {
            this.clients.push({ client, user_id: auth.id });
        }
        console.log(`Client connected: { id: ${client.id}, user_id: ${auth.id} }`); // eslint-disable-line no-console
        console.log(`Clients: ${this.clients.length}`); // eslint-disable-line no-console
    }

    // noinspection JSUnusedGlobalSymbols
    async getSocketClients(options?: FindManyOptions): Promise<Socket[]> {
        const response = await this.authService.getAll(undefined, options);
        const user_ids: string[] = response.entities.map(a => a.id);
        return this.clients.filter(c => user_ids.includes(c.user_id)).map(c => c.client);
    }

    // noinspection JSUnusedGlobalSymbols
    getSocketClient(user_id: string): Socket {
        return this.clients.find(c => c.user_id === user_id)?.client;
    }

    removeSocketClient(client: Socket): void {
        this.clients = this.clients.filter(c => c.client.id !== client.id);
        console.log(`Client disconnected: ${client.id}`); // eslint-disable-line no-console
        console.log(`Clients: ${this.clients.length}`); // eslint-disable-line no-console
    }

    emit<T>(event: string, data: T): void {
        this.clients.forEach(client => {
            client.client.emit(event, data);
        });
    }

    async getUserByToken(client: Socket): Promise<Auth> {
        const bearerToken = client.handshake.auth?.token || client.handshake.headers.authorization;
        if (bearerToken) {
            return await this.authService.getUserByToken(bearerToken);
        }
        return null;
    }
}
