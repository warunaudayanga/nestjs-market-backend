import { EventEmitter, Injectable, Type } from "@angular/core";
import { Observable } from "rxjs";
import { DialogComponent } from "./components/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";
import {
    DialogButtons,
    PromptOptions,
    FormControlData,
    PromptResponse,
    DialogOptions
} from "./interfaces/dialog.interfaces";
import { DialogLevel, DialogType } from "./enums/dialog.enums";
import { Validators } from "@angular/forms";
import { CSSMeasurement } from "../../common/interfaces/common.interfaces";

@Injectable({
    providedIn: "root"
})
export class DialogService {

    private alertWidth = "450px";

    private alertClass = "dialog-container";

    constructor(private dialog: MatDialog) { }

    public view<Entity>(title: string, Component: Type<any>, entity: Entity, width?: CSSMeasurement): Observable<boolean> {
        const dialogRef = this.dialog.open(Component, {
            width: width ?? this.alertWidth,
            data: entity,
            disableClose: true,
            panelClass: [this.alertClass, "primary"]
        });
        return dialogRef.componentInstance.emitter;
    }

    public open(options: DialogOptions): Observable<boolean> {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: this.alertWidth,
            disableClose: options.type !== DialogType.ALERT,
            data: { ...options },
            panelClass: [this.alertClass, options.level ?? ""]
        });
        return dialogRef.afterClosed();
    }

    public prompt(options: PromptOptions): EventEmitter<PromptResponse> {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: this.alertWidth,
            disableClose: true,
            data: { ...options, type: DialogType.PROMPT },
            panelClass: [this.alertClass, "primary"]
        });
        return dialogRef.componentInstance.emitter;
    }

    public alert(title: string, message: string, level?: DialogLevel, ok?: string): Observable<boolean> {
        return this.open({ title, message, type: DialogType.ALERT, level, buttons: { ok } });
    }

    public confirm(message: string, level: DialogLevel, buttons?: DialogButtons): Observable<boolean> {
        return this.open({ title: "Confirm", message, type: DialogType.CONFIRM, level, buttons });
    }

    public info(message: string, confirm?: boolean): Observable<boolean> {
        return this.open({ title: "Information", message, type: confirm ? DialogType.CONFIRM : DialogType.ALERT, level: DialogLevel.INFO });
    }

    public success(message: string, confirm?: boolean): Observable<boolean> {
        return this.open({ title: "Success", message, type: confirm ? DialogType.CONFIRM : DialogType.ALERT, level: DialogLevel.SUCCESS });
    }

    public warning(message: string, confirm?: boolean): Observable<boolean> {
        return this.open({ title: "Warning", message, type: confirm ? DialogType.CONFIRM : DialogType.ALERT, level: DialogLevel.WARNING });
    }

    public error(message: string, confirm?: boolean): Observable<boolean> {
        return this.open({ title: "Error", message, type: confirm ? DialogType.CONFIRM : DialogType.ALERT, level: DialogLevel.ERROR });
    }

    // noinspection JSUnusedGlobalSymbols
    public sampleAlert() {
        this.success("Successfully done nothing");
    }

    // noinspection JSUnusedGlobalSymbols
    public sampleConfirm() {
        this.error("Is it successful?", true);
    }

    // noinspection JSUnusedGlobalSymbols
    public samplePrompt() {
        const formData: FormControlData[] = [
            { type: "email", name: "email", label: "Email", validators: [Validators.required, Validators.email, Validators.minLength(6)] },
            { type: "password", name: "password", label: "Password", validators: [Validators.required, Validators.minLength(6)] },
            { type: "password", name: "confirm", label: "Confirm", validators: [Validators.required, Validators.minLength(6)] }
        ];
        this.prompt({ title: "Register", formData, buttons: { yes: "Save" }, wait: true })
            .subscribe((response: PromptResponse) => {
                if (response.form.valid) {
                    if (response.form.value.password !== response.form.value.confirm) {
                        this.error("Password does not match");
                    } else {
                        response.prompt.close();
                    }
                }
            });
    }
}

