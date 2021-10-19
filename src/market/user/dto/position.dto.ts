import { IsNotEmpty } from "class-validator";
import { toErrString } from "../../../common/converters/error-message.converter";
import { PositionErrors } from "./position.errors.dto";
import { Position } from "../entities/position.entity";
import { StatusString } from "../../common/enums/common.enums";
import { CommonDto } from "../../common/dto/common.dto";
import { mix } from "ts-mixer";

export interface PositionDto extends Position, CommonDto { }

@mix(Position, CommonDto)
export class PositionDto {

    constructor(positionDto?: Partial<PositionDto>) {
        this.name = positionDto?.name;
        if (positionDto?.status !== undefined) {
            this.status = positionDto?.status;
            this.statusString = positionDto?.status ? StatusString.ACTIVE : StatusString.DEACTIVE;
        }
    }

    @IsNotEmpty(toErrString(PositionErrors.POSITION_400_EMPTY_NAME))
    name: string;

}
