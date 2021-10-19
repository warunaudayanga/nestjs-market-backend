import { Controller } from "@nestjs/common";
import { UserService } from "../services/user.service";

@Controller({ path: "user" })
export class UserController {

    constructor(private userService: UserService) { }

}
