import { EventEmitter, Injectable, Type } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { UserEntity } from "./auth/auth.interfaces";
import { ToastrService } from "ngx-toastr";
import { DialogService } from "./modules/dialog/dialog.service";
import { DialogButtons, FormControlData, PromptResponse } from "./modules/dialog/interfaces/dialog.interfaces";
import { AbstractControl } from "@angular/forms";
import { LoaderService } from "./modules/loader/loader.service";
import { CSSMeasurement } from "./common/interfaces/common.interfaces";

@Injectable({
    providedIn: "root"
})
export class AppService {

    private readonly _width: number;

    private readonly _height: number;

    private _user: UserEntity | null = null;

    constructor(private router: Router, private dialog: DialogService, public toast: ToastrService, private loader: LoaderService) {
        this._width = window.innerWidth;
        this._height = window.innerHeight;
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    get user(): UserEntity | null {
        return this._user;
    }

    set user(value: UserEntity | null) {
        this._user = value;
    }

    public load(path: string, params?: {}): void {
        if (params) {
            this.router.navigate([path], { queryParams: params }).then();
        } else {
            this.router.navigateByUrl(path).then();
        }
    }

    public success(message: string) {
        this.toast.success(message);
    }

    public info(message: string) {
        this.toast.info(message);
    }

    public error(message: string) {
        this.toast.error(message);
    }

    public warning(message: string) {
        this.toast.warning(message);
    }

    public viewDialog<Entity>(title: string, Component: Type<any>, entity: Entity, width?: CSSMeasurement): Observable<boolean> {
        return this.dialog.view<Entity>(title, Component, entity, width);
    }

    public infoDialog(message: string, confirm?: boolean): Observable<boolean> {
        return this.dialog.info(message, confirm);
    }

    // noinspection JSUnusedGlobalSymbols
    public successDialog(message: string, confirm?: boolean): Observable<boolean> {
        return this.dialog.success(message, confirm);
    }

    // noinspection JSUnusedGlobalSymbols
    public warningDialog(message: string, confirm?: boolean): Observable<boolean> {
        return this.dialog.warning(message, confirm);
    }

    public errorDialog(message: string, confirm?: boolean): Observable<boolean> {
        return this.dialog.error(message, confirm);
    }

    public prompt(
        title: string, message: string, formData: FormControlData[], buttons?: DialogButtons,
        eh?: ((values: { [k: string]: string }, controls: { [k: string]: AbstractControl }) => boolean) | boolean, wait?: boolean
    ): EventEmitter<PromptResponse> {
        return this.dialog.prompt({ title, message, formData, buttons, wait });
    }

    public startLoading() {
        this.loader.startLoading();
    }

    public stopLoading() {
        this.loader.stopLoading();
    }

    public static log(data: any): void {
        console.log(data);
    }

}
