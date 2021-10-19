import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";
import { CommonEntity } from "../../common/entities/common.entity";

@Entity({ name: "sale" })
export class Sale extends CommonEntity {

    @Column()
    saleCode: string;

    @ManyToOne(() => Product, { nullable: false })
    @JoinColumn()
    product: string;

    @Column("decimal")
    price: number;

    @Column("float")
    qty: number;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    time: Date;
}
