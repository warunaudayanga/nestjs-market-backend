import { Controller, UseGuards, Post, Get, Patch, Body, Query, Scope, Delete } from "@nestjs/common";
import { JwtAuthGuard } from "../../../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../../../auth/guards/roles.guard";
import { SuccessDto } from "../../../common/entity/entity.success.dto";
import { StockService } from "../services/stock.service";
import { StockDto } from "../dto/stock.dto";
import { Stock } from "../entities/stock.entity";
import { AuthType } from "../../../auth/enums/auth.enums";
import { Roles } from "../../../auth/decorators/roles.decorator";
import { FindConditions } from "typeorm/find-options/FindConditions";

@Controller({ path: "stock", scope: Scope.REQUEST })
export class StockController {

    constructor(private stockService: StockService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Post("create")
    create(@Body() stockDto: StockDto): Promise<Stock> {
        return this.stockService.create(new StockDto(stockDto));
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("update")
    update(@Query("id") id: string, @Body() stockDto: Partial<StockDto>): Promise<SuccessDto> {
        return this.stockService.update(id, new StockDto(stockDto));
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("activate")
    activate(@Query("id") id: string): Promise<SuccessDto> {
        return this.stockService.activate(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("deactivate")
    deactivate(@Query("id") id: string): Promise<SuccessDto> {
        return this.stockService.deactivate(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("get")
    get(@Query("id") id: string): Promise<Stock> {
        return this.stockService.get(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get("getOne")
    @Roles(AuthType.ADMIN)
    getOne(@Body("filter") filter: FindConditions<Stock>): Promise<Stock> {
        return this.stockService.getOne(filter);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get("getAll")
    getAll(): Promise<Stock[]> {
        return this.stockService.getAll();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Delete("delete")
    delete(@Query("id") id: string): Promise<SuccessDto> {
        return this.stockService.delete(id);
    }

}
