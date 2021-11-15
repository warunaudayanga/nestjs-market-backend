import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = this.authService.token;
        if (token) {
            const authRequest: HttpRequest<unknown> = req.clone({
                headers: req.headers.set("Authorization", `${token}`)
            });
            return next.handle(authRequest);
        }
        return next.handle(req.clone());
    }
}
