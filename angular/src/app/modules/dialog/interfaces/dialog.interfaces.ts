import { DialogLevel, DialogType } from "../enums/dialog.enums";
import { FormGroup, ValidatorFn } from "@angular/forms";
import { DialogComponent } from "../components/dialog/dialog.component";

export interface DialogButtons {
    ok?: string;
    yes?: string;
    cancel?: string;
}

export interface FormControlData {
    type: "checkbox" | "color" | "date" | "datetime-local" |
        "email" | "file" | "hidden" | "image" | "month" | "number" |
        "password" | "radio" | "range" | "reset" | "search" |
        "submit" | "tel" | "text" | "time" | "url" | "week" | "select";
    label: string;
    name: string;
    options?: {
        values: string[],
        labels?: string[]
    }
    value?: string;
    required?: boolean;
    validators?: ValidatorFn[]
}

export interface DialogOptions {
    title: string,
    message?: string,
    icon?: string,
    colorClass?: string;
    type?: DialogType;
    level?: DialogLevel;
    buttons?: DialogButtons
}

export interface PromptOptions extends DialogOptions {
    formData: FormControlData[],
    wait?: boolean
}

export interface DialogData extends PromptOptions {}

export interface PromptResponse {
    prompt: DialogComponent;
    form: FormGroup;
}
