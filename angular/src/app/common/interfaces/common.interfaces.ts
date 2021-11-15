export interface UserInfo {
    id: string,
    firstName: string,
    lastName: string
}

export interface Entity {
    id: string;
    status: boolean;
    statusString: string;
    createdAt: Date;
    createdBy: UserInfo;
    updatedAt: Date | null;
    updatedBy: UserInfo | null;
}

export interface Address {
    line1: string;
    line2?: string;
    city?: string;
    district?: string;
}

export interface SuccessResponse {
    status: boolean;
    message: string;
}

export interface ErrorResponse {
    ok: boolean;
    name: string;
    status: number
    statusText: string;
    message: string;
    url: string;
    error: {
        status: number,
        code: string,
        message: string,
        iteration?: number;
    };
    headers: {
        normalizedNames: {};
        lazyUpdate: null
    };
}

export interface GetAllResponse<T> {
    entities: T[];
    total: number;
    page: number;
    limit: number;
}

export interface IObject {
    [ke: string]: IObject | any
}

export type CSSLength =`${number}${"px"|"rem"|"em"|"%"}` | "auto";

export type CSSCalculation = `calc(${CSSLength} ${"+" | "-" | "*" | "/"} ${CSSLength})`;

export type CSSMeasurement = CSSLength | CSSCalculation;
