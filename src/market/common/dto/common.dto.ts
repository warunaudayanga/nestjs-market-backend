import { StatusString } from "../enums/common.enums";
import { IsBoolean, IsEnum, IsOptional } from "class-validator";
import { toErrString } from "../../../common/converters/error-message.converter";
import { CommonErrors } from "./common-errors.dto";
import { decorate } from "ts-mixer";

export class CommonDto {

    @decorate(IsOptional())
    @decorate(IsBoolean(toErrString(CommonErrors.COMMON_400_INVALID_STATUS)))
    status: boolean;

    @decorate(IsOptional())
    @decorate(IsEnum(StatusString, toErrString(CommonErrors.COMMON_400_INVALID_STATUS_STRING)))
    statusString: StatusString;

}
