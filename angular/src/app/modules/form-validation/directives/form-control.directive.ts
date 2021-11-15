import { Directive, ElementRef, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: "[formControlName]" })
export class FormControlDirective {

    hasChanged: boolean = false;

    hasTyped: boolean = false;

    hasFocusedAndLost: boolean = false;

    constructor(private element: ElementRef, private control: NgControl) { }

    private validate() {
        if (this.control.invalid) {
            this.element.nativeElement.classList.add("is-invalid");
        } else {
            this.element.nativeElement.classList.remove("is-invalid");
        }
    }

    @HostListener("keyup")
    onKeyPress() {
        if (!this.hasTyped) this.hasTyped = true;
        if (this.control.touched || this.hasChanged) {
            this.validate();
        }
    }

    @HostListener("blur")
    onLostFocus() {
        if (!this.hasFocusedAndLost) this.hasFocusedAndLost = true;
        if (this.hasTyped) this.validate();
    }

    @HostListener("change")
    onChange() {
        if (!this.hasChanged) this.hasChanged = true;
        this.validate();
    }
}
