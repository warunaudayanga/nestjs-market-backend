import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({ name: "data" })
export class Data {

    @PrimaryColumn()
    key: string;

    @Column()
    value: string;

}
