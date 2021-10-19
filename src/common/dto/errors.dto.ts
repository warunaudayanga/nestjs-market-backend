export interface EntityError {
    status: number,
    code: string,
    message: string
}

export enum Errors {
    E_400_EMPTY_ID = "E_400_EMPTY_ID",
    E_404_ID = "E_404_ID",
    E_409_EXIST = "E_409_EXIST",
    E_500_CREATE = "E_500_CREATE",
    E_500_UPDATE = "E_500_UPDATE",
    E_500_DELETE = "E_500_DELETE",
    E_500_RETRIEVE = "E_500_RETRIEVE",
    ERROR = "ERROR"
}

export class Messages {

    public readonly capName: string;

    public readonly simName: string;

    private errors = {
        E_400_EMPTY_ID: {
            status: 400,
            code: "E_400_EMPTY_ID",
            message: "{{capName}} id cannot be empty!"
        },
        E_404_ID: {
            status: 404,
            code: "E_404_ID",
            message: "Cannot find a {{simName}} with given id!"
        },
        E_409_EXIST: {
            status: 409,
            code: "E_409_EXIST_PATH",
            message: "{{capName}} with given {{simName}} already exist!"
        },
        E_500_CREATE: {
            status: 500,
            code: "E_500_CREATE",
            message: "Error occurred while creating {{simName}}!"
        },
        E_500_UPDATE: {
            status: 500,
            code: "E_500_UPDATE",
            message: "Error occurred while updating {{simName}}!"
        },
        E_500_DELETE: {
            status: 500,
            code: "E_500_DELETE",
            message: "Error occurred while deleting {{simName}}!"
        },
        E_500_RETRIEVE: {
            status: 500,
            code: "E_500_RETRIEVE",
            message: "Error occurred while retrieving {{simName}}(s)!"
        },
        ERROR: {
            status: 500,
            code: "ERROR",
            message: "Internal Server Error!"
        }
    }

    constructor(private entityName: string) {
        this.capName = entityName[0].toUpperCase() + entityName.slice(1);
        this.simName = entityName.toLowerCase();
    }

    public get(key: string): EntityError {
        const tmpError: EntityError = this.errors[key];
        tmpError.message = tmpError.message.replace("{{capName}}", this.capName);
        tmpError.message = tmpError.message.replace("{{simName}}", this.simName);
        return tmpError;
    }
}
