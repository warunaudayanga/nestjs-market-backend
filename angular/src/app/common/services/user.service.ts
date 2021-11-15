import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { UserEntity } from "../../auth/auth.interfaces";

@Injectable({
    providedIn: "root"
})
export class UserService {

    private apiUserUrl = environment.apiUrl + "/user";

    constructor(private http: HttpClient) { }

    // noinspection JSUnusedGlobalSymbols
    public getUsers(): Observable<UserEntity[]> {
        return this.http.get<UserEntity[]>(this.apiUserUrl + "/getAll");
    }

    public getUserByUUID(uuid: string): Observable<UserEntity> {
        return this.http.get<UserEntity>(this.apiUserUrl + `/getByUUID/${uuid}`);
    }
}

