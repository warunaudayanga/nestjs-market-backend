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
    PATH_403_CONSTRAINT_ACCESS: {
        status: 403,
        code: "PATH_403_CONSTRAINT_ACCESS",
        message: "Cannot delete path. Delete usage in access first!"
    },
    PATH_409_EXIST_PATH: {
        status: 409,
        code: "PATH_409_EXIST_PATH",
        message: "Path with given path already exist!"
    }
};

export { PathErrors };
