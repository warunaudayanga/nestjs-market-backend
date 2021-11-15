import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TableData } from "../../interfaces/data-table";

@Component({
    selector: "app-data-table",
    templateUrl: "./data-table.component.html",
    styleUrls: ["./data-table.component.scss", "../../../loader/components/loader/loader.component.scss"]
})
export class DataTableComponent {

    @Input() loading: boolean = false;

    @Input() tableData: TableData<any, number> = {} as any;

    @Output() pageChange = new EventEmitter<number>();

    @Output() option = new EventEmitter<any>();

    @Output() optionA = new EventEmitter<any>();

    @Output() optionB = new EventEmitter<any>();

    @Output() optionC = new EventEmitter<any>();

    @Output() optionD = new EventEmitter<any>();

    @Output() optionE = new EventEmitter<any>();

    constructor() {
    }

    changePage(page: number) {
        this.pageChange.emit(page);
    }

    onOption(item?: any, i?: number) {
        switch (i) {
            case 4: {
                this.optionE.emit(item);
                break;
            }
            case 3: {
                this.optionD.emit(item);
                break;
            }
            case 2: {
                this.optionC.emit(item);
                break;
            }
            case 1: {
                this.optionB.emit(item);
                break;
            }
            case 0: {
                this.optionA.emit(item);
                break;
            }
            default: {
                this.option.emit(item);
            }
        }
    }

    toString(key: string | number | symbol) {
        return String(key);
    }

    getValue(item: any, i: number, key: string | number | symbol): string {
        let value = item;
        let keys = String(key).split(".");
        keys.forEach(k => {
            value = value[k];
        });
        return this.tableData.format?.[i] ? this.tableData.format?.[i]?.(value) : value;
    }

    getStyle(i: number): string {
        let style = "";
        style += `width: ${this.tableData.widths?.[i] || "auto"};`;
        style += ` text-align: ${this.tableData.aligns?.[i] || "center"};`;
        return style;
    }

    getColorClass(i?: number): string {
        return (typeof i === "number" ? this.tableData.option?.common[i].colorClass : this.tableData.option?.main?.colorClass) ?? "btn-primary";
    }

    getInnerHTML(i?: number): string {
        return (typeof i === "number" ? this.tableData.option?.common[i].html : this.tableData.option?.main?.html) ?? "";
    }

    getDisabled(i?: number): boolean {
        const disabled = typeof i === "number" ? this.tableData.option?.common?.[i]?.disabled : this.tableData.option?.main?.disabled;
        return typeof disabled === "function" ? disabled() : Boolean(disabled);

    }
}
