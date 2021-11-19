import { Controller, UseGuards, Post, Get, Patch, Res, Body, Query,
    Headers, Scope, Delete } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { AuthDataDto } from "./dto/auth-data.dto";
import { TokenData } from "./interfaces/token-data.interface";
import { VerifyTokenDto } from "./dto/verify-token.dto";
import { Response } from "express";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { Roles } from "./decorators/roles.decorator";
import { RolesGuard } from "./guards/roles.guard";
import { AuthType } from "./enums/auth.enums";
import { SuccessDto } from "../common/entity/entity.success.dto";
import { UserAuth } from "./decorators/auth.decorator";
import { Auth } from "./entities/auth.entity";
import { FindConditions } from "typeorm";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { RegisterDto } from "./dto/register.dto";
import { GetAllDto } from "../common/dto/getAllDto";
import { GetAllResponse } from "../common/entity/entity.interfaces";
import { Err } from "../common/entity/entity.errors";
import { isEmailVerification } from "../common/methods/common.methods";

@Controller({ path: "auth", scope: Scope.REQUEST })
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post("register")
    register(@Body() registerDto: RegisterDto, @Headers() headers: any): Promise<SuccessDto | Auth> {
        if (isEmailVerification()) {
            return this.authService.register(new RegisterDto(registerDto), headers.host);
        }
        return Promise.reject(this.authService.gerError(Err.E_405));
    }

    @UseGuards(JwtAuthGuard)
    @Post("create")
    create(@Body() registerDto: RegisterDto): Promise<SuccessDto | Auth> {
        if (!isEmailVerification()) {
            return this.authService.register(new RegisterDto(registerDto));
        }
        return Promise.reject(this.authService.gerError(Err.E_405));
    }

    @UseGuards(JwtAuthGuard)
    @Post("update")
    update(@Body() registerDto: RegisterDto): Promise<SuccessDto> {
        if (!isEmailVerification()) {
            return this.authService.updateRegistration(new RegisterDto(registerDto));
        }
        return Promise.reject(this.authService.gerError(Err.E_405));
    }

    @Get("verify")
    async verify(@Res() res: Response, @Query("auth") auth: string, @Query("token") token: string, @Query("baseUrl") baseUrl: string): Promise<void> {
        if (isEmailVerification()) {
            const status = await this.authService.verify(new VerifyTokenDto(auth, token));
            res.redirect(`${decodeURI(baseUrl || "http://localhost:8080")}/verify?status=${status}`);
        }
        return Promise.reject(this.authService.gerError(Err.E_405));
    }

    @Post("authenticate")
    authenticate(@Body() authDataDto: AuthDataDto): Promise<TokenData> {
        return this.authService.authenticate(authDataDto);
    }

    @Post("requestRecovery")
    requestRecovery(@Body("email") email: string): Promise<SuccessDto> {
        if (isEmailVerification()) {
            return this.authService.requestRecovery(email);
        }
        return Promise.reject(this.authService.gerError(Err.E_405));
    }

    @Get("recovery")
    async verifyRecovery(@Res() res: Response, @Query() verifyTokenDto: VerifyTokenDto): Promise<void> {
        if (isEmailVerification()) {
            const response = await this.authService.verifyRecovery(verifyTokenDto);
            if (typeof response === "string") {
                return res.redirect("/reset?status=" + response);
            }
            res.redirect("/reset?status=success&token=" + response.token);
        }
        return Promise.reject(this.authService.gerError(Err.E_405));
    }

    @UseGuards(JwtAuthGuard)
    @Post("resetPassword")
    resetPassword(@UserAuth() auth: Auth, @Body("password") password: string): Promise<SuccessDto> {
        return this.authService.resetPassword(auth.id, password);
    }

    @UseGuards(JwtAuthGuard)
    @Patch("changePassword")
    changePassword(@UserAuth() auth: Auth, @Body() changePasswordDto: ChangePasswordDto): Promise<SuccessDto> {
        return this.authService.changePassword(auth.id, changePasswordDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("changeType")
    changeType(@Query("user_id") user_id: string, @Body("type") type: AuthType): Promise<SuccessDto> {
        return this.authService.changeType(user_id, type);
    }

    @UseGuards(JwtAuthGuard)
    @Patch("activate")
    activate(@Query("user_id") user_id: string): Promise<SuccessDto> {
        return this.authService.activate(user_id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch("deactivate")
    deactivate(@Query("user_id") user_id: string): Promise<SuccessDto> {
        return this.authService.deactivate(user_id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch("delete")
    delete(@Query("user_id") user_id: string): Promise<SuccessDto> {
        return this.authService.delete(user_id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch("undelete")
    undelete(@Query("user_id") user_id: string): Promise<SuccessDto> {
        return this.authService.undelete(user_id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("get")
    get(@Query("user_id") user_id: string, @Query("eager") eager?: "true" | "false"): Promise<Auth> {
        return this.authService.get(user_id, { loadRelationIds: eager !== "true" });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Get("getOne")
    getOne(@Body("filter") filter: FindConditions<Auth>): Promise<Auth> {
        return this.authService.getOne(filter);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get("getAll")
    getAll(@Query() getAllDto: GetAllDto): Promise<GetAllResponse<Auth>> {
        return this.authService.getAll(getAllDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Delete("hardDelete")
    hardDelete(@Query("user_id") user_id: string): Promise<SuccessDto> {
        return this.authService.hardDelete(user_id);
    }

}
