import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auth } from "./auth.entity";
import { CommonEntity } from "../../common/entity/entity";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VerifyToken extends CommonEntity { }

@Entity()
export class VerifyToken {

    @PrimaryGeneratedColumn()
    id?: string;

    @ManyToOne(() => Auth)
    @Column("char", { length: 36 })
    auth: string;

    @Column("text")
    token: string;

    @Column({
        type: "timestamp",
        insert: false,
        update: false,
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt: Date;

}
