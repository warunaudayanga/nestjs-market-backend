import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { AuthType } from "../enums/auth.enums";
import { AuthErrors } from "../dto/auth.errors.dto";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<AuthType[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        if (requiredRoles.some((role) => user.type === role)) {
            return true;
        }
        throw new HttpException(AuthErrors.AUTH_403_ROLE_FORBIDDEN, HttpStatus.FORBIDDEN);
    }
}
