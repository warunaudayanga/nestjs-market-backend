import { IsNotEmpty } from "class-validator";
import { toErrString } from "../../../common/converters/error-message.converter";
import { CategoryErrors } from "./category.errors.dto";
import { Category } from "../entities/category.entity";
import { CommonDto } from "../../../common/dto/common.dto";
import { decorate, mix } from "ts-mixer";

export interface CategoryDto extends Category, CommonDto { }

@mix(Category, CommonDto)
export class CategoryDto extends CommonDto {

    constructor(categoryDto?: Partial<CategoryDto>) {
        super(categoryDto);
        this.name = categoryDto?.name;
        this.desc = categoryDto?.desc;
    }

    @decorate(IsNotEmpty(toErrString(CategoryErrors.CATEGORY_400_EMPTY_NAME)))
    name: string;

    desc?: string;

}
