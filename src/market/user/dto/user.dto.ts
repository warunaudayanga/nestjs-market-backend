import {
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsUrl,
    IsUUID,
    Matches,
    ValidateIf, ValidateNested
} from "class-validator";
import { toErrString } from "../../../common/converters/error-message.converter";
import { UserErrors } from "./user.errors.dto";
import { User } from "../entities/user.entity";
import { Gender } from "../enums/user.enums";
import { CommonDto } from "../../../common/dto/common.dto";
import { CommonEntity } from "../../../common/entity/entity";
import { Address } from "../../../common/interfaces/address.interfaces";
import { Type } from "class-transformer";
import { AddressDto } from "../../../common/dto/address.dto";

export interface UserDto extends User, CommonEntity, CommonDto { }

export class UserDto {

    constructor(userDto?: Partial<UserDto>) {
        this.firstName = userDto?.firstName;
        this.lastName = userDto?.lastName;
        this.image = userDto?.image;
        this.nic = userDto?.nic.toUpperCase();
        this.dob = userDto?.dob;
        this.gender = userDto?.gender;
        this.position = userDto?.position;
        this.phone = userDto?.phone;
        this.address = userDto?.address;
    }

    @IsNotEmpty(toErrString(UserErrors.USER_400_EMPTY_FIRST_NAME))
    firstName: string;

    @IsNotEmpty(toErrString(UserErrors.USER_400_EMPTY_LAST_NAME))
    lastName: string;

    @IsOptional()
    @IsUrl(undefined, toErrString(UserErrors.USER_400_INVALID_PROFILE_IMAGE))
    @ValidateIf(o => o.image !== "")
    image?: string;

    @Matches(/^([0-9]{9}[xXvV]|[0-9]{12})$/, toErrString(UserErrors.USER_400_INVALID_NIC))
    @IsNotEmpty(toErrString(UserErrors.USER_400_EMPTY_NIC))
    nic: string;

    @IsDateString(undefined, toErrString(UserErrors.USER_400_INVALID_DOB))
    dob: Date;

    @IsEnum(Object.values(Gender), toErrString(UserErrors.USER_400_INVALID_GENDER))
    @IsNotEmpty(toErrString(UserErrors.USER_400_INVALID_GENDER))
    gender: Gender;

    @IsUUID(undefined, toErrString(UserErrors.USER_400_INVALID_POSITION))
    @IsNotEmpty(toErrString(UserErrors.USER_400_EMPTY_POSITION))
    position: string;

    @IsOptional()
    @Matches(/^([0][7][01245678][0-9]{7})$/, toErrString(UserErrors.USER_400_INVALID_PHONE))
    @ValidateIf(o => o.phone !== "")
    phone?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => AddressDto)
    @IsObject(toErrString(UserErrors.USER_400_INVALID_ADDRESS))
    @ValidateIf(o => o.address !== "")
    address?: Address;

    protected get(): UserDto {
        return this;
    }

}
