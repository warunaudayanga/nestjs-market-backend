import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "app-pagination",
    templateUrl: "./pagination.component.html",
    styleUrls: ["./pagination.component.scss"]
})
export class PaginationComponent {

    @Output() pageChange = new EventEmitter<number>();

    constructor() { }

    changePage(page: number) {
        this.pageChange.emit(page);
    }
}
