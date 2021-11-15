import { PaginationInstance } from "ngx-pagination";
import { CSSMeasurement } from "../../../common/interfaces/common.interfaces";

export interface Columns<T, L extends number> extends Array<T> {
    0: T;
    length: L;
}

export interface Option {
    html: string,
    colorClass?: string;
    disabled?: (() => boolean) | boolean;
}

export interface TableData<Entity, cols extends number> {
    pagination: PaginationInstance;
    rowHeight: number
    headers: Columns<string, cols>;
    widths?: Columns<CSSMeasurement | undefined, cols>;
    aligns?: Columns<"left" | "right" | "center" | undefined, cols>;
    keys: Columns<keyof Entity | string, cols>;
    format?: Columns<Function | undefined, cols>;
    dataSource: Entity[];
    option?: {
        width: CSSMeasurement;
        main?: Option;
        common: Columns<Option, 1 | 2 | 3 | 4 | 5>;
    };
}
