import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DataTableComponent } from "./components/data-table/data-table.component";
import { NgxPaginationModule } from "ngx-pagination";
import { PaginationModule } from "../pagination/pagination.module";
import { MomentModule } from "ngx-moment";
import { LoaderModule } from "../loader/loader.module";


@NgModule({
    declarations: [
        DataTableComponent
    ],
    exports: [
        DataTableComponent
    ],
    imports: [
        CommonModule,
        PaginationModule,
        MomentModule,
        NgxPaginationModule,
        LoaderModule
    ]
})
export class DataTableModule { }
