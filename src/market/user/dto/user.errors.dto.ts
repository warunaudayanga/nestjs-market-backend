const UserErrors = {

    USER_400_EMPTY_ID: {
        status: 400,
        code: "USER_400_EMPTY_ID",
        message: "User id cannot be empty!"
    },
    USER_400_EMPTY_FIRST_NAME: {
        status: 400,
        code: "USER_400_EMPTY_FIRST_NAME",
        message: "User first name cannot be empty!"
    },
    USER_400_EMPTY_LAST_NAME: {
        status: 400,
        code: "USER_400_EMPTY_LAST_NAME",
        message: "User last name cannot be empty!"
    },
    USER_400_EMPTY_NIC: {
        status: 400,
        code: "USER_400_EMPTY_NIC",
        message: "User nic cannot be empty!"
    },
    USER_400_EMPTY_POSITION: {
        status: 400,
        code: "USER_400_EMPTY_POSITION",
        message: "User position cannot be empty!"
    },
    USER_400_INVALID_GENDER: {
        status: 400,
        code: "USER_400_INVALID_GENDER",
        message: "Invalid value for user gender!"
    },
    USER_400_INVALID_POSITION: {
        status: 400,
        code: "USER_400_INVALID_POSITION",
        message: "Invalid value for user position!"
    },
    USER_400_INVALID_NIC: {
        status: 400,
        code: "USER_400_INVALID_NIC",
        message: "Invalid value for user nic!"
    },
    USER_400_INVALID_PROFILE_IMAGE: {
        status: 400,
        code: "USER_400_INVALID_PROFILE_IMAGE",
        message: "Invalid value for user profile image, must be a url!"
    },
    USER_400_INVALID_DOB: {
        status: 400,
        code: "USER_400_INVALID_DOB",
        message: "Invalid value for user dob!"
    },
    USER_400_INVALID_PHONE: {
        status: 400,
        code: "USER_400_INVALID_PHONE",
        message: "Invalid value for user phone!"
    },
    USER_400_INVALID_USER_REFERRED: {
        status: 400,
        code: "USER_400_INVALID_USER_REFERRED",
        message: "Invalid value for user referred string!"
    },

    USER_404_ID: {
        status: 404,
        code: "USER_404_ID",
        message: "Cannot find a user with given id!"
    },
    USER_404_REFERRED_ID: {
        status: 404,
        code: "USER_404_REFERRED_ID",
        message: "Cannot find a user with given referred user id!"
    },
    USER_409_EXIST_NIC: {
        status: 409,
        code: "USER_409_EXIST_NIC",
        message: "User with given path nic exist!"
    },
    USER_500_CREATE: {
        status: 500,
        code: "USER_500_CREATE",
        message: "Error occurred while creating user!"
    },
    USER_500_UPDATE: {
        status: 500,
        code: "USER_500_UPDATE",
        message: "Error occurred while updating user!"
    },
    USER_500_RETRIEVE: {
        status: 500,
        code: "USER_500_RETRIEVE",
        message: "Error occurred while retrieving user!"
    },
    USER_500_DELETE: {
        status: 500,
        code: "USER_500_DELETE",
        message: "Error occurred while deleting user!"
    },

    ERROR: {
        status: 500,
        code: "ERROR",
        message: "Internal Server Error!"
    }
};

export { UserErrors };
