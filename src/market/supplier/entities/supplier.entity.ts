import { Entity, Column } from "typeorm";
import { Address } from "../../../common/interfaces/address.interfaces";
import { CommonEntity } from "../../../common/entity/entity";

@Entity({ name: "supplier" })
export class Supplier extends CommonEntity {

    @Column()
    supplierCode: string;

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
