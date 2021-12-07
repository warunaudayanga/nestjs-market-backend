import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { StatusString } from "./entity.enums";

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

    @Column({ type: "varchar", default: null })
    createdBy: string;

    @CreateDateColumn({ insert: false, update: false })
    createdAt: Date;

    @Column({ type: "varchar", default: null })
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
