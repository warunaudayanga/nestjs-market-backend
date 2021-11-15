import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorLogViewerComponent } from "./components/error-log-viewer/error-log-viewer.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AuthGuard } from "../auth/auth.guard";
import { RoamComponent } from "./components/roam/roam.component";

const routes: Routes = [
    { path: "", redirectTo: "dashboard", pathMatch: "full" },
    { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
    { path: "roam", component: RoamComponent, canActivate: [AuthGuard] },
    { path: "errorLog", component: ErrorLogViewerComponent, canActivate: [AuthGuard] }
    // { path: "what", loadChildren: () => import("./what/to.module").then(m => m.AdminModule) }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
