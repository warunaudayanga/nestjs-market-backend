import { Component } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PositionService } from "../../../market/services/position.service";
import { PositionEntity } from "../../auth.interfaces";
import { AppService } from "../../../app.service";
import { arrayAndItems } from "../../../common/common.methods";
import { AuthService } from "../../services/auth.service";
import { ErrorResponse } from "../../../common/interfaces/common.interfaces";


@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"]
})
export class RegisterComponent {

    env = environment;

    validators = [Validators.required, Validators.minLength(environment.inputs.min), Validators.maxLength(environment.inputs.max)]

    registerForm!: FormGroup;

    positions: PositionEntity[] | undefined;

    constructor(private app: AppService, private fb: FormBuilder, private positionService: PositionService, private authService: AuthService) {
        this.getPositions();
        this.buildForm();
    }

    buildForm() {
        this.registerForm = this.fb.group({
            firstName: ["Waruna", this.validators],
            lastName: ["Udayanga", this.validators],
            email: ["wwaxis@gmail.com", arrayAndItems(this.validators, Validators.email)],
            password: ["appuhami", this.validators],
            confirm: ["appuhami", this.validators],
            gender: ["Male"],
            position: [""],
            nic: ["950803673V", [Validators.minLength(10), Validators.maxLength(12)]],
            dob: ["1995-03-20", this.validators],
            phone: ["0756446377", [Validators.minLength(10), Validators.maxLength(10)]],
            address: this.fb.group({
                line1: ["Galkaduwa", this.validators],
                line2: ["Mirissa North", [Validators.minLength(environment.inputs.min), Validators.maxLength(environment.inputs.max)]],
                city: ["Mirissa", [Validators.minLength(environment.inputs.min), Validators.maxLength(environment.inputs.max)]],
                district: ["Matara", [Validators.minLength(environment.inputs.min), Validators.maxLength(environment.inputs.max)]]
            })
        });
    }

    getPositions() {
        this.positionService.getAll()
            .subscribe(response => {
                this.positions = [...response.entities];
                this.registerForm.controls.position.setValue(response.entities?.[0]?.id);
            });
    }

    register(): void {
        console.log(this.registerForm);
        if (this.registerForm.valid) {
            if (this.registerForm.value.password !== this.registerForm.value.confirm) {
                this.app.errorDialog("Password does not match!");
                return;
            }
            this.authService.register(this.registerForm.value)
                .subscribe(res => {
                    if (res.status) {
                        this.app.infoDialog(res.message)
                            .subscribe(() => {
                                this.app.load("/");
                            });
                    } else {
                        this.app.toast.error(res.message);
                    }
                }, (error: ErrorResponse) => {
                    console.log(error);
                    this.app.toast.error(error.error.message);
                });
        }
    }

}

