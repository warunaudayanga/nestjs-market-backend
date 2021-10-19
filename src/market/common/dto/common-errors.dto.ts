const CommonErrors = {
    COMMON_400_INVALID_STATUS: {
        status: 400,
        code: "COMMON_400_INVALID_STATUS",
        message: "Invalid value for status!"
    },
    COMMON_400_INVALID_STATUS_STRING: {
        status: 400,
        code: "COMMON_400_INVALID_STATUS_STRING",
        message: "Invalid value for status string!"
    },

    ERROR: {
        status: 500,
        code: "ERROR",
        message: "Internal Server Error!"
    }
};

export { CommonErrors };
