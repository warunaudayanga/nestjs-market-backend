import { Controller, UseGuards, Post, Get, Patch, Body, Query, Scope, Delete } from "@nestjs/common";
import { JwtAuthGuard } from "../../../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../../../auth/guards/roles.guard";
import { SuccessDto } from "../../../common/entity/entity.success.dto";
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
        return this.userService.createAlt(new UserDto(createUserDto));
    }

    @UseGuards(JwtAuthGuard)
    @Patch("update")
    update(@Query("id") id: string, @Body() updateUserDto: Partial<UserDto>): Promise<SuccessDto> {
        return this.userService.update(id, new UserDto(updateUserDto) as Partial<UserDto>);
    }

    @UseGuards(JwtAuthGuard)
    @Get("get")
    get(@Query("id") id: string, @Query("eager") eager?: boolean): Promise<User> {
        return this.userService.get(id, { loadRelationIds: !eager });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get("getOne")
    @Roles(AuthType.ADMIN)
    getOne(@Body("filter") filter: FindConditions<User>): Promise<User> {
        return this.userService.getOne(filter);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get("getAll")
    getAll(@Query("eager") eager?: boolean): Promise<User[]> {
        return this.userService.getAll({ loadRelationIds: !eager });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Delete("delete")
    delete(@Query("id") id: string): Promise<SuccessDto> {
        return this.userService.delete(id);
    }

}
