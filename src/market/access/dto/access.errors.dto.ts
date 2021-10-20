const AccessErrors = {
    ACCESS_400_EMPTY_AUTH: {
        status: 400,
        code: "ACCESS_400_EMPTY_AUTH",
        message: "Access auth cannot be empty!"
    },
    ACCESS_400_EMPTY_PATH: {
        status: 400,
        code: "ACCESS_400_EMPTY_PATH",
        message: "Access cannot be empty!"
    },
    ACCESS_400_EMPTY_OPTIONS: {
        status: 400,
        code: "ACCESS_400_EMPTY_OPTIONS",
        message: "Access options cannot be empty!"
    },
    ACCESS_400_INVALID_AUTH: {
        status: 400,
        code: "ACCESS_400_INVALID_AUTH",
        message: "Invalid value for access auth!"
    },
    ACCESS_400_INVALID_PATH: {
        status: 400,
        code: "ACCESS_400_INVALID_PATH",
        message: "Invalid value for access path!"
    },
    ACCESS_400_INVALID_OPTIONS: {
        status: 400,
        code: "ACCESS_400_EMPTY_OPTIONS",
        message: "Invalid value for access options!"
    },
    ACCESS_404_AUTH: {
        status: 404,
        code: "ACCESS_404_AUTH",
        message: "Cannot find a auth with given id!"
    },
    ACCESS_404_PATH: {
        status: 404,
        code: "ACCESS_404_PATH",
        message: "Cannot find a access path with given id!"
    }
};

export { AccessErrors };
