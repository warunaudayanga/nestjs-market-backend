import { EntityError } from "./entity.interfaces";
import { applyName } from "./entity.methods";

export enum Err {
    // noinspection JSUnusedGlobalSymbols
    E_400_EMPTY_ID = "E_400_EMPTY_ID",
    E_404_K = "E_404_K",
    E_404_ID = "E_404_ID",
    E_404_CONDITION = "E_404_CONDITION",
    E_405 = "E_405",
    E_409_EXIST = "E_409_EXIST",
    E_500_CREATE = "E_500_CREATE",
    E_500_UPDATE = "E_500_UPDATE",
    E_500_DELETE = "E_500_DELETE",
    E_500_RETRIEVE = "E_500_RETRIEVE",
    ERROR = "ERROR"
}

export class Errors {

    errors = {
        E_400_EMPTY_ID: {
            status: 400,
            code: "{{upperCase}}_400_EMPTY_ID",
            message: "{{firstCase}} id cannot be empty!"
        },
        E_404_K: {
            status: 404,
            code: "{{upperCase}}_404_{{upperConflict}}",
            message: "Cannot find a {{lowerCase}} with given {{conflict}}!"
        },
        E_404_ID: {
            status: 404,
            code: "{{upperCase}}_404_ID",
            message: "Cannot find a {{lowerCase}} with given id!"
        },
        E_404_CONDITION: {
            status: 404,
            code: "{{upperCase}}_404_CONDITION",
            message: "Cannot find a {{lowerCase}}(s) with given condition!"
        },
        E_405: {
            status: 404,
            code: "{{upperCase}}_405",
            message: "This method is not allowed!"
        },
        E_409_EXIST: {
            status: 409,
            code: "{{upperCase}}_409_EXIST_PATH",
            message: "{{firstCase}} with given {{conflict}} already exist!"
        },
        E_500_CREATE: {
            status: 500,
            code: "{{upperCase}}_500_CREATE",
            message: "Error occurred while creating {{lowerCase}}!"
        },
        E_500_UPDATE: {
            status: 500,
            code: "{{upperCase}}_500_UPDATE",
            message: "Error occurred while updating {{lowerCase}}!"
        },
        E_500_DELETE: {
            status: 500,
            code: "{{upperCase}}_500_DELETE",
            message: "Error occurred while deleting {{lowerCase}}!"
        },
        E_500_RETRIEVE: {
            status: 500,
            code: "{{upperCase}}_500_RETRIEVE",
            message: "Error occurred while retrieving {{lowerCase}}(s)!"
        },
        ERROR: {
            status: 500,
            code: "ERROR",
            message: "Internal Server Error!"
        }
    };

    constructor(private entityData: string[]) { }

    public get(key: string): EntityError {
        const error: EntityError = this.errors[key];
        error.code = applyName(error.code, this.entityData);
        error.message = applyName(error.message, this.entityData);
        return error;
    }
}
