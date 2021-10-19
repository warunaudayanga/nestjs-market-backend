import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserService } from "./services/user.service";
import { UserController } from "./controllers/user.controller";
import { PositionController } from "./controllers/position.controller";
import { PositionService } from "./services/position.service";
import { Position } from "./entities/position.entity";
import { PositionRepository } from "./repositories/position.repository";
import { UserRepository } from "./repositories/user.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UserRepository, Position, PositionRepository])
    ],
    controllers: [UserController, PositionController],
    providers: [UserService, PositionService],
    exports: [UserService]
})
export class UserModule {}
