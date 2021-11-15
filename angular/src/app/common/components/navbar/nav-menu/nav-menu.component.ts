import { Component } from "@angular/core";
import { AuthService } from "../../../../auth/services/auth.service";
import { Subscription } from "rxjs";
import { AppService } from "../../../../app.service";

@Component({
    selector: "app-nav-menu",
    templateUrl: "./nav-menu.component.html",
    styleUrls: ["./nav-menu.component.scss"]
})
export class NavMenuComponent {

    logged: boolean = false;

    loggedSubscription: Subscription;

    constructor(public app: AppService, private auth: AuthService) {
        this.logged = auth.logged;
        this.loggedSubscription = auth.getLoggedListener()
            .subscribe(logged => {
                this.logged = logged;
            });
    }

    logout(): void {
        this.auth.logout();
    }

}
