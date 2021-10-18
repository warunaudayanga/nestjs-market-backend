import { CustomDecorator, SetMetadata } from "@nestjs/common";
import { AuthType } from "../enums/auth.enums";

export const ROLES_KEY = "roles";
export const Roles = (...roles: AuthType[]): CustomDecorator => SetMetadata(ROLES_KEY, roles);
