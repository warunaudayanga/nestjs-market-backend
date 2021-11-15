import { Component, Input, OnDestroy } from "@angular/core";
import { LoaderService } from "../../loader.service";
import { Subscription } from "rxjs";

@Component({
    selector: "app-loader",
    templateUrl: "./loader.component.html",
    styleUrls: ["./loader.component.scss"]
})
export class LoaderComponent implements OnDestroy {

    @Input() loading: boolean = false;

    @Input() full: boolean = true;

    loadingSubscription: Subscription;

    constructor(private loaderService: LoaderService) {
        this.loadingSubscription = this.loaderService.getLoadingListener()
            .subscribe(loading => {
                this.loading = loading;
            });
    }

    ngOnDestroy(): void {
        this.loadingSubscription.unsubscribe();
    }

}
