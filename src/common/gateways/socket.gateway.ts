import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { SocketService } from "../services/socket.service";

@WebSocketGateway({ namespace: "socket" })
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    private server: Server;

    constructor(private socketService: SocketService) {}

    // noinspection JSUnusedLocalSymbols
    afterInit(server: Server): void { // eslint-disable-line @typescript-eslint/no-unused-vars
        console.log("Server Initialized"); // eslint-disable-line no-console
    }

    // @SubscribeMessage("message")
    // async onMessage(@ConnectedSocket() client: Socket, @MessageBody() sendMessageDto: SendMessageDto): Promise<WsResponse<MessageDocument | GroupMessageDocument>> {
    //     const login = await this.socketService.getLoginByToken(client);
    //     const message = await this.socketService.send(sendMessageDto, login);
    //     message.message_response_id = sendMessageDto.message_response_id;
    //     return { event: "messageResponse", data: message };
    // }

    @UseGuards(JwtAuthGuard)
    async handleConnection(client: Socket): Promise<void> { // eslint-disable-line @typescript-eslint/no-unused-vars
        const login = await this.socketService.getUserByToken(client);
        if (login) {
            this.socketService.addSocketClient(client, login);
        } else {
            client.disconnect();
        }
    }

    handleDisconnect(client: Socket): void {
        this.socketService.removeSocketClient(client);
    }
}
