import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class LoaderService {

    loadingListener: Subject<boolean> = new Subject<boolean>()

    constructor() { }

    startLoading(): void {
        this.loadingListener.next(true);
    }

    stopLoading(): void {
        this.loadingListener.next(false);
    }

    getLoadingListener(): Observable<boolean> {
        return this.loadingListener.asObservable();
    }

}
