import { Controller, UseGuards, Post, Get, Patch, Res, Body, Query, Scope, Delete } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { AuthDataDto } from "./dto/auth-data.dto";
import { TokenData } from "./interfaces/token-data.interface";
import { VerifyTokenDto } from "./dto/verify-token.dto";
import { Response } from "express";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { Roles } from "./decorators/roles.decorator";
import { RolesGuard } from "./guards/roles.guard";
import { AuthType } from "./enums/auth.enums";
import { SuccessDto } from "../common/dto/success.dto";
import { UserAuth } from "./decorators/auth.decorator";
import { Auth } from "./entities/auth.entity";
import { FindConditions } from "typeorm";

@Controller({ path: "auth", scope: Scope.REQUEST })
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post("register")
    register(@Body() createAuthDto: CreateAuthDto): Promise<SuccessDto> {
        return this.authService.register(new CreateAuthDto(createAuthDto));
    }

    @Get("verify")
    async verify(@Res() res: Response, @Query() verifyTokenDto: VerifyTokenDto): Promise<void> {
        const status = await this.authService.verify(verifyTokenDto);
        res.redirect("/verify?status=" + status);
    }

    @Post("authenticate")
    authenticate(@Body() authDataDto: AuthDataDto): Promise<TokenData> {
        return this.authService.authenticate(authDataDto);
    }

    @Post("requestRecovery")
    requestRecovery(@Body("email") email: string): Promise<SuccessDto> {
        return this.authService.requestRecovery(email);
    }

    @Get("recovery")
    async verifyRecovery(@Res() res: Response, @Query() verifyTokenDto: VerifyTokenDto): Promise<void> {
        const response = await this.authService.verifyRecovery(verifyTokenDto);
        if (typeof response === "string") {
            return res.redirect("/reset?status=" + response);
        }
        res.redirect("/reset?status=success&token=" + response.token);
    }

    @UseGuards(JwtAuthGuard)
    @Post("resetPassword")
    resetRecovery(@UserAuth() auth: Auth, @Body("password") password: string): Promise<SuccessDto> {
        return this.authService.resetPassword(auth.id, password);
    }

    @UseGuards(JwtAuthGuard)
    @Patch("changePassword")
    changePassword(@UserAuth() auth: Auth, @Body("password") password: string): Promise<SuccessDto> {
        return this.authService.changePassword(auth.id, password);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("changeType")
    changeType(@Query("user_id") user_id: string, @Body("type") type: AuthType): Promise<SuccessDto> {
        return this.authService.changeType(user_id, type);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("activate")
    activate(@Query("user_id") user_id: string): Promise<SuccessDto> {
        return this.authService.activate(user_id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("deactivate")
    deactivate(@Query("user_id") user_id: string): Promise<SuccessDto> {
        return this.authService.deactivate(user_id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("delete")
    delete(@Query("user_id") user_id: string): Promise<SuccessDto> {
        return this.authService.delete(user_id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("undelete")
    undelete(@Query("user_id") user_id: string): Promise<SuccessDto> {
        return this.authService.undelete(user_id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("get")
    get(@Query("user_id") user_id: string): Promise<Auth> {
        return this.authService.get(user_id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Get("getOne")
    getOne(@Body("filter") filter: FindConditions<Auth>): Promise<Auth> {
        return this.authService.getOne(filter);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get("getAll")
    getAll(): Promise<Auth[]> {
        return this.authService.getAll();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Delete("hardDelete")
    hardDelete(@Query("user_id") user_id: string): Promise<SuccessDto> {
        return this.authService.hardDelete(user_id);
    }

}
