import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./common/components/page-not-found/page-not-found.component";

const routes: Routes = [
    { path: "", loadChildren: () => import("./market/market.module").then(m => m.MarketModule) },
    { path: "auth", loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule) },
    { path: "**", component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
