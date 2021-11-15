import { NgModule } from "@angular/core";
import { DialogComponent } from "./components/dialog/dialog.component";
import { CommonModule } from "@angular/common";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { ReactiveFormsModule } from "@angular/forms";
import { FormValidationModule } from "../form-validation/form-validation.module";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
    declarations: [DialogComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatDividerModule,
        ReactiveFormsModule,
        FormValidationModule,
        NgSelectModule
    ]
})
export class DialogModule { }

