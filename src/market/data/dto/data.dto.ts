// import { IsJSON, IsNotEmpty } from "class-validator";
// import { toErrString } from "../../../common/converters/error-message.converter";
// import { DataErrors } from "./data.errors.dto";
// import { Data } from "../entities/data.entity";
// import { CommonDto } from "../../../common/dto/common.dto";
//
// // export interface DataDto extends Data, CommonDto { }
//
// export class DataDto {
//
//     constructor(dataDto: Partial<DataDto>) {
//         this.key = dataDto?.key;
//         this.value = dataDto?.value;
//     }
//
//     @IsNotEmpty(toErrString(DataErrors.APP_400_EMPTY_PRODUCT)) // to do
//     key: string;
//
//     @IsJSON(toErrString(DataErrors.APP_400_EMPTY_PRICE)) // to do
//     value: string;
//
// }
