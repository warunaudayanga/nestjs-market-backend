import { Component, EventEmitter, Inject, Output } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogButtons, DialogData, FormControlData, PromptResponse } from "../../interfaces/dialog.interfaces";
import { DialogLevel, DialogType } from "../../enums/dialog.enums";
import { FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { toFirstCase } from "../../../../common/common.methods";

@Component({
    selector: "app-alert-dialog",
    templateUrl: "./dialog.component.html",
    styleUrls: ["./dialog.component.scss"]
})
export class DialogComponent {

    @Output() emitter: EventEmitter<PromptResponse> = new EventEmitter();

    public icon: string;

    public colorClass: string;

    public title: string;

    public message?: string;

    public buttons?: DialogButtons | undefined;

    public formGroup: FormGroup;

    public formData?: FormControlData[];

    public isAlert? = false;

    public isConfirm? = false;

    public isPrompt? = false;

    public normalTypes = ["color", "date", "datetime-local", "email", "image", "month", "number", "password", "tel", "text", "time"]

    constructor(@Inject(MAT_DIALOG_DATA) public dialogData: DialogData, private dialogRef: MatDialogRef<boolean>) {

        this.title = dialogData.type !== DialogType.CONFIRM ? dialogData.title : "Confirm";
        this.isAlert = dialogData.type === DialogType.ALERT;
        this.isConfirm = dialogData.type === DialogType.CONFIRM;
        this.isPrompt = dialogData.type === DialogType.PROMPT;
        this.message = dialogData.message;
        this.buttons = dialogData.buttons;

        switch (dialogData.level) {
            case DialogLevel.INFO:
                this.colorClass = "info";
                this.icon = "icofont icofont-info-circle";
                break;
            case DialogLevel.SUCCESS:
                this.colorClass = "success";
                this.icon = "icofont icofont-verification-check";
                break;
            case DialogLevel.WARNING:
                this.colorClass = "warning";
                this.icon = "icofont icofont-warning";
                break;
            case DialogLevel.ERROR:
                this.colorClass = "danger";
                this.icon = "icofont icofont-warning-alt";
                break;
            default:
                this.colorClass = "primary";
                this.icon = "icofont icofont-info-circle";
        }

        if (dialogData.type === DialogType.CONFIRM) {
            this.icon = "icofont icofont-question";
        }

        if (dialogData.icon) {
            this.icon = dialogData.icon;
        }

        if (dialogData.colorClass) {
            this.colorClass = dialogData.colorClass;
        }

        const groupData: {[key: string]: any} = {};
        this.formData = dialogData.formData;
        this.formData?.forEach(input => {
            let validators: ValidatorFn[] = [];
            if (input.validators?.length) validators = input.validators;
            if (input.required) validators.push(Validators.required);
            groupData[input.name] = new FormControl(input.value ?? "", validators);
        });

        this.formGroup = new FormGroup(groupData);
    }

    submit(): void {
        this.emitter.emit({ prompt: this, form: this.formGroup });
        if (!this.dialogData.wait) {
            this.close();
        }
    }

    confirm(): void {
        if (this.isConfirm) this.dialogRef.close(true);
    }

    close(): void {
        this.dialogRef.close(this.isAlert);
    }

    getOptionValue(options: { values: string[]; labels?: string[] }, i: number): string {
        return options?.labels ? options?.labels?.[i] : toFirstCase(options?.values[i]);
    }
}
