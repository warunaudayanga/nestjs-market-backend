import { Component } from "@angular/core";

@Component({
    selector: "app-notification",
    templateUrl: "./notification.component.html",
    styleUrls: ["./notification.component.scss"]
})
export class NotificationComponent {

    purchase: number;

    stock: number;

    message: number;

    constructor() {
        this.purchase = 1;
        this.stock = 4;
        this.message = 7;
    }

}
