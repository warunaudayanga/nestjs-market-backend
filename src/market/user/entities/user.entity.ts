import { Entity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { Position } from "./position.entity";
import { Gender } from "../enums/user.enums";
import { CommonEntity } from "../../../common/entity/entity";
import { Address } from "../../../common/interfaces/address.interfaces";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface User extends CommonEntity { }

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: "" })
    image?: string;

    @Column({
        unique: true
    })
    nic: string;

    @Column("date")
    dob: Date;

    @Column({
        type: "enum",
        enum: Gender,
        default: Gender.MALE
    })
    gender: Gender;

    @ManyToOne(() => Position, { eager: true })
    @JoinColumn()
    position: Position | string;

    @Column({ default: "" })
    phone?: string;

    @Column("simple-json")
    address?: Address;

    @CreateDateColumn({ insert: false, update: false })
    regDate?: Date;

}
