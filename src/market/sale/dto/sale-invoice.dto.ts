import { IsEmpty, ValidateNested } from "class-validator";
import { toErrString } from "../../../common/converters/error-message.converter";
import { CommonDto } from "../../../common/dto/common.dto";
import { SaleErrors } from "./sale.errors.dto";
import { Type } from "class-transformer";
import { SaleStockDto } from "./sale-stock.dto";
import { Sale } from "../entities/sale.entity";
import { omit } from "../../../common/entity/entity.methods";

export class SaleInvoiceDto extends CommonDto {

    constructor(saleInvoiceDto?: Partial<SaleInvoiceDto>, saleStockDtoList?: SaleStockDto[]) {
        omit(saleInvoiceDto, ["id"]);
        super(saleInvoiceDto);
        this.code = saleInvoiceDto?.code;
        this.stocks = saleStockDtoList ? saleStockDtoList : saleInvoiceDto?.stocks;
    }

    @IsEmpty(toErrString(SaleErrors.SALE_400_NOT_EMPTY_CODE))
    code: number;

    @ValidateNested({ each: true })
    @Type(() => SaleStockDto)
    stocks: SaleStockDto[];

    getSaleList(code: number): Sale[] {
        const saleList: Sale[] = [];
        this.stocks.forEach(saleStockDto => {
            saleList.push(new Sale(code, saleStockDto));
        });
        return saleList;
    }

}
