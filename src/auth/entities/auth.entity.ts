import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { AuthType, StatusString } from "../enums/auth.enums";
import { OmitType } from "@nestjs/mapped-types";
import { User } from "../../market/user/entities/user.entity";

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

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn()
    profile: string;

    @Column({ default: false })
    status: boolean;

    @Column({ type: "enum", enum: StatusString, default: StatusString.Pending })
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

    getUserDto(): Auth {
        return OmitType(Auth, ["password", "salt", "getUserDto"]) as Partial<Auth> as Auth;
    }
}
