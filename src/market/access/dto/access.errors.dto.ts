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
    ACCESS_401_NOT_ACTIVE: {
        status: 401,
        code: "ACCESS_401_NOT_ACTIVE",
        message: "Access is not activated!"
    },

    ACCESS_404_ID: {
        status: 404,
        code: "ACCESS_404_ID",
        message: "Cannot find a access with given id!"
    },
    ACCESS_404_PATH: {
        status: 404,
        code: "ACCESS_404_PATH",
        message: "Cannot find a access path with given id!"
    },

    ACCESS_500_CREATE: {
        status: 500,
        code: "ACCESS_500_CREATE",
        message: "Error occurred while creating access!"
    },
    ACCESS_500_UPDATE: {
        status: 500,
        code: "ACCESS_500_UPDATE",
        message: "Error occurred while updating access!"
    },
    ACCESS_500_DELETE: {
        status: 500,
        code: "ACCESS_500_DELETE",
        message: "Error occurred while deleting access!"
    },
    ACCESS_500_RETRIEVE: {
        status: 500,
        code: "ACCESS_500_RETRIEVE",
        message: "Error occurred while retrieving access(es)!"
    },

    ERROR: {
        status: 500,
        code: "ERROR",
        message: "Internal Server Error!"
    }
};

export { AccessErrors };
