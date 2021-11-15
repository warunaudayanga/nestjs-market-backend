import { Directive, ElementRef, HostListener } from "@angular/core";
import { AbstractControl, FormGroup, FormGroupDirective } from "@angular/forms";
import { AppService } from "../../../app.service";
import { toFirstCase } from "../../../common/common.methods";

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: "[formGroup]"
})
export class FormDirective {

    constructor(private element: ElementRef, private fgDirective: FormGroupDirective, private app: AppService) { }

    @HostListener("submit")
    onSubmit() {
        if (this.fgDirective.form.invalid) {
            const controlList = this.getInvalidControls(this.fgDirective.form);
            controlList.forEach((controlData, i) => {
                const controlElement: HTMLInputElement = this.element.nativeElement.querySelector("[name='" + controlData.key + "']");
                controlElement.classList.add("is-invalid");
                if (!i) {
                    const label = this.element.nativeElement.querySelector(`[for="${controlElement.id}"]`).innerText;
                    const value = controlData.control.value;
                    const errors = controlData.control.errors ? controlData.control.errors : {};
                    controlElement.focus();
                    // TODO: Catch all
                    console.log(errors);
                    if (errors.required) {
                        this.app.toast.error(`${toFirstCase(label)} cannot be empty!`);
                    } else if (errors.minlength) {
                        this.app.toast.error(`${toFirstCase(label)} must be at least ${errors.minlength.requiredLength} characters long!`);
                    } else if (errors.maxlength) {
                        this.app.toast.error(`${toFirstCase(label)} cannot exceed ${errors.maxlength.requiredLength} characters!`);
                    } else if (errors.email) {
                        this.app.toast.error(`'${value}' is not a valid email address!`);
                    }
                }
            });
        }
    }

    getInvalidControls(group: FormGroup, prevControls?: {key: string, control: AbstractControl}[]): {key: string, control: AbstractControl}[] {
        let controlList: {key: string, control: AbstractControl}[] = [];
        if (prevControls?.length) controlList = prevControls;
        for (const key of Object.keys(group.controls)) {
            const control = group.controls[key];
            if (control instanceof FormGroup) {
                this.getInvalidControls(control, controlList);
            } else if (control.invalid) {
                controlList.push({ key, control });
            }
        }
        return controlList;
    }

}
