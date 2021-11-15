import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { MaterialModule } from "./material.module";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { NavMenuComponent } from "./components/navbar/nav-menu/nav-menu.component";
import { RouterModule } from "@angular/router";
import { NotificationComponent } from "./components/navbar/notification/notification.component";
import { DashboardCardComponent } from "./components/dashboard-card/dashboard-card.component";
import { DashboardCardContainerComponent } from "./components/dashboard-card/container/dashboard-card-container.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormValidationModule } from "../modules/form-validation/form-validation.module";

@NgModule({
    declarations: [
        PageNotFoundComponent,
        NavbarComponent,
        SidenavComponent,
        NavMenuComponent,
        NotificationComponent,
        DashboardCardComponent,
        DashboardCardContainerComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule,
        FormValidationModule
    ],
    exports: [
        NavbarComponent,
        SidenavComponent,
        FlexLayoutModule,
        NgSelectModule,
        ReactiveFormsModule,
        MaterialModule,
        DashboardCardComponent,
        DashboardCardContainerComponent
    ]
})
export class AppCommonModule { }
