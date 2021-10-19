const PositionErrors = {
    POSITION_400_EMPTY_ID: {
        status: 400,
        code: "POSITION_400_EMPTY_ID",
        message: "Position id cannot be empty!"
    },
    POSITION_400_EMPTY_NAME: {
        status: 400,
        code: "POSITION_400_EMPTY_NAME",
        message: "Position name cannot be empty!"
    },
    POSITION_401_NOT_ACTIVE: {
        status: 401,
        code: "POSITION_401_NOT_ACTIVE",
        message: "Position is not activated!"
    },
    POSITION_404_ID: {
        status: 404,
        code: "POSITION_404_ID",
        message: "Cannot find a position with given id!"
    },
    POSITION_409_EXIST_NAME: {
        status: 409,
        code: "POSITION_409_EXIST_PATH",
        message: "Position with given name already exist!"
    },

    POSITION_500_CREATE: {
        status: 500,
        code: "POSITION_500_CREATE",
        message: "Error occurred while creating position!"
    },
    POSITION_500_UPDATE: {
        status: 500,
        code: "POSITION_500_UPDATE",
        message: "Error occurred while updating position!"
    },
    POSITION_500_DELETE: {
        status: 500,
        code: "POSITION_500_DELETE",
        message: "Error occurred while deleting position!"
    },
    POSITION_500_RETRIEVE: {
        status: 500,
        code: "POSITION_500_RETRIEVE",
        message: "Error occurred while retrieving position(s)!"
    },

    ERROR: {
        status: 500,
        code: "ERROR",
        message: "Internal Server Error!"
    }
};

export { PositionErrors };
