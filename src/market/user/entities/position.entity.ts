import { Entity, Column } from "typeorm";
import { CommonEntity } from "../../common/entities/common.entity";

@Entity({ name: "positions" })
export class Position extends CommonEntity {

    @Column({
        unique: true
    })
    name: string;
}
