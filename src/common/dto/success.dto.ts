export class SuccessDto {

    constructor(message?: string) {
        this.status = true;
        this.message = message || "success";
    }

    status: boolean;

    message: string;
}
