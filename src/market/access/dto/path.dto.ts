import { IsNotEmpty } from "class-validator";
import { toErrString } from "../../../common/converters/error-message.converter";
import { PathErrors } from "./path.errors.dto";
import { Path } from "../entities/path.entity";
import { CommonDto } from "../../../common/dto/common.dto";
import { decorate, mix } from "ts-mixer";

export interface PathDto extends Path, CommonDto { }

@mix(Path, CommonDto)
export class PathDto extends CommonDto {

    constructor(pathDto?: Partial<PathDto>) {
        super(pathDto);
        this.name = pathDto?.name;
        this.path = pathDto?.path;
    }

    @decorate(IsNotEmpty(toErrString(PathErrors.PATH_400_EMPTY_NAME)))
    name: string;

    @decorate(IsNotEmpty(toErrString(PathErrors.PATH_400_EMPTY_PATH)))
    path: string;

}
