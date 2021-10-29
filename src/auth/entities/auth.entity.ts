import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from "typeorm";
import { AuthType } from "../enums/auth.enums";
import { User } from "../../market/user/entities/user.entity";
import { CommonEntity } from "../../common/entity/entity";
import { StatusString } from "../../common/entity/entity.enums";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Auth extends CommonEntity { }

@Entity()
export class Auth {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password?: string;

    @Column({ select: false })
    salt?: string;

    @Column({ type: "enum", enum: AuthType, default: AuthType.STANDARD })
    type: AuthType;

    @Column({ default: false })
    verified: boolean;

    @OneToOne(() => User, { cascade: true, eager: true, onDelete: "CASCADE" })
    @JoinColumn()
    profile: User;

    @Column({ default: false })
    status: boolean;

    @Column({ type: "enum", enum: StatusString, default: StatusString.PENDING })
    statusString: StatusString;

    @Column({
        type: "timestamp",
        insert: false,
        update: false,
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt: Date;

    @Column({
        type: "timestamp",
        insert: false,
        update: false,
        nullable: true,
        default: null,
        onUpdate: "CURRENT_TIMESTAMP"
    })
    updatedAt: Date;
}
