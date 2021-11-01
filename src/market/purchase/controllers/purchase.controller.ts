import { Controller, UseGuards, Post, Get, Body, Query, Scope, Delete } from "@nestjs/common";
import { JwtAuthGuard } from "../../../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../../../auth/guards/roles.guard";
import { SuccessDto } from "../../../common/entity/entity.success.dto";
import { PurchaseService } from "../services/purchase.service";
import { PurchaseInvoiceDto } from "../dto/purchase-invoice.dto";
import { Purchase } from "../entities/purchase.entity";
import { AuthType } from "../../../auth/enums/auth.enums";
import { Roles } from "../../../auth/decorators/roles.decorator";
import { FindConditions } from "typeorm/find-options/FindConditions";
import { CommonEntity } from "../../../common/entity/entity";
import { GetAllDto } from "../../../common/dto/getAllDto";

@Controller({ path: "purchase", scope: Scope.REQUEST })
export class PurchaseController {

    constructor(private purchaseService: PurchaseService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN, AuthType.STANDARD)
    @Post("create")
    create(@Body() createPurchaseInvoiceDto: PurchaseInvoiceDto): Promise<PurchaseInvoiceDto> {
        return this.purchaseService.createInvoice(new PurchaseInvoiceDto(createPurchaseInvoiceDto));
    }

    @UseGuards(JwtAuthGuard)
    @Get("get")
    get(@Query("id") id: string, @Query("eager") eager?: boolean): Promise<Purchase> {
        return this.purchaseService.get(id, { loadRelationIds: !eager });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Get("getOne")
    getOne(@Body("filter") filter: FindConditions<Purchase>): Promise<Purchase> {
        return this.purchaseService.getOne(filter);
    }

    @UseGuards(JwtAuthGuard)
    @Get("getAll")
    getAll(@Query() getAllDto: GetAllDto): Promise<Purchase[]> {
        return this.purchaseService.getAll(getAllDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get("getInvoice")
    getInvoice(@Query("code") code: number, @Query("eager") eager?: boolean): Promise<Partial<PurchaseInvoiceDto & CommonEntity>> {
        return this.purchaseService.getInvoice(code, { loadRelationIds: !eager });
    }

    @UseGuards(JwtAuthGuard)
    @Get("getAllInvoices")
    getAllInvoices(@Query("eager") eager?: boolean): Promise<Partial<PurchaseInvoiceDto & CommonEntity>[]> {
        return this.purchaseService.getAllInvoices({ loadRelationIds: !eager });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Delete("delete")
    delete(@Query("id") id: string): Promise<SuccessDto> {
        return this.purchaseService.delete(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Delete("deleteInvoice")
    deleteInvoice(@Query("code") code: number): Promise<SuccessDto> {
        return this.purchaseService.deleteInvoice(code);
    }

}
