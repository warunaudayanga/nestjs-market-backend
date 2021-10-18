import { Module } from "@nestjs/common";
import { LoggerService } from "./services/logger.service";
import { EmailService } from "./services/email.service";

@Module({
    providers: [LoggerService, EmailService],
    exports: [LoggerService, EmailService]
})
export class CommonModule {}
