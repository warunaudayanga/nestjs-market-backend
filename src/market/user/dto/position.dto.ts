import { IsNotEmpty } from "class-validator";
import { toErrString } from "../../../common/converters/error-message.converter";
import { PositionErrors } from "./position.errors.dto";
import { Position } from "../entities/position.entity";
import { CommonDto } from "../../../common/dto/common.dto";
import { decorate, mix } from "ts-mixer";

export interface PositionDto extends Position, CommonDto { }

@mix(Position, CommonDto)
export class PositionDto extends CommonDto {

    constructor(positionDto?: Partial<PositionDto>) {
        super(positionDto);
        this.name = positionDto?.name;
    }

    @decorate(IsNotEmpty(toErrString(PositionErrors.POSITION_400_EMPTY_NAME)))
    name: string;

}
