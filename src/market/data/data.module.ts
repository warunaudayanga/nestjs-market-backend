import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { DataController } from "./controllers/data.controller";
import { DataService } from "./services/data.service";
import { Data } from "./entities/data.entity";
import { DataRepository } from "./repositories/data.repository";

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([Data, DataRepository])
    ],
    // controllers: [DataController],
    providers: [DataService],
    exports: [DataService]
})
export class DataModule {}
