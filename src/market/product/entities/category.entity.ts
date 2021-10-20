import { Entity, Column } from "typeorm";
import { CommonEntity } from "../../../common/entity/entity";

@Entity({ name: "categories" })
export class Category extends CommonEntity {

    @Column({
        unique: true
    })
    name: string;

    @Column({
        default: true
    })
    desc?: string;
}
