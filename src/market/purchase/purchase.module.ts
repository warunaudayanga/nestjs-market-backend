import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PurchaseController } from "./controllers/purchase.controller";
import { PurchaseService } from "./services/purchase.service";
import { Purchase } from "./entities/purchase.entity";
import { PurchaseRepository } from "./repositories/purchase.repository";
@Module({
    imports: [
        TypeOrmModule.forFeature([Purchase, PurchaseRepository])
    ],
    controllers: [PurchaseController],
    providers: [PurchaseService]
})
export class PurchaseModule {}
