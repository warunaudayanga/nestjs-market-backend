import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Position, PositionEntity } from "../../auth/auth.interfaces";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { GetAllResponse, SuccessResponse } from "../../common/interfaces/common.interfaces";

@Injectable({
    providedIn: "root"
})
export class PositionService {

    private apiUrl = environment.apiUrl + "/user/position";

    constructor(private http: HttpClient) { }

    create(position: Position) {
        return this.http.post<PositionEntity>(`${this.apiUrl}/create`, position );
    }

    update(id: string, position: Partial<Position>): Observable<SuccessResponse> {
        return this.http.patch<SuccessResponse>(`${this.apiUrl}/update?id=${id}`, position );
    }

    activate(id: string): Observable<SuccessResponse> {
        return this.http.patch<SuccessResponse>(`${this.apiUrl}/activate?id=${id}`, {});
    }

    deactivate(id: string): Observable<SuccessResponse> {
        return this.http.patch<SuccessResponse>(`${this.apiUrl}/deactivate?id=${id}`, {});
    }

    get(id: string): Observable<PositionEntity> {
        return this.http.get<PositionEntity>(`${this.apiUrl}/get?id=${id}`);
    }

    getAll(page?: number, limit?: number, sort?: string, desc?: boolean): Observable<GetAllResponse<PositionEntity>> {
        return this.http.get<GetAllResponse<PositionEntity>>(`${this.apiUrl}/getAll?page=${page}&limit=${limit}&sort=${sort}&desc=${desc}`);
    }

    delete(id: string): Observable<SuccessResponse> {
        return this.http.delete<SuccessResponse>(`${this.apiUrl}/delete?id=${id}`);
    }
}
