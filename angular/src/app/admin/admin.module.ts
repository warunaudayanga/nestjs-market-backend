import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ErrorLogViewerComponent } from "./components/error-log-viewer/error-log-viewer.component";
import { MomentModule } from "ngx-moment";
import { AdminRoutingModule } from "./admin.routing.module";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AppCommonModule } from "../common/common.module";
import { RoamComponent } from "./components/roam/roam.component";


@NgModule({
    declarations: [
        DashboardComponent,
        ErrorLogViewerComponent,
        RoamComponent
    ],
    imports: [
        CommonModule,
        AppCommonModule,
        AdminRoutingModule,
        MomentModule
    ]
})
export class AdminModule { }
