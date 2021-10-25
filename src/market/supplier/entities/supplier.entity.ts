import { Entity, Column } from "typeorm";
import { Address } from "../../../common/interfaces/address.interfaces";
import { CommonEntity } from "../../../common/entity/entity";

@Entity({ name: "suppliers" })
export class Supplier extends CommonEntity {

    @Column({ unique: true, update: false })
    code: number;

    @Column()
    name: string;

    @Column("simple-json")
    address: Address;

    @Column()
    email?: string;

    @Column()
    phone: string;

    @Column()
    mobile?: string;
}
