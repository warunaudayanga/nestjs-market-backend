import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";
import { Path } from "./path.entity";
import { Options } from "../interfaces/options";
import { Auth } from "../../../auth/entities/auth.entity";
import { CommonEntity } from "../../../common/entity/entity";

@Entity({ name: "access" })
export class Access extends CommonEntity {

    @ManyToOne(() => Auth, { nullable: false })
    @JoinColumn()
    auth: string;

    @ManyToOne(() => Path, { nullable: false })
    path: string;

    @Column("simple-json")
    options: Options;

}
