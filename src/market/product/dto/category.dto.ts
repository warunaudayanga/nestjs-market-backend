import { IsNotEmpty } from "class-validator";
import { toErrString } from "../../../common/converters/error-message.converter";
import { CategoryErrors } from "./category.errors.dto";
import { Category } from "../entities/category.entity";
import { StatusString } from "../../common/enums/common.enums";
import { CommonDto } from "../../common/dto/common.dto";
import { mix } from "ts-mixer";

export interface CategoryDto extends Category, CommonDto { }

@mix(Category, CommonDto)
export class CategoryDto {

    constructor(categoryDto?: Partial<CategoryDto>) {
        this.name = categoryDto?.name;
        this.desc = categoryDto?.desc;
        if (categoryDto?.status !== undefined) {
            this.status = categoryDto?.status;
            this.statusString = categoryDto?.status ? StatusString.ACTIVE : StatusString.DEACTIVE;
        }
    }

    @IsNotEmpty(toErrString(CategoryErrors.CATEGORY_400_EMPTY_NAME))
    name: string;

    desc?: string;

}
