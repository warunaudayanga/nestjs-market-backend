import { Component } from "@angular/core";
import { DialogLevel, DialogType } from "../../../modules/dialog/enums/dialog.enums";
import { DialogService } from "../../../modules/dialog/dialog.service";
import { FormControlData, PromptResponse } from "../../../modules/dialog/interfaces/dialog.interfaces";
import { Validators } from "@angular/forms";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent {

    type = DialogType

    level = DialogLevel

    message = "The quick brown fox jumps over the lazy dog"

    constructor(private dialog: DialogService) { }

    alert(title: string, level: DialogLevel) {
        this.dialog.alert(title, this.message, level);
    }

    confirm(level: DialogLevel) {
        this.dialog.confirm(this.message, level);
    }

    prompt() {
        const formData: FormControlData[] = [
            { type: "email", name: "email", label: "Email", validators: [Validators.required, Validators.email, Validators.minLength(6)] },
            { type: "password", name: "password", label: "Password", validators: [Validators.required, Validators.minLength(6)] },
            { type: "password", name: "confirm", label: "Confirm", validators: [Validators.required, Validators.minLength(6)] }
        ];
        this.dialog.prompt({ title: "Register", formData, buttons: { yes: "Save" }, wait: true })
            .subscribe((response: PromptResponse) => {
                if (response.form.valid) {
                    if (response.form.value.password !== response.form.value.confirm) {
                        this.dialog.error("Password does not match");
                    } else {
                        response.prompt.close();
                    }
                }
            });
    }

}
