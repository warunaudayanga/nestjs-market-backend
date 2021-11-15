import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app.routing.module";
import { AppComponent } from "./app.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MomentModule } from "ngx-moment";
import { LayoutModule } from "@angular/cdk/layout";
import { ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AppCommonModule } from "./common/common.module";
import { MaterialModule } from "./common/material.module";
import { ToastrModule } from "ngx-toastr";
import { ResponseInterceptor } from "./common/response.interceptor";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { DialogModule } from "./modules/dialog/dialog.module";
import { LoaderModule } from "./modules/loader/loader.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            progressBar: true
        }),
        FontAwesomeModule,
        MaterialModule,
        MomentModule,
        LayoutModule,
        HttpClientModule,
        AppCommonModule,
        DialogModule,
        AppRoutingModule,
        LoaderModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
