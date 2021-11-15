import { Injectable } from "@angular/core";
import { MatDrawerToggleResult, MatSidenav } from "@angular/material/sidenav";

@Injectable({
    providedIn: "root"
})
export class SidenavService {

    private _sidenav!: MatSidenav

    set sidenav(sidenav: MatSidenav) {
        this._sidenav = sidenav;
    }

    public open(): Promise<MatDrawerToggleResult> {
        return this._sidenav.open();
    }

    public close(): Promise<MatDrawerToggleResult> {
        return this._sidenav.close();
    }

    public toggle(): Promise<MatDrawerToggleResult> {
        return this._sidenav.toggle();
    }
}
