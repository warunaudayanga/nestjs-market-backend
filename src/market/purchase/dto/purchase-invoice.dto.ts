import { IsDateString, IsEmpty, IsNotEmpty, IsOptional, IsUUID, ValidateNested } from "class-validator";
import { toErrString } from "../../../common/converters/error-message.converter";
import { CommonDto } from "../../../common/dto/common.dto";
import { PurchaseErrors } from "./purchase.errors.dto";
import { Type } from "class-transformer";
import { PurchaseProductDto } from "./purchase-product.dto";
import { Supplier } from "../../supplier/entities/supplier.entity";
import { Purchase } from "../entities/purchase.entity";
import { omit } from "../../../common/entity/entity.methods";

export class PurchaseInvoiceDto extends CommonDto {

    constructor(purchaseInvoiceDto?: Partial<PurchaseInvoiceDto>, purchaseProductDtoList?: PurchaseProductDto[]) {
        omit(purchaseInvoiceDto, ["id"]);
        super(purchaseInvoiceDto);
        this.code = purchaseInvoiceDto?.code;
        this.products = purchaseProductDtoList ? purchaseProductDtoList : purchaseInvoiceDto?.products;
        this.supplier = purchaseInvoiceDto?.supplier;
        this.purchaseDate = purchaseInvoiceDto?.purchaseDate;
        this.expectedDate = purchaseInvoiceDto?.expectedDate;
    }

    @IsEmpty(toErrString(PurchaseErrors.PURCHASE_400_NOT_EMPTY_CODE))
    code: number;

    @ValidateNested({ each: true })
    @Type(() => PurchaseProductDto)
    products: PurchaseProductDto[];

    @IsUUID(undefined, toErrString(PurchaseErrors.PURCHASE_400_INVALID_SUPPLIER))
    @IsNotEmpty(toErrString(PurchaseErrors.PURCHASE_400_EMPTY_SUPPLIER))
    supplier: Supplier | string;

    @IsDateString(undefined, toErrString(PurchaseErrors.PURCHASE_400_INVALID_DATE))
    @IsNotEmpty(toErrString(PurchaseErrors.PURCHASE_400_EMPTY_DATE))
    purchaseDate: Date;

    @IsOptional()
    @IsDateString(undefined, toErrString(PurchaseErrors.PURCHASE_400_INVALID_EXPECT_DATE))
    expectedDate?: Date;

    getPurchaseList(code: number): Purchase[] {
        const purchaseList: Purchase[] = [];
        this.products.forEach(purchaseProductDto => {
            purchaseList.push(new Purchase(code, this, purchaseProductDto));
        });
        return purchaseList;
    }

}
