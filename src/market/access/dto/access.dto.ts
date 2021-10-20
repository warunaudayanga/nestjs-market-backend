import { Options } from "../interfaces/options";
import { IsNotEmpty, IsObject, IsUUID } from "class-validator";
import { toErrString } from "../../../common/converters/error-message.converter";
import { AccessErrors } from "./access.errors.dto";
import { Access } from "../entities/access.entity";
import { CommonDto } from "../../../common/dto/common.dto";
import { decorate, mix } from "ts-mixer";

export interface AccessDto extends Access, CommonDto { }

@mix(Access, CommonDto)
export class AccessDto extends CommonDto {

    constructor(accessDto: Partial<AccessDto>) {
        super(accessDto);
        this.auth = accessDto?.auth;
        this.path = accessDto?.path;
        this.options = accessDto?.options;
    }

    @decorate(IsUUID(undefined, toErrString(AccessErrors.ACCESS_400_INVALID_AUTH)))
    @decorate(IsNotEmpty(toErrString(AccessErrors.ACCESS_400_EMPTY_AUTH)))
    auth: string;

    @decorate(IsUUID(undefined, toErrString(AccessErrors.ACCESS_400_INVALID_PATH)))
    @decorate(IsNotEmpty(toErrString(AccessErrors.ACCESS_400_EMPTY_PATH)))
    path: string;

    @decorate(IsObject(toErrString(AccessErrors.ACCESS_400_INVALID_OPTIONS)))
    @decorate(IsNotEmpty(toErrString(AccessErrors.ACCESS_400_EMPTY_OPTIONS)))
    options: Options

}
