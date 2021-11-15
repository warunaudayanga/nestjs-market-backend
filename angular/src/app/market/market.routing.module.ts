import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ProductsComponent } from "./components/products/products.component";
import { ProvidersComponent } from "./components/providers/providers.component";
import { UserComponent } from "./components/user/user.component";
import { PositionComponent } from "./components/user/position/position.component";

const routes: Routes = [
    { path: "", redirectTo: "dashboard", pathMatch: "full" },
    { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
    { path: "user", component: UserComponent, canActivate: [AuthGuard] },
    { path: "position", component: PositionComponent, canActivate: [AuthGuard] },
    { path: "products", component: ProductsComponent, canActivate: [AuthGuard] },
    { path: "providers", component: ProvidersComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class MarketRoutingModule { }
