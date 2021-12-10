import { Injectable } from "@nestjs/common";
import { Auth } from "../../auth/entities/auth.entity";
import { Observable, Subject } from "rxjs";

@Injectable()
export class ExchangeService {

    authListener: Subject<Auth> = new Subject<Auth>()

    exchangeAuth(auth: Auth): void {
        this.authListener.next(auth);
    }

    onAuthExchange(): Observable<Auth> {
        return this.authListener.asObservable();
    }

}
