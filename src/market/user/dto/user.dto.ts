import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsUrl, IsUUID, Matches, ValidateIf } from "class-validator";
import { toErrString } from "../../../common/converters/error-message.converter";
import { UserErrors } from "./user.errors.dto";
import { User } from "../entities/user.entity";
import { Gender } from "../enums/user.enums";

export class UserDto extends User {

    constructor(pathDto?: Partial<UserDto>) {
        super();
        this.firstName = pathDto?.firstName;
        this.lastName = pathDto?.lastName;
        this.image = pathDto?.image;
        this.nic = pathDto?.nic.toUpperCase();
        this.dob = pathDto?.dob;
        this.gender = pathDto?.gender;
        this.position = pathDto?.position;
        this.phone = pathDto?.phone;
        this.address = pathDto?.address;
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

    protected get(): UserDto {
        return this;
    }

}
