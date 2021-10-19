import { Entity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { Position } from "./position.entity";
import { Gender } from "../enums/user.enums";

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

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

    @ManyToOne(() => Position, { nullable: false })
    @JoinColumn()
    position: Position | string;

    @Column({ default: "" })
    phone?: string;

    @Column({ default: "" })
    address?: string;

    @CreateDateColumn({ insert: false, update: false })
    regDate?: Date;

}
