/* eslint-disable @typescript-eslint/no-var-requires */
import { ServeStaticModule } from "@nestjs/serve-static";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dev, prod } from "./config/ormconfig";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { join } from "path";
import { CommonModule } from "./common/common.module";
import { AuthModule } from "./auth/auth.module";
import { AccessModule } from "./market/access/access.module";
import { UserModule } from "./market/user/user.module";
import { ProductModule } from "./market/product/product.module";
import { StockModule } from "./market/stock/stock.module";
import { DataModule } from "./market/data/data.module";
import { PurchaseModule } from "./market/purchase/purchase.module";
import { SupplierModule } from "./market/supplier/supplier.module";
import { SaleModule } from "./market/sale/sale.module";
// import { SeedingModule } from "./seeding/seeding.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "../dist/public")
        }),
        TypeOrmModule.forRoot(process.env.NODE_ENV === "production" ? prod : dev),
        // TypeOrmModule.forRoot(prod),
        CommonModule,
        // SeedingModule,
        AuthModule,
        DataModule,
        UserModule,
        AccessModule,
        ProductModule,
        SupplierModule,
        PurchaseModule,
        StockModule,
        SaleModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
