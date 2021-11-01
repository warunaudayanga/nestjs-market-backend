import { paginate } from "../entity/entity.methods";

export class GetAllDto {

    page: number;

    limit: number;

    eager?: boolean;

    constructor(getAllDto: GetAllDto) {
        this.page = getAllDto.page;
        this.limit = getAllDto.limit;
        this.eager = getAllDto.eager;
    }

    getOptions(): { loadRelationIds: boolean, skip: number, take: number} {
        return { loadRelationIds: !this.eager, ...paginate({ page: this.page, limit: this.limit }) };
    }

}
