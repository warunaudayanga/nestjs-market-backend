import { Entity, Column, ManyToOne, JoinColumn, Unique } from "typeorm";
import { Product } from "../../product/entities/product.entity";
import { CommonEntity } from "../../../common/entity/entity";

@Entity({ name: "stock" })
@Unique(["product", "price"])
export class Stock extends CommonEntity {

    @ManyToOne(() => Product, { eager: true })
    @JoinColumn()
    product: Product | string;

    @Column("decimal", { unsigned: true })
    price: number;

    @Column("float", { unsigned: true })
    qty: number;
}
