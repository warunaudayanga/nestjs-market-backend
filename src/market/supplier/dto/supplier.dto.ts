import { IsEmail, IsEmpty, IsNotEmpty, IsObject, IsOptional, ValidateIf, ValidateNested } from "class-validator";
import { toErrString } from "../../../common/converters/error-message.converter";
import { SupplierErrors } from "./supplier.errors.dto";
import { Supplier } from "../entities/supplier.entity";
import { CommonDto } from "../../../common/dto/common.dto";
import { decorate, mix } from "ts-mixer";
import { Address } from "../../../common/interfaces/address.interfaces";
import { Type } from "class-transformer";
import { AddressDto } from "../../../common/dto/address.dto";

export interface SupplierDto extends Supplier, CommonDto { }

@mix(Supplier, CommonDto)
export class SupplierDto extends CommonDto {

    constructor(supplierDto?: Partial<SupplierDto>) {
        super(supplierDto);
        this.code = supplierDto?.code;
        this.name = supplierDto?.name;
        this.address = supplierDto?.address;
        this.email = supplierDto?.email;
        this.phone = supplierDto?.phone;
        this.mobile = supplierDto?.mobile;
    }

    @decorate(IsEmpty(toErrString(SupplierErrors.SUPPLIER_400_NOT_EMPTY_CODE)))
    code: number;

    @decorate(IsNotEmpty(toErrString(SupplierErrors.SUPPLIER_400_EMPTY_NAME)))
    name: string;

    @decorate(ValidateNested())
    @decorate(Type(() => AddressDto))
    @decorate(IsObject(toErrString(SupplierErrors.SUPPLIER_400_INVALID_ADDRESS)))
    @decorate(IsNotEmpty(toErrString(SupplierErrors.SUPPLIER_400_EMPTY_ADDRESS)))
    address: Address;

    @decorate(IsOptional())
    @decorate(IsEmail(undefined, toErrString(SupplierErrors.SUPPLIER_400_INVALID_EMAIL)))
    @decorate(ValidateIf(o => o.email !== ""))
    email?: string;

    @decorate(IsNotEmpty(toErrString(SupplierErrors.SUPPLIER_400_EMPTY_PHONE)))
    phone: string;

    mobile?: string;

}
