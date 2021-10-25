import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SaleController } from "./controllers/sale.controller";
import { SaleService } from "./services/sale.service";
import { Sale } from "./entities/sale.entity";
import { SaleRepository } from "./repositories/sale.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([Sale, SaleRepository])
    ],
    controllers: [SaleController],
    providers: [SaleService]
})
export class SaleModule {}
