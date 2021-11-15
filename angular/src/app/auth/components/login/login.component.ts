import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { environment } from "../../../../environments/environment";
import { AppService } from "../../../app.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent {

    env = environment;

    validators = [Validators.required, Validators.minLength(environment.inputs.min), Validators.maxLength(environment.inputs.max)]

    loginForm = new FormGroup({
        username: new FormControl("000000000V", this.validators),
        password: new FormControl("admin@123", this.validators)
    });

    fileName!: string;

    constructor(
        private app: AppService,
        private authService: AuthService
    ) {
        if (authService.logged) app.load("/dashboard");
    }

    login() {
        if (this.loginForm.valid) {
            this.app.startLoading();
            this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
                .subscribe(authData => {
                    this.app.stopLoading();
                    console.log(authData);
                    this.authService.setLoggedIn(authData);
                }, error => {
                    if (error.error?.code === "AUTH_401_INVALID") {
                        this.app.errorDialog("Invalid username or password!");
                    } else if (error.error?.code === "AUTH_401_NOT_VERIFIED") {
                        this.app.errorDialog("Your account is not verified. Please check your email for the verification link!");
                    } else {
                        AppService.log(error);
                        this.app.errorDialog("Unspecified error occurred while trying to gog in!");
                    }
                });
        } else {
            this.app.errorDialog("Please enter username and password!");
        }
    }

    logout() {
        this.authService.logout();
    }
}
