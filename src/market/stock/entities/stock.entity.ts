import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";
import { CommonEntity } from "../../common/entities/common.entity";

@Entity({ name: "stock" })
export class Stock extends CommonEntity {

    @ManyToOne(() => Product, { nullable: false })
    @JoinColumn()
    product: string;

    @Column("decimal")
    price: number;

    @Column("float")
    qty: number;
}
