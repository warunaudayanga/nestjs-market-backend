import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Auth } from "../entities/auth.entity";

export const UserAuth = createParamDecorator((data: unknown, ctx: ExecutionContext): Auth => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.auth as Auth;
});
