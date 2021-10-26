import { IsNotEmpty } from "class-validator";
import { toErrString } from "../converters/error-message.converter";
import { Address } from "../interfaces/address.interfaces";
import { CommonErrors } from "./common.errors.dto";

export class AddressDto implements Address {

    constructor(addressDto?: Partial<AddressDto>) {
        this.line1 = addressDto?.line1;
        this.line2 = addressDto?.line2;
        this.city = addressDto?.city;
        this.district = addressDto?.district;
    }

    @IsNotEmpty(toErrString(CommonErrors.ADDRESS_400_EMPTY_LINE))
    line1: string;

    line2: string

    city: string;

    district: string

}
