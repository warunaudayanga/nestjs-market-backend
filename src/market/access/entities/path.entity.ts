import { Entity, Column } from "typeorm";
import { CommonEntity } from "../../common/entities/common.entity";

@Entity({ name: "access_path" })
export class Path extends CommonEntity {

    @Column()
    name: string;

    @Column({
        unique: true
    })
    path: string;

}
