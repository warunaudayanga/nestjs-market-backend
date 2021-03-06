import { paginate } from "../entity/entity.methods";

export class GetAllDto {

    page?: number;

    limit?: number;

    eager?: "true" | "false";

    sort?: string;

    desc?: "true" | "false";

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
            order[this.sort] = this.desc === "true" ? "DESC" : "ASC";
        }
        return { loadRelationIds: this.eager !== "true", order, ...paginate({ page: this.page, limit: this.limit }) };
    }

}
