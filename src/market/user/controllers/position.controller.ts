import { Controller, UseGuards, Post, Get, Patch, Body, Query, Scope } from "@nestjs/common";
import { JwtAuthGuard } from "../../../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../../../auth/guards/roles.guard";
import { SuccessDto } from "../../../common/dto/success.dto";
import { PositionService } from "../services/position.service";
import { PositionDto } from "../dto/position.dto";
import { Position } from "../entities/position.entity";
import { AuthType } from "../../../auth/enums/auth.enums";
import { Roles } from "../../../auth/decorators/roles.decorator";
import { FindConditions } from "typeorm/find-options/FindConditions";

@Controller({ path: "user/position", scope: Scope.REQUEST })
export class PositionController {

    constructor(private positionService: PositionService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Post("create")
    create(@Body() createPositionDto: PositionDto): Promise<Position> {
        return this.positionService.create(new PositionDto(createPositionDto));
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("update")
    update(@Query("id") id: string, @Body() updatePositionDto: Partial<PositionDto>): Promise<SuccessDto> {
        return this.positionService.update(id, new PositionDto(updatePositionDto) as Partial<PositionDto>);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("activate")
    activate(@Query("id") id: string): Promise<SuccessDto> {
        return this.positionService.activate(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("deactivate")
    deactivate(@Query("id") id: string): Promise<SuccessDto> {
        return this.positionService.deactivate(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("get")
    get(@Query("id") id: string): Promise<Position> {
        return this.positionService.get(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get("getOne")
    @Roles(AuthType.ADMIN)
    getOne(@Body("filter") filter: FindConditions<Position>): Promise<Position> {
        return this.positionService.getOne(filter);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get("getAll")
    getAll(): Promise<Position[]> {
        return this.positionService.getAll();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("delete")
    delete(@Query("id") id: string): Promise<SuccessDto> {
        return this.positionService.delete(id);
    }

}
