import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { NgxPaginationModule } from "ngx-pagination";


@NgModule({
    declarations: [
        PaginationComponent
    ],
    exports: [
        PaginationComponent
    ],
    imports: [
        CommonModule,
        NgxPaginationModule
    ]
})
export class PaginationModule { }
