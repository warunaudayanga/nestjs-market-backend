import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./components/login/login.component";
import { AuthRoutingModule } from "./auth.routing.module";
import { AppCommonModule } from "../common/common.module";
import { RegisterComponent } from "./components/register/register.component";
import { FormsModule } from "@angular/forms";


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    exports: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        AppCommonModule,
        AuthRoutingModule,
        FormsModule
    ]
})
export class AuthModule { }
