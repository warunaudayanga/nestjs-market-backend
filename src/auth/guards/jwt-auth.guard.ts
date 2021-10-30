import { ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { AuthErrors } from "../dto/auth.errors.dto";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        return super.canActivate(context);
    }

    // noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
    handleRequest(err, user, info): any { // eslint-disable-line @typescript-eslint/no-unused-vars
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            throw err || new HttpException(AuthErrors.AUTH_401_NOT_LOGGED_IN, HttpStatus.UNAUTHORIZED);
        }
        return { auth: {
            id: user.auth.id,
            email: user.auth.email,
            nic: user.auth.nic,
            type: user.auth.type,
            verified: user.auth.verified,
            status: user.auth.status,
            statusString: user.auth.statusString
        } };
    }
}
