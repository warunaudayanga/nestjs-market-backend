import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { AppService } from "../../../app.service";
import { UserService } from "../../../common/services/user.service";

@Component({
    selector: "app-roam",
    templateUrl: "./roam.component.html",
    styleUrls: ["./roam.component.scss"]
})
export class RoamComponent implements OnInit, OnDestroy {

    private routeSubscription!: Subscription;

    constructor(private app: AppService, private userService: UserService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.routeSubscription = this.route.params.subscribe(params => {
            console.log("params: ", params);
        });
    }

    startRoaming(uuid: any) {
        this.userService.getUserByUUID(uuid)
            .subscribe(user => {
                this.app.user = user;
                this.app.load("viewAs/" + uuid);
            }, error => {
                AppService.log(error);
                this.app.errorDialog("Error occurred while trying to start roaming!");
            });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }
}
