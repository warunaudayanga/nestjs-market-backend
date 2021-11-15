import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PositionEntity } from "../../../../../auth/auth.interfaces";

@Component({
    selector: "app-view-position",
    templateUrl: "./view-position.component.html",
    styleUrls: ["./view-position.component.scss", "../../../../../modules/dialog/components/dialog/dialog.component.scss"]
})
export class ViewPositionComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public position: PositionEntity, private dialogRef: MatDialogRef<boolean>) { }

    ngOnInit(): void {
        console.log("here");
    }

    close() {
        this.dialogRef.close();
    }
}
