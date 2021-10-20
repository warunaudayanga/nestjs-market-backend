import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccessController } from "./controllers/access.controller";
import { PathController } from "./controllers/path.controller";
import { AccessService } from "./services/access.service";
import { PathService } from "./services/path.service";
import { Access } from "./entities/access.entity";
import { Path } from "./entities/path.entity";
import { PathRepository } from "./repositories/path.repository";
import { AccessRepository } from "./repositories/access.repository";
@Module({
    imports: [
        TypeOrmModule.forFeature([Access, AccessRepository, Path, PathRepository])
    ],
    controllers: [AccessController, PathController],
    providers: [AccessService, PathService]
})
export class AccessModule {}
