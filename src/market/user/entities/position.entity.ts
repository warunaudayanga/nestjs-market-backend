import { Entity, Column } from "typeorm";
import { CommonEntity } from "../../../common/entity/entity";

@Entity({ name: "positions" })
export class Position extends CommonEntity {

    @Column({
        unique: true
    })
    name: string;
}
