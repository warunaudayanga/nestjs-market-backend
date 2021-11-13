import { paginate } from "../entity/entity.methods";

export class GetAllDto {

    page?: number;

    limit?: number;

    eager?: boolean;

    sort?: string;

    direction?: "ASC" | "DESC";

    constructor(getAllDto?: GetAllDto) {
        this.page = getAllDto?.page;
        this.limit = getAllDto?.limit;
        this.eager = getAllDto?.eager;
        this.sort = getAllDto?.sort;
        this.direction = getAllDto?.direction ? getAllDto?.direction : "ASC";
    }

    asOptions(): { loadRelationIds: boolean, order: { [key: string]: "ASC" | "DESC" } | undefined, skip: number, take: number} {
        let order;
        if (this.sort) {
            order = {};
            order[this.sort] = this.direction;
        }
        return { loadRelationIds: !this.eager, order, ...paginate({ page: this.page, limit: this.limit }) };
    }

}
