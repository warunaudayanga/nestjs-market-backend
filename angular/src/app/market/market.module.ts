import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MarketRoutingModule } from "./market.routing.module";
import { HomeComponent } from "./components/home/home.component";
import { MainComponent } from "./components/main/main.component";
import { UserComponent } from "./components/user/user.component";
import { AppCommonModule } from "../common/common.module";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ProductsComponent } from "./components/products/products.component";
import { ProvidersComponent } from "./components/providers/providers.component";
import { PositionComponent } from "./components/user/position/position.component";
import { DataTableModule } from "../modules/data-table/data-table.module";
import { ViewPositionComponent } from "./components/user/position/view-position/view-position.component";
import { MomentModule } from "ngx-moment";

@NgModule({
    declarations: [
        HomeComponent,
        MainComponent,
        UserComponent,
        DashboardComponent,
        ProductsComponent,
        ProvidersComponent,
        PositionComponent,
        ViewPositionComponent
    ],
    imports: [
        CommonModule,
        AppCommonModule,
        MarketRoutingModule,
        DataTableModule,
        MomentModule
    ]
})
export class MarketModule { }
