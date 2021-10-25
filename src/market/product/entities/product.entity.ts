import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";
import { Category } from "./category.entity";
import { CommonEntity } from "../../../common/entity/entity";
import { Unit } from "../enums/product.enums";

@Entity({ name: "products" })
export class Product extends CommonEntity {

    @Column({ unique: true, update: false })
    code: number;

    @Column()
    name: string;

    @Column({ default: "" })
    desc?: string;

    @Column({ default: "" })
    size?: string;

    @ManyToOne(() => Category, { eager: true })
    @JoinColumn()
    category: Category | string;

    @Column({ type: "enum", enum: Unit })
    unit: Unit;
}
