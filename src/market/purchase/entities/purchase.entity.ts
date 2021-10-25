import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";
import { Supplier } from "../../supplier/entities/supplier.entity";
import { CommonEntity } from "../../../common/entity/entity";
import { PurchaseProductDto } from "../dto/purchase-product.dto";
import { PurchaseInvoiceDto } from "../dto/purchase-invoice.dto";

@Entity({ name: "purchases" })
export class Purchase extends CommonEntity {

    constructor(code: number, purchaseInvoiceDto: PurchaseInvoiceDto, purchaseProductDto: PurchaseProductDto) {
        super({ status: true });
        this.code = code;
        this.product = purchaseProductDto?.product;
        this.price = purchaseProductDto?.price;
        this.salePrice = purchaseProductDto?.salePrice;
        this.qty = purchaseProductDto?.qty;
        this.supplier = purchaseInvoiceDto?.supplier;
        this.purchaseDate = purchaseInvoiceDto?.purchaseDate;
        this.expectedDate = purchaseInvoiceDto?.expectedDate;
    }

    @Column()
    code: number;

    @ManyToOne(() => Product, { eager: true })
    @JoinColumn()
    product: Product | string;

    @Column("decimal", { unsigned: true })
    price: number;

    @Column("decimal", { unsigned: true })
    salePrice: number;

    @Column("float", { unsigned: true })
    qty: number;

    @ManyToOne(() => Supplier, { eager: true })
    @JoinColumn()
    supplier: Supplier | string;

    @Column({ type: "date" })
    purchaseDate: Date;

    @Column({ type: "date", nullable: true })
    expectedDate?: Date;
}
