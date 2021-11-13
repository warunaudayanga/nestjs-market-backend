import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auth } from "../../auth/entities/auth.entity";
import { StatusString } from "./entity.enums";
import { UserInfo } from "./entity.interfaces";

@Entity({ synchronize: false })
export class CommonEntity {

    constructor(dto?: Partial<CommonEntity>) {
        this.id = dto?.id;
        if (dto?.statusString) {
            this.status = dto.statusString === StatusString.ACTIVE;
            this.statusString = dto.statusString ?? StatusString.DEACTIVE;
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
    statusString: StatusString | string;

    @ManyToOne(() => Auth)
    createdBy: UserInfo | string;

    @CreateDateColumn({ insert: false, update: false })
    createdAt: Date;

    @ManyToOne(() => Auth)
    @JoinColumn()
    updatedBy: UserInfo | string;

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
