import { Controller, UseGuards, Post, Get, Body, Query, Scope, Delete } from "@nestjs/common";
import { JwtAuthGuard } from "../../../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../../../auth/guards/roles.guard";
import { SuccessDto } from "../../../common/entity/entity.success.dto";
import { SaleService } from "../services/sale.service";
import { SaleInvoiceDto } from "../dto/sale-invoice.dto";
import { Sale } from "../entities/sale.entity";
import { AuthType } from "../../../auth/enums/auth.enums";
import { Roles } from "../../../auth/decorators/roles.decorator";
import { FindConditions } from "typeorm/find-options/FindConditions";
import { CommonEntity } from "../../../common/entity/entity";
import { GetAllDto } from "../../../common/dto/getAllDto";
import { GetAllResponse } from "../../../common/entity/entity.interfaces";

@Controller({ path: "sale", scope: Scope.REQUEST })
export class SaleController {

    constructor(private saleService: SaleService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN, AuthType.STANDARD)
    @Post("create")
    create(@Body() createSaleInvoiceDto: SaleInvoiceDto): Promise<SaleInvoiceDto> {
        return this.saleService.createInvoice(new SaleInvoiceDto(createSaleInvoiceDto));
    }

    @UseGuards(JwtAuthGuard)
    @Get("get")
    get(@Query("id") id: string, @Query("eager") eager?: boolean): Promise<Sale> {
        return this.saleService.get(id, { loadRelationIds: !eager });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Get("getOne")
    getOne(@Body("filter") filter: FindConditions<Sale>): Promise<Sale> {
        return this.saleService.getOne(filter);
    }

    @UseGuards(JwtAuthGuard)
    @Get("getAll")
    getAll(@Query() getAllDto: GetAllDto): Promise<GetAllResponse<Sale>> {
        return this.saleService.getAll(getAllDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get("getInvoice")
    getInvoice(@Query("code") code: number, @Query("eager") eager?: boolean): Promise<Partial<SaleInvoiceDto & CommonEntity>> {
        return this.saleService.getInvoice(code, { loadRelationIds: !eager });
    }

    @UseGuards(JwtAuthGuard)
    @Get("getInvoiceList")
    getInvoiceList(@Query() getAllDto: GetAllDto): Promise<GetAllResponse<Sale>> {
        return this.saleService.getInvoiceList(getAllDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get("getAllInvoices")
    getAllInvoices(@Query("eager") eager?: boolean): Promise<Partial<SaleInvoiceDto & CommonEntity>[]> {
        return this.saleService.getAllInvoices({ loadRelationIds: !eager });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Delete("delete")
    delete(@Query("id") id: string): Promise<SuccessDto> {
        return this.saleService.delete(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Delete("deleteInvoice")
    deleteInvoice(@Query("code") code: number): Promise<SuccessDto> {
        return this.saleService.deleteInvoice(code);
    }

}
