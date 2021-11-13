import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";
import { Path } from "./path.entity";
import { Options } from "../interfaces/options";
import { Auth } from "../../../auth/entities/auth.entity";
import { CommonEntity } from "../../../common/entity/entity";

@Entity({ name: "access" })
export class Access extends CommonEntity {

    @ManyToOne(() => Auth)
    @JoinColumn()
    auth: string;

    @ManyToOne(() => Path, { eager: true })
    @JoinColumn()
    path: Path | string;

    @Column("simple-json")
    options: Options;

}
