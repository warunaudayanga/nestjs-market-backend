export interface EntityError {
    status: number,
    code: string,
    message: string,
    iteration?: number
}

export interface GetAllResponse<Entity> {
    entities: Entity[];
    total: number;
    page: number;
    limit: number;
}

// noinspection JSUnusedGlobalSymbols
export interface UserInfo {
    id: string,
    firstName: string,
    lastName: string
}
