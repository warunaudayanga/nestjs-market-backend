import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { AuthType, StatusString } from "../enums/auth.enums";
import { OmitType } from "@nestjs/mapped-types";

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

    @Column({ default: false })
    status: boolean;

    @Column({ type: "enum", enum: StatusString, default: StatusString.Pending })
    statusString: StatusString;

    getUserDto(): Auth {
        return OmitType(Auth, ["password", "salt", "getUserDto"]) as Partial<Auth> as Auth;
    }
}
