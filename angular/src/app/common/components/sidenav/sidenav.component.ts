import { Component, OnDestroy } from "@angular/core";
import { AuthService } from "../../../auth/services/auth.service";
import { Subscription } from "rxjs";
import { MenuItem } from "../../interfaces/menu.interface";
import { menu as marketMenu } from "../../../market/config/menu-data";
import { AppService } from "../../../app.service";

@Component({
    selector: "app-sidenav",
    templateUrl: "./sidenav.component.html",
    styleUrls: ["./sidenav.component.scss"]
})
export class SidenavComponent implements OnDestroy {

    logged: boolean = false;

    loggedSubscription: Subscription;

    menu!: MenuItem[];

    constructor(public app: AppService, private auth: AuthService) {
        this.buildMenu();
        this.logged = auth.logged;
        this.loggedSubscription = auth.getLoggedListener()
            .subscribe(logged => {
                this.logged = logged;
            });
    }

    buildMenu() {
        this.menu = marketMenu.map((item, i) => {
            item.id = i + 1;
            if (item.children) item.children.forEach(child => {
                child.for = i + 1;
            });
            return item;
        });
    }

    select(selectedItem: MenuItem) {
        this.menu.forEach(item => {
            item.active = false;
            if (item.id !== selectedItem.id && item.id !== selectedItem.for) item.opened = false;
            if (item.children) {
                item.children.forEach(child => {
                    child.active = false;
                });
            }
        });
        selectedItem.active = true;
        if (selectedItem.children) {
            this.toggle(selectedItem);
        }
    }

    toggle(item: MenuItem) {
        if (item.opened) {
            item.opened = false;
        } else {
            this.menu.forEach(item => {
                item.opened = false;
            });
            item.opened = true;
        }
    }

    ngOnDestroy() {
        this.loggedSubscription.unsubscribe();
    }
}
