import { Controller, UseGuards, Post, Get, Patch, Body, Query, Scope } from "@nestjs/common";
import { JwtAuthGuard } from "../../../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../../../auth/guards/roles.guard";
import { SuccessDto } from "../../../common/dto/success.dto";
import { UserService } from "../services/user.service";
import { UserDto } from "../dto/user.dto";
import { User } from "../entities/user.entity";
import { AuthType } from "../../../auth/enums/auth.enums";
import { Roles } from "../../../auth/decorators/roles.decorator";
import { FindConditions } from "typeorm/find-options/FindConditions";

@Controller({ path: "user", scope: Scope.REQUEST })
export class UserController {

    constructor(private userService: UserService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Post("create")
    create(@Body() createUserDto: UserDto): Promise<User> {
        return this.userService.create(new UserDto(createUserDto));
    }

    @UseGuards(JwtAuthGuard)
    @Patch("update")
    update(@Query("id") id: string, @Body() updateUserDto: Partial<UserDto>): Promise<SuccessDto> {
        return this.userService.update(id, new UserDto(updateUserDto) as Partial<UserDto>);
    }

    @UseGuards(JwtAuthGuard)
    @Get("get")
    get(@Query("id") id: string): Promise<User> {
        return this.userService.get(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get("getOne")
    @Roles(AuthType.ADMIN)
    getOne(@Body("filter") filter: FindConditions<User>): Promise<User> {
        return this.userService.getOne(filter);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get("getAll")
    getAll(): Promise<User[]> {
        return this.userService.getAll();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("delete")
    delete(@Query("id") id: string): Promise<SuccessDto> {
        return this.userService.delete(id);
    }

}
