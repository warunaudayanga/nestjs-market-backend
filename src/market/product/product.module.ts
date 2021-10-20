import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "./controllers/product.controller";
import { CategoryController } from "./controllers/category.controller";
import { ProductService } from "./services/product.service";
import { CategoryService } from "./services/category.service";
import { Product } from "./entities/product.entity";
import { Category } from "./entities/category.entity";
import { CategoryRepository } from "./repositories/category.repository";
import { ProductRepository } from "./repositories/product.repository";
@Module({
    imports: [
        TypeOrmModule.forFeature([Product, ProductRepository, Category, CategoryRepository])
    ],
    controllers: [ProductController, CategoryController],
    providers: [ProductService, CategoryService]
})
export class ProductModule {}
