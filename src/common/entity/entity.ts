import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auth } from "../../auth/entities/auth.entity";
import { StatusString } from "./entity.enums";

@Entity({ synchronize: false })
export class CommonEntity {

    constructor(dto?: Partial<CommonEntity>) {
        this.id = dto?.id;
        if (dto?.status !== undefined) {
            this.status = dto.status;
            this.statusString = dto.status ? StatusString.ACTIVE : StatusString.DEACTIVE;
        }
        this.createdBy = dto?.createdBy;
        this.createdAt = dto?.createdAt;
        this.updatedBy = dto?.updatedBy;
        this.updatedAt = dto?.updatedAt;
    }

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
