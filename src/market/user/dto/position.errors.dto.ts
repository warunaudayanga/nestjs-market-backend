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
    POSITION_409_EXIST_NAME: {
        status: 409,
        code: "POSITION_409_EXIST_PATH",
        message: "Position with given name already exist!"
    }
};

export { PositionErrors };
