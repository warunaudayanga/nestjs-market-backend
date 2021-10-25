import { IsEmpty, IsNotEmpty, IsNumber, IsUUID } from "class-validator";
import { toErrString } from "../../../common/converters/error-message.converter";
import { decorate } from "ts-mixer";
import { SaleErrors } from "./sale.errors.dto";
import { Stock } from "../../stock/entities/stock.entity";

export class SaleStockDto {

    constructor(saleStockDto?: Partial<SaleStockDto>) {
        this.id = saleStockDto?.id;
        this.stock = saleStockDto?.stock;
        this.qty = saleStockDto?.qty;
    }

    @decorate(IsEmpty(toErrString(SaleErrors.SALE_400_NOT_EMPTY_ID)))
    id?: string;

    @decorate(IsUUID(undefined, toErrString(SaleErrors.SALE_400_INVALID_STOCK)))
    @decorate(IsNotEmpty(toErrString(SaleErrors.SALE_400_EMPTY_STOCK)))
    stock: Stock | string;

    @decorate(IsNumber( { maxDecimalPlaces: 3 }, toErrString(SaleErrors.SALE_400_INVALID_QTY)))
    @decorate(IsNotEmpty(toErrString(SaleErrors.SALE_400_EMPTY_QTY)))
    qty: number;

}
