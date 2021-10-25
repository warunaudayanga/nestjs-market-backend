import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { CommonEntity } from "../../../common/entity/entity";
import { Stock } from "../../stock/entities/stock.entity";
import { SaleStockDto } from "../dto/sale-stock.dto";

@Entity({ name: "sales" })
export class Sale extends CommonEntity {

    constructor(code: number, saleStockDto: SaleStockDto) {
        super({ status: true });
        this.code = code;
        this.stock = saleStockDto?.stock;
        this.qty = saleStockDto?.qty;
    }

    @Column()
    code: number;

    @ManyToOne(() => Stock, { eager: true })
    @JoinColumn()
    stock: Stock | string;

    @Column("float", { unsigned: true })
    qty: number;
}
