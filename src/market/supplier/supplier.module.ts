import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupplierController } from "./controllers/supplier.controller";
import { SupplierService } from "./services/supplier.service";
import { Supplier } from "./entities/supplier.entity";
import { SupplierRepository } from "./repositories/supplier.repository";
@Module({
    imports: [
        TypeOrmModule.forFeature([Supplier, SupplierRepository])
    ],
    controllers: [SupplierController],
    providers: [SupplierService]
})
export class SupplierModule {}
