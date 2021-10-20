import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";
import { Supplier } from "../../supplier/entities/supplier.entity";
import { CommonEntity } from "../../../common/entity/entity";

@Entity({ name: "purchases" })
export class Purchase extends CommonEntity {

    @Column()
    orderCode: string;

    @ManyToOne(() => Product, { nullable: false })
    @JoinColumn()
    product: string;

    @Column("decimal")
    price: number;

    @Column("decimal")
    salePrice: number;

    @Column("float")
    qty: number;

    @ManyToOne(() => Supplier, { nullable: false })
    @JoinColumn()
    supplier: string;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    time: Date;

    @Column({
        type: "date"
    })
    purchaseDate: Date;

    @Column({
        type: "date"
    })
    expectedDate?: Date;
}
