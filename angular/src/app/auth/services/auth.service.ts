import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { RegisterData, AuthData, UserEntity, SessionData } from "../auth.interfaces";
import { Observable, Subject, Subscription, timer } from "rxjs";
import { AppService } from "../../app.service";
import { SuccessResponse } from "../../common/interfaces/common.interfaces";

@Injectable({
    providedIn: "root"
})
export class AuthService {

    private apiAuthUrl = environment.apiUrl + "/auth";

    private _logged: boolean = false;

    private _loggedUser: UserEntity | null = null;

    private _token: string | null = null;

    private authTimerSubscription!: Subscription

    private loggedListener: Subject<boolean> = new Subject<boolean>();

    constructor(private http: HttpClient, private app: AppService) {}

    // noinspection JSUnusedGlobalSymbols
    get loggedUser(): UserEntity | null {
        return this._loggedUser;
    }

    set loggedUser(user: UserEntity | null) {
        this._loggedUser = user;
    }

    get token(): string | null {
        return this._token;
    }

    set token(token: string | null) {
        this._token = token;
    }

    set logged(logged: boolean) {
        this._logged = logged;
        this.loggedListener.next(logged);
    }

    get logged(): boolean {
        return this._logged;
    }

    public getLoggedListener(): Observable<boolean> {
        return this.loggedListener.asObservable();
    }

    private setAuthTimer(duration: number): void {
        this.authTimerSubscription = timer( duration * 1000)
            .subscribe(() => {
                this.logout();
            });
    }

    private clearAuthTimer(): void {
        if (this.authTimerSubscription) {
            this.authTimerSubscription.unsubscribe();
        }
    }

    private static setSession(authData: AuthData): void {
        const now: Date = new Date();
        localStorage.setItem("token", authData.token);
        localStorage.setItem("user", JSON.stringify(authData.user));
        // eslint-disable-next-line no-extra-parens
        localStorage.setItem("expiration", now.setTime(now.getTime() + (authData.expiresIn * 1000)).toString());
    }

    public static getSession(): SessionData | null {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        const expiration = localStorage.getItem("expiration");
        if (token && userData && expiration) {
            return { token, user: JSON.parse(userData), expirationDate: new Date(Number(expiration)) };
        }
        return null;
    }

    private static clearSession(): void {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("expiration");
    }

    autoAuth() {
        const session: SessionData | null = AuthService.getSession();
        if (!session) return;
        // getting expiration time from localStorage for automatically login if still valid
        const expiresIn = session.expirationDate.getTime() - new Date().getTime();
        if (expiresIn > 0) {
            this.token = session.token;
            this.loggedUser = session.user;
            this.app.user = session.user;
            this.setAuthTimer(expiresIn / 1000);
            this.logged = true;
            this.loggedListener.next(true);
        }
    }

    public setLoggedIn(authData: AuthData): void {
        this.setAuthTimer(authData.expiresIn);
        AuthService.setSession(authData);
        this.token = authData.token;
        this.loggedUser = authData.user;
        this.app.user = authData.user;
        this.logged = true;
        this.loggedListener.next(true);
        this.onLoggedIn();
    }

    public logout(): void {
        this.loggedUser = null;
        this.app.user = null;
        this.token = null;
        this.logged = false;
        this.clearAuthTimer();
        AuthService.clearSession();
        this.loggedListener.next(false);
        this.onLoggedOut();
    }

    private onLoggedIn(): void {
        this.app.load("/");
    }

    private onLoggedOut(): void {
        this.app.load("auth");
    }

    public login(username: string, password: string): Observable<AuthData> {
        return this.http.post<AuthData>(this.apiAuthUrl + "/authenticate", { username, password });
    }

    register(formData: RegisterData ): Observable<SuccessResponse> {
        return this.http.post<SuccessResponse>(this.apiAuthUrl + "/register", formData);
    }
}
