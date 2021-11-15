import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { AuthService } from "./auth/services/auth.service";
import { MatDrawerMode, MatSidenav } from "@angular/material/sidenav";
import { SidenavService } from "./common/services/sidenav.service";
import { AppService } from "./app.service";
import { Subscription } from "rxjs";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements AfterViewInit {

    @ViewChild("sidenav") public sidenav!: MatSidenav;

    title = "Market";

    wide: boolean;

    sidenavMode: MatDrawerMode;

    logged: boolean = false;

    loggedSubscription: Subscription;

    constructor(
        private titleService: Title,
        private app: AppService,
        private authService: AuthService,
        private sidenavService: SidenavService
    ) {
        titleService.setTitle(this.title);
        this.logged = authService.logged;
        this.loggedSubscription = authService.getLoggedListener()
            .subscribe(logged => {
                this.logged = logged;
            });
        authService.autoAuth();
        if (this.app.width < 992) {
            this.sidenavMode = "over";
            this.wide = false;
        } else {
            this.sidenavMode = "side";
            this.wide = true;
        }
    }

    ngAfterViewInit(): void {
        this.sidenavService.sidenav = this.sidenav;
    }

}
