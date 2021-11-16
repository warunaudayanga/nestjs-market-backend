import { AfterViewInit, Component, ElementRef, EventEmitter, ViewChild } from "@angular/core";
import { PositionEntity } from "../../../../auth/auth.interfaces";
import { PositionService } from "../../../services/position.service";
import { AppService } from "../../../../app.service";
import { getDimensions } from "../../../../common/common.methods";
import { environment } from "../../../../../environments/environment";
import { TableData } from "../../../../modules/data-table/interfaces/data-table";
import moment from "moment";
import { ErrorResponse } from "../../../../common/interfaces/common.interfaces";
import { AppError } from "../../../../common/dto/errors";
import { PromptOptions, FormControlData, PromptResponse } from "../../../../modules/dialog/interfaces/dialog.interfaces";
import { Validators } from "@angular/forms";
import { DialogService } from "../../../../modules/dialog/dialog.service";
import { StatusString } from "../../../../common/interfaces/common.enums";
import { DialogLevel } from "../../../../modules/dialog/enums/dialog.enums";
import { ViewPositionComponent } from "./view-position/view-position.component";

@Component({
    selector: "app-position",
    templateUrl: "./position.component.html",
    styleUrls: ["./position.component.scss"]
})
export class PositionComponent implements AfterViewInit {

    @ViewChild("container") container!: ElementRef<HTMLDivElement>;

    loading = false;

    totalItems!: number;

    public tableData: TableData<PositionEntity, 4>;

    constructor(private app: AppService, private positionService: PositionService, private dialog: DialogService) {
        this.tableData = {
            pagination: {
                itemsPerPage: 10,
                currentPage: 1
            },
            dataSource: [],
            headers: ["Name", "Status", "Created At", "Created By"],
            keys: ["name", "statusString", "createdAt", "createdBy.firstName"],
            widths: ["auto", "90px", "110px", "110px"],
            aligns: ["left", "center", "center", "left"],
            rowHeight: environment.tables.row.height,
            format: [undefined, undefined, (date: Date) => moment(date).format("YYYY-MM-DD"), undefined],
            option: {
                width: "140px",
                main: { html: "<i class='icofont icofont-ui-add'></i>", colorClass: "btn-app-primary-invert" },
                common: [
                    { html: "<i class='icofont icofont-ui-note'></i>", colorClass: "btn-success" },
                    { html: "<i class='icofont icofont-ui-edit'></i>", colorClass: "btn-warning" },
                    { html: "<i class='icofont icofont-ui-delete'></i>", colorClass: "btn-danger" }
                ]
            }
        };
        this.getAll();
    }

    ngAfterViewInit(): void {
        const innerHeight = getDimensions(this.container?.nativeElement).height;
        this.tableData.pagination.itemsPerPage = Math.floor(innerHeight / environment.tables.row.height - 1);
    }

    changePage(page: number) {
        this.tableData.pagination.currentPage = page;
        this.getAll();
    }

    createFormDialog(position?: PositionEntity): EventEmitter<PromptResponse> {
        const formData: FormControlData[] = [
            { type: "text", name: "name", label: "Name", value: position?.name ?? "", validators: [Validators.required, Validators.minLength(3)] },
            { type: "select", name: "statusString", label: "Status", value: position?.statusString ?? Object.values(StatusString)[0], options: { values: Object.values(StatusString) }, required: true }
        ];
        const options: PromptOptions = {
            title: "New Position",
            formData,
            icon: "icofont icofont-ui-add",
            colorClass: "app-primary",
            buttons: { yes: "Save" },
            wait: true
        };
        return this.dialog.prompt(options);
    }

    getAll(): void {
        // this.loading = true;
        // this.tableData.dataSource = [
        //     {
        //         "id": "6441ec1e-c47c-4bc5-8cdb-eda3a20ae46b",
        //         "createdBy": {
        //             "id": "cdae8cb5-d104-4d37-ac10-4fd8e525691b",
        //             "firstName": "Admin",
        //             "lastName": ""
        //         },
        //         "createdAt": new Date(),
        //         "updatedBy": null,
        //         "updatedAt": null,
        //         "status": true,
        //         "statusString": "Active",
        //         "name": "Cashier"
        //     },
        //     {
        //         "id": "3d77950d-bd58-4e4a-aa1d-13aab5e07beb",
        //         "createdBy": {
        //             "id": "cdae8cb5-d104-4d37-ac10-4fd8e525691b",
        //             "firstName": "Admin",
        //             "lastName": ""
        //         },
        //         "createdAt": new Date(),
        //         "updatedBy": null,
        //         "updatedAt": null,
        //         "status": true,
        //         "statusString": "Active",
        //         "name": "Manager"
        //     },
        //     {
        //         "id": "f1c480d8-8143-4156-b9d1-c84375beaee4",
        //         "createdBy": {
        //             "id": "cdae8cb5-d104-4d37-ac10-4fd8e525691b",
        //             "firstName": "Admin",
        //             "lastName": ""
        //         },
        //         "createdAt": new Date(),
        //         "updatedBy": null,
        //         "updatedAt": null,
        //         "status": true,
        //         "statusString": "Active",
        //         "name": "Sales Rep"
        //     },
        //     {
        //         "id": "0c03a5b3-0760-4833-be0c-df5e655cbc84",
        //         "createdBy": {
        //             "id": "cdae8cb5-d104-4d37-ac10-4fd8e525691b",
        //             "firstName": "Admin",
        //             "lastName": ""
        //         },
        //         "createdAt": new Date(),
        //         "updatedBy": null,
        //         "updatedAt": null,
        //         "status": true,
        //         "statusString": "Active",
        //         "name": "Stock Clerks"
        //     },
        //     {
        //         "id": "7c032e98-149d-4258-b156-18e01c42ce0e",
        //         "createdBy": {
        //             "id": "cdae8cb5-d104-4d37-ac10-4fd8e525691b",
        //             "firstName": "Admin",
        //             "lastName": ""
        //         },
        //         "createdAt": new Date(),
        //         "updatedBy": null,
        //         "updatedAt": null,
        //         "status": true,
        //         "statusString": "Active",
        //         "name": "Test 1"
        //     },
        //     {
        //         "id": "61338bd3-bce9-4739-b23a-0eb433ee0dff",
        //         "createdBy": {
        //             "id": "cdae8cb5-d104-4d37-ac10-4fd8e525691b",
        //             "firstName": "Admin",
        //             "lastName": ""
        //         },
        //         "createdAt": new Date(),
        //         "updatedBy": null,
        //         "updatedAt": null,
        //         "status": true,
        //         "statusString": "Active",
        //         "name": "Test 10"
        //     },
        //     {
        //         "id": "597f6129-0685-4b1a-83ae-a7973f2131d1",
        //         "createdBy": {
        //             "id": "cdae8cb5-d104-4d37-ac10-4fd8e525691b",
        //             "firstName": "Admin",
        //             "lastName": ""
        //         },
        //         "createdAt": new Date(),
        //         "updatedBy": null,
        //         "updatedAt": null,
        //         "status": true,
        //         "statusString": "Active",
        //         "name": "Test 11"
        //     },
        //     {
        //         "id": "114eb997-dccc-4dec-9092-8312746f19a1",
        //         "createdBy": {
        //             "id": "cdae8cb5-d104-4d37-ac10-4fd8e525691b",
        //             "firstName": "Admin",
        //             "lastName": ""
        //         },
        //         "createdAt": new Date(),
        //         "updatedBy": null,
        //         "updatedAt": null,
        //         "status": true,
        //         "statusString": "Active",
        //         "name": "Test 12"
        //     },
        //     {
        //         "id": "ce531f93-aae4-415e-b40e-3dcdefed9ce3",
        //         "createdBy": {
        //             "id": "cdae8cb5-d104-4d37-ac10-4fd8e525691b",
        //             "firstName": "Admin",
        //             "lastName": ""
        //         },
        //         "createdAt": new Date(),
        //         "updatedBy": null,
        //         "updatedAt": null,
        //         "status": true,
        //         "statusString": "Active",
        //         "name": "Test 13"
        //     },
        //     {
        //         "id": "63c08692-501b-4b7e-bb8a-a89d3dd3b156",
        //         "createdBy": {
        //             "id": "cdae8cb5-d104-4d37-ac10-4fd8e525691b",
        //             "firstName": "Admin",
        //             "lastName": ""
        //         },
        //         "createdAt": new Date(),
        //         "updatedBy": null,
        //         "updatedAt": null,
        //         "status": true,
        //         "statusString": "Active",
        //         "name": "Test 14"
        //     }
        // ];
        // this.tableData.pagination.totalItems = 100;

        // this.loading = true;
        this.positionService.getAll(this.tableData.pagination.currentPage, this.tableData.pagination.itemsPerPage, "name", false)
            .subscribe(response => {
                console.log(response);
                this.tableData.dataSource = response.entities;
                this.tableData.pagination.totalItems = response.total;
                this.loading = false;
            }, (error: ErrorResponse) => {
                this.loading = false;
                AppService.log(error);
                this.app.error(error.error?.message ?? AppError.ERROR);
            });
    }

    view(position: PositionEntity): void {
        this.app.viewDialog("View Position", ViewPositionComponent, position, "auto");
    }

    add(): void {
        this.createFormDialog()
            .subscribe((response: PromptResponse) => {
                if (response.form.valid) {
                    this.app.startLoading();
                    this.positionService.create(response.form.value)
                        .subscribe(() => {
                            response.prompt.close();
                            this.app.stopLoading();
                            this.app.success("New position added successfully");
                            this.getAll();
                        }, (error: ErrorResponse) => {
                            AppService.log(error);
                            this.app.error(error.error?.message ?? AppError.ERROR);
                            this.app.stopLoading();
                        });
                }
            });
    }

    edit(position: PositionEntity): void {
        this.createFormDialog(position)
            .subscribe((response: PromptResponse) => {
                if (response.form.valid) {
                    this.app.startLoading();
                    this.positionService.update(position.id, response.form.value)
                        .subscribe(() => {
                            response.prompt.close();
                            this.app.stopLoading();
                            this.app.success("Position updated successfully");
                            this.getAll();
                        }, (error: ErrorResponse) => {
                            AppService.log(error);
                            this.app.error(error.error?.message ?? AppError.ERROR);
                            this.app.stopLoading();
                        });
                }
            });
    }

    delete(position: PositionEntity): void {
        this.dialog.confirm(`Are you sure you want to delete position '${position.name}'`, DialogLevel.WARNING)
            .subscribe(result => {
                if (result) {
                    this.positionService.delete(position.id)
                        .subscribe(() => {
                            this.app.success(`Position '${position.name}' was deleted successfully`);
                            this.getAll();
                        }, error => {
                            AppService.log(error);
                            this.app.error(error.error?.message ?? AppError.ERROR);
                        });
                }
            });
    }
}
