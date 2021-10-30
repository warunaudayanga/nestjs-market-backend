import { StatusString } from "../entity/entity.enums";
import { IsBoolean, IsEnum, IsOptional } from "class-validator";
import { toErrString } from "../converters/error-message.converter";
import { CommonErrors } from "./common.errors.dto";
import { decorate } from "ts-mixer";
import { CommonEntity } from "../entity/entity";

export class CommonDto extends CommonEntity {

    constructor(dto: Partial<CommonDto>) {
        super(dto);
        if (dto?.status !== undefined) {
            this.status = dto.status;
            this.statusString = dto.status ? StatusString.ACTIVE : StatusString.DEACTIVE;
        }
    }

    @decorate(IsOptional())
    @decorate(IsBoolean(toErrString(CommonErrors.COMMON_400_INVALID_STATUS)))
    status: boolean;

    @decorate(IsOptional())
    @decorate(IsEnum(Object.values(StatusString), toErrString(CommonErrors.COMMON_400_INVALID_STATUS_STRING)))
    statusString: StatusString | string;

}
