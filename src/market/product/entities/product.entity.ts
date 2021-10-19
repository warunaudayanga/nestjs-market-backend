import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";
import { Category } from "./category.entity";
import { CommonEntity } from "../../common/entities/common.entity";

@Entity({ name: "products" })
export class Product extends CommonEntity {

    @Column()
    productCode: string;

    @Column()
    name: string;

    @Column()
    desc: string;

    @Column()
    size: string;

    @ManyToOne(() => Category, { nullable: false })
    @JoinColumn()
    category: string;

    @Column()
    unit: string;
}
