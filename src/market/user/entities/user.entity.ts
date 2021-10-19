import { Entity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @Column()
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
    position: Position;

    @Column()
    phone?: string;

    @Column()
    address?: string;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    regDate: Date;

}
