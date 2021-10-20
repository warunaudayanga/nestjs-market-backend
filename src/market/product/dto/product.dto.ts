import { IsEmpty, IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { toErrString } from "../../../common/converters/error-message.converter";
import { ProductErrors } from "./product.errors.dto";
import { Product } from "../entities/product.entity";
import { CommonDto } from "../../../common/dto/common.dto";
import { decorate, mix } from "ts-mixer";
import { Unit } from "../enums/product.enums";

export interface ProductDto extends Product, CommonDto { }

@mix(Product, CommonDto)
export class ProductDto extends CommonDto {

    constructor(productDto?: Partial<ProductDto>) {
        super(productDto);
        this.code = productDto?.code;
        this.name = productDto?.name;
        this.desc = productDto?.desc;
        this.size = productDto?.size;
        this.category = productDto?.category;
        this.unit = productDto?.unit;
    }

    @decorate(IsEmpty(toErrString(ProductErrors.PRODUCT_400_NOT_EMPTY_CODE)))
    code: number;

    @decorate(IsNotEmpty(toErrString(ProductErrors.PRODUCT_400_EMPTY_NAME)))
    name: string;

    desc?: string;

    size?: string;

    @decorate(IsUUID(undefined, toErrString(ProductErrors.PRODUCT_400_INVALID_CATEGORY)))
    @decorate(IsNotEmpty(toErrString(ProductErrors.PRODUCT_400_EMPTY_CATEGORY)))
    category: string;

    @decorate(IsEnum(Object.values(Unit), toErrString(ProductErrors.PRODUCT_400_INVALID_UNIT)))
    @decorate(IsNotEmpty(toErrString(ProductErrors.PRODUCT_400_EMPTY_UNIT)))
    unit: Unit;

}
