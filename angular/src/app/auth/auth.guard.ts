import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./services/auth.service";
// import { Role } from "../common/interfaces/user.model"; // TODO
import { AppService } from "../app.service";
import { UserService } from "../common/services/user.service";

// noinspection JSUnusedLocalSymbols
@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {

    constructor(private app: AppService, private auth: AuthService, private userService: UserService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isAuthenticated = this.auth.logged;
        if (!isAuthenticated) {
            this.app.load("/auth");
        }
        return isAuthenticated;
    }

}

