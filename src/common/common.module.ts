import { Global, Module } from "@nestjs/common";
import { LoggerService } from "./services/logger.service";
import { EmailService } from "./services/email.service";

@Global()
@Module({
    providers: [LoggerService, EmailService],
    exports: [LoggerService, EmailService]
})
export class CommonModule {}
