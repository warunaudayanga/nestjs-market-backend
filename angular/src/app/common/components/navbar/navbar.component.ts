import { Component, OnDestroy } from "@angular/core";
import { SidenavService } from "../../services/sidenav.service";
import { AuthService } from "../../../auth/services/auth.service";
import { Subscription } from "rxjs";
import { AppService } from "../../../app.service";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnDestroy {

    logged: boolean = false;

    loggedSubscription: Subscription;

    constructor(public app: AppService, private auth: AuthService, private sidenavService: SidenavService) {
        this.logged = auth.logged;
        this.loggedSubscription = auth.getLoggedListener()
            .subscribe(logged => {
                this.logged = logged;
            });
    }

    toggleSidenav() {
        const ignored = this.sidenavService.toggle();
    }

    ngOnDestroy(): void {
        this.loggedSubscription.unsubscribe();
    }

}
