import { IsOptional } from "class-validator";
import { RegisterDto } from "./register.dto";

export class UpdateDto extends RegisterDto {

    constructor(registerDto: UpdateDto) {
        super(registerDto);
        this.email = registerDto?.email;
        this.password = registerDto?.password;
        this.nic = registerDto?.nic.toUpperCase();
    }

    @IsOptional()
    public password: string;

}
