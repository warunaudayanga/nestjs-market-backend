import { Component, Input } from "@angular/core";

@Component({
    selector: "app-dashboard-card",
    templateUrl: "./dashboard-card.component.html",
    styleUrls: ["./dashboard-card.component.scss"]
})
export class DashboardCardComponent {

    @Input() theme: "orange" | "blue" | "cyan" | "purple" | "red" | "green" = "green";

    @Input() title!: string;

    @Input() count!: number;

    @Input() buttonLink!: string;

    @Input() buttonName!: string;

    @Input() icon: string = "";

    @Input() iconColor: string = "";

    @Input() height: string = "190px";

}
