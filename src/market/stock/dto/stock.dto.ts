import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";
import { toErrString } from "../../../common/converters/error-message.converter";
import { StockErrors } from "./stock.errors.dto";
import { Stock } from "../entities/stock.entity";
import { CommonDto } from "../../../common/dto/common.dto";
import { decorate, mix } from "ts-mixer";

export interface StockDto extends Stock, CommonDto { }

@mix(Stock, CommonDto)
export class StockDto extends CommonDto {

    constructor(stockDto: Partial<StockDto>) {
        super(stockDto);
        this.product = stockDto?.product;
        this.price = stockDto?.price;
        this.qty = stockDto?.qty;
    }

    @decorate(IsUUID(undefined, toErrString(StockErrors.STOCK_400_INVALID_PRODUCT)))
    @decorate(IsNotEmpty(toErrString(StockErrors.STOCK_400_EMPTY_PRODUCT)))
    product: string;

    @decorate(IsNumber( { maxDecimalPlaces: 2 }, toErrString(StockErrors.STOCK_400_INVALID_PRICE)))
    @decorate(IsNotEmpty(toErrString(StockErrors.STOCK_400_EMPTY_PRICE)))
    price: number;

    @decorate(IsNumber( { maxDecimalPlaces: 3 }, toErrString(StockErrors.STOCK_400_INVALID_QTY)))
    @decorate(IsNotEmpty(toErrString(StockErrors.STOCK_400_EMPTY_QTY)))
    qty: number

}
