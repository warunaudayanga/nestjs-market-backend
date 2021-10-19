import { Options } from "../interfaces/options";
import { IsNotEmpty, IsObject, IsUUID } from "class-validator";
import { toErrString } from "../../../common/converters/error-message.converter";
import { AccessErrors } from "./access.errors.dto";
import { Access } from "../entities/access.entity";
import { StatusString } from "../../common/enums/common.enums";
import { CommonDto } from "../../common/dto/common.dto";
import { mix } from "ts-mixer";

export interface AccessDto extends Access, CommonDto { }

@mix(Access, CommonDto)
export class AccessDto {

    constructor(accessDto: Partial<AccessDto>) {
        this.auth = accessDto?.auth;
        this.path = accessDto?.path;
        this.options = accessDto?.options;
        if (accessDto?.status !== undefined) {
            this.status = accessDto?.status;
            this.statusString = accessDto?.status ? StatusString.ACTIVE : StatusString.DEACTIVE;
        }
    }

    @IsNotEmpty(toErrString(AccessErrors.ACCESS_400_EMPTY_AUTH))
    @IsUUID(undefined, toErrString(AccessErrors.ACCESS_400_INVALID_AUTH))
    auth: string;

    @IsNotEmpty(toErrString(AccessErrors.ACCESS_400_EMPTY_PATH))
    @IsUUID(undefined, toErrString(AccessErrors.ACCESS_400_INVALID_PATH))
    path: string;

    @IsNotEmpty(toErrString(AccessErrors.ACCESS_400_EMPTY_OPTIONS))
    @IsObject(toErrString(AccessErrors.ACCESS_400_INVALID_OPTIONS))
    options: Options

}
