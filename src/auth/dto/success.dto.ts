export class SuccessDto {

    constructor() {
        this.status = true;
        this.message = "success";
    }

    status: boolean;

    message: string;
}
