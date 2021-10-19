import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auth } from "../../../auth/entities/auth.entity";
import { StatusString } from "../enums/common.enums";

@Entity({ synchronize: false })
export class CommonEntity {

    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column({ default: false })
    status: boolean;

    @Column({ type: "enum", enum: StatusString, default: StatusString.DEACTIVE })
    statusString: StatusString;

    @ManyToOne(() => Auth)
    @JoinColumn()
    createdBy: string;

    @CreateDateColumn({ insert: false, update: false })
    createdAt: Date;

    @ManyToOne(() => Auth)
    @JoinColumn()
    updatedBy: string;

    @Column({
        type: "datetime",
        insert: false,
        update: false,
        nullable: true,
        default: null,
        onUpdate: "CURRENT_TIMESTAMP"
    })
    updatedAt: Date;

}
