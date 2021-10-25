import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auth } from "./auth.entity";

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
