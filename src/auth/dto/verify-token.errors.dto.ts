const VTokenErrors = {

    VTOKEN_400_EMPTY_ID: {
        status: 400,
        code: "USER_400_EMPTY_ID",
        message: "User id cannot be empty!"
    },

    VTOKEN_500_CREATE_TOKEN: {
        status: 500,
        code: "AUTH_500_CREATE_TOKEN",
        message: "Error occurred while creating verify token in!"
    },
    VTOKEN_500_DELETE_TOKEN: {
        status: 500,
        code: "AUTH_500_CREATE_TOKEN",
        message: "Error occurred while deleting verify token in!"
    },
    VTOKEN_500_RETRIEVE: {
        status: 500,
        code: "VTOKEN_500_RETRIEVE",
        message: "Error occurred while retrieving verify token in!"
    },

    ERROR: {
        status: 500,
        code: "ERROR",
        message: "Internal Server Error!"
    }
};

export { VTokenErrors };
