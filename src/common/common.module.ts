import { Global, Module } from "@nestjs/common";
import { LoggerService } from "./services/logger.service";
import { EmailService } from "./services/email.service";
import { SocketService } from "./services/socket.service";
import { SocketGateway } from "./gateways/socket.gateway";
import { AuthModule } from "../auth/auth.module";

@Global()
@Module({
    imports: [AuthModule],
    providers: [SocketService, SocketGateway, EmailService, LoggerService],
    exports: [SocketService, EmailService, LoggerService]
})
export class CommonModule {}
