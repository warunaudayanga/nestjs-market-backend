import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormDirective } from "./directives/form.directive";
import { FormControlDirective } from "./directives/form-control.directive";

@NgModule({
    declarations: [FormDirective, FormControlDirective],
    imports: [
        CommonModule
    ],
    exports: [
        FormDirective,
        FormControlDirective
    ]
})
export class FormValidationModule { }
