// noinspection JSUnusedGlobalSymbols

import * as entityEnums from "../../common/entity/entity.enums";

export enum AuthType {
    ADMIN = "Admin",
    STANDARD = "Standard",
}

export enum AuthStatusString {
    PENDING = "Pending",
    DELETED = "Deleted",
}

export type StatusString = entityEnums.StatusString | AuthStatusString;

export const StatusString = { ...entityEnums.StatusString, ...AuthStatusString };
