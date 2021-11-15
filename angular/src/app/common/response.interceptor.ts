import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { mapDates } from "./common.methods";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(tap(event => {
            if (event instanceof HttpResponse) {
                if (event.body) mapDates(event.body as {});
            }
            return event;
        }));
    }
}
