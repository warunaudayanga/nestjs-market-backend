import { IsNotEmpty } from "class-validator";

export class AuthDataDto {

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

}
