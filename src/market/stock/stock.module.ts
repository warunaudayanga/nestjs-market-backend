import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StockController } from "./controllers/stock.controller";
import { StockService } from "./services/stock.service";
import { Stock } from "./entities/stock.entity";
import { StockRepository } from "./repositories/stock.repository";

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([Stock, StockRepository])
    ],
    controllers: [StockController],
    providers: [StockService],
    exports: [StockService]
})
export class StockModule {}
