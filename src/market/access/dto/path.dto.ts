import { IsNotEmpty } from "class-validator";
import { toErrString } from "../../../common/converters/error-message.converter";
import { PathErrors } from "./path.errors.dto";
import { Path } from "../entities/path.entity";
import { StatusString } from "../../common/enums/common.enums";
import { CommonDto } from "../../common/dto/common.dto";
import { mix } from "ts-mixer";

export interface PathDto extends Path, CommonDto { }

@mix(Path, CommonDto)
export class PathDto {

    constructor(pathDto?: Partial<PathDto>) {
        this.name = pathDto?.name;
        this.path = pathDto?.path;
        if (pathDto?.status !== undefined) {
            this.status = pathDto?.status;
            this.statusString = pathDto?.status ? StatusString.ACTIVE : StatusString.DEACTIVE;
        }
    }

    @IsNotEmpty(toErrString(PathErrors.PATH_400_EMPTY_NAME))
    name: string;

    @IsNotEmpty(toErrString(PathErrors.PATH_400_EMPTY_PATH))
    path: string;

}
