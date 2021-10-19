const PathErrors = {
    PATH_400_EMPTY_ID: {
        status: 400,
        code: "PATH_400_EMPTY_ID",
        message: "Path id cannot be empty!"
    },
    PATH_400_EMPTY_NAME: {
        status: 400,
        code: "PATH_400_EMPTY_NAME",
        message: "Path name cannot be empty!"
    },
    PATH_400_EMPTY_PATH: {
        status: 400,
        code: "PATH_400_EMPTY_PATH",
        message: "Path cannot be empty!"
    },
    PATH_401_NOT_ACTIVE: {
        status: 401,
        code: "PATH_401_NOT_ACTIVE",
        message: "Path is not activated!"
    },
    PATH_404_ID: {
        status: 404,
        code: "PATH_404_ID",
        message: "Cannot find a path with given id!"
    },
    PATH_409_EXIST_PATH: {
        status: 409,
        code: "PATH_409_EXIST_PATH",
        message: "Path with given path already exist!"
    },

    PATH_500_CREATE: {
        status: 500,
        code: "PATH_500_CREATE",
        message: "Error occurred while creating path!"
    },
    PATH_500_UPDATE: {
        status: 500,
        code: "PATH_500_UPDATE",
        message: "Error occurred while updating path!"
    },
    PATH_500_DELETE: {
        status: 500,
        code: "PATH_500_DELETE",
        message: "Error occurred while deleting path!"
    },
    PATH_500_RETRIEVE: {
        status: 500,
        code: "PATH_500_RETRIEVE",
        message: "Error occurred while retrieving path(s)!"
    },

    ERROR: {
        status: 500,
        code: "ERROR",
        message: "Internal Server Error!"
    }
};

export { PathErrors };
