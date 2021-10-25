import { IsEmpty, IsNotEmpty, IsNumber, IsUUID } from "class-validator";
import { toErrString } from "../../../common/converters/error-message.converter";
import { decorate } from "ts-mixer";
import { PurchaseErrors } from "./purchase.errors.dto";
import { Product } from "../../product/entities/product.entity";

export class PurchaseProductDto {

    constructor(purchaseProductDto?: Partial<PurchaseProductDto>) {
        this.id = purchaseProductDto?.id;
        this.product = purchaseProductDto?.product;
        this.price = purchaseProductDto?.price;
        this.salePrice = purchaseProductDto?.salePrice;
        this.qty = purchaseProductDto?.qty;
    }

    @decorate(IsEmpty(toErrString(PurchaseErrors.PURCHASE_400_NOT_EMPTY_ID)))
    id?: string;

    @decorate(IsUUID(undefined, toErrString(PurchaseErrors.PURCHASE_400_INVALID_PRODUCT)))
    @decorate(IsNotEmpty(toErrString(PurchaseErrors.PURCHASE_400_EMPTY_PRODUCT)))
    product: Product | string;

    @decorate(IsNumber( { maxDecimalPlaces: 2 }, toErrString(PurchaseErrors.PURCHASE_400_INVALID_PRICE)))
    @decorate(IsNotEmpty(toErrString(PurchaseErrors.PURCHASE_400_EMPTY_PRICE)))
    price: number;

    @decorate(IsNumber( { maxDecimalPlaces: 2 }, toErrString(PurchaseErrors.PURCHASE_400_INVALID_SALE_PRICE)))
    @decorate(IsNotEmpty(toErrString(PurchaseErrors.PURCHASE_400_EMPTY_SALE_PRICE)))
    salePrice: number;

    @decorate(IsNumber( { maxDecimalPlaces: 3 }, toErrString(PurchaseErrors.PURCHASE_400_INVALID_QTY)))
    @decorate(IsNotEmpty(toErrString(PurchaseErrors.PURCHASE_400_EMPTY_QTY)))
    qty: number;

}
