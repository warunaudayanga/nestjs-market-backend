import { paginate } from "../entity/entity.methods";

export class GetAllDto {

    page?: number;

    limit?: number;

    eager?: boolean;

    sort?: string;

    desc?: boolean;

    constructor(getAllDto?: GetAllDto) {
        this.page = getAllDto?.page;
        this.limit = getAllDto?.limit;
        this.eager = getAllDto?.eager;
        this.sort = getAllDto?.sort;
        this.desc = getAllDto?.desc;
    }

    asOptions(): { loadRelationIds: boolean, order: { [key: string]: "ASC" | "DESC" } | undefined, skip: number, take: number} {
        let order;
        if (this.sort) {
            order = {};
            order[this.sort] = this.desc ? "DESC" : "ASC";
        }
        return { loadRelationIds: !this.eager, order, ...paginate({ page: this.page, limit: this.limit }) };
    }

}
