// import { Injectable } from "@angular/core";
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { AuthService } from "../auth/services/auth.service";
// import { Observable } from "rxjs";
//
// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//
//     constructor(private authService: AuthService) { }
//
//     intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//         const token: string | null = this.authService.token;
//         const authRequest: HttpRequest<unknown> = req.clone({
//             headers: req.headers.set("Authorization", `Bearer ${token}`)
//         });
//         return next.handle(authRequest);
//     }
//
//     intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//         return next.handle(req).map(event => {
//             if (event instanceof HttpResponse && shouldBeIntercepted(event)) {
//                 event = event.clone({ body: resolveReferences(event.body) });
//             }
//             return event;
//         });
//     }
// }
