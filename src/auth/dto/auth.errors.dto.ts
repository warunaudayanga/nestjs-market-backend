const AuthErrors = {
    AUTH_400_EMPTY_EMAIL: {
        status: 400,
        code: "AUTH_400_EMPTY_EMAIL",
        message: "User email cannot be empty!"
    },
    AUTH_400_EMPTY_PASSWORD: {
        status: 400,
        code: "AUTH_400_EMPTY_PASSWORD",
        message: "User password cannot be empty!"
    },
    AUTH_400_INVALID_EMAIL: {
        status: 400,
        code: "AUTH_400_INVALID_EMAIL",
        message: "Invalid value for user email!"
    },
    AUTH_400_INVALID_TYPE: {
        status: 400,
        code: "AUTH_400_INVALID_TYPE",
        message: "Invalid value for user type!"
    },
    AUTH_400_INVALID_STATUS_STRING: {
        status: 400,
        code: "AUTH_400_INVALID_STATUS_STRING",
        message: "Invalid value for user status string!"
    },
    AUTH_401_NOT_LOGGED_IN: {
        status: 401,
        code: "AUTH_401_NOT_LOGGED_IN",
        message: "User must be logged in to access this resource!"
    },
    AUTH_401_INVALID: {
        status: 401,
        code: "AUTH_401_INVALID",
        message: "Invalid username or password!"
    },
    AUTH_401_INVALID_TOKEN: {
        status: 401,
        code: "AUTH_401_INVALID_TOKEN",
        message: "Invalid or expired token received!"
    },
    AUTH_401_NOT_VERIFIED: {
        status: 401,
        code: "AUTH_401_NOT_VERIFIED",
        message: "User is not verified!"
    },
    AUTH_401_NOT_ACTIVE: {
        status: 401,
        code: "AUTH_401_NOT_ACTIVE",
        message: "User is not activated!"
    },
    AUTH_403_ROLE_FORBIDDEN: {
        status: 403,
        code: "AUTH_403_ROLE_FORBIDDEN",
        message: "User doesn't have privileges to access this resource!"
    },
    AUTH_404_ID: {
        status: 404,
        code: "AUTH_404_ID",
        message: "Cannot find a user with given id!"
    },
    AUTH_409_EXIST_EMAIL: {
        status: 409,
        code: "AUTH_409_EXIST_EMAIL",
        message: "User with given email already exist!"
    },
    AUTH_417_EMAIL_REJECT: {
        status: 417,
        code: "AUTH_417_EMAIL_REJECT",
        message: "Verification email send failed!"
    },

    AUTH_500_LOGIN: {
        status: 500,
        code: "AUTH_500_LOGIN",
        message: "Error occurred while logging in!"
    },

    AUTH_500_EMAIL_SEND: {
        status: 500,
        code: "AUTH_500_EMAIL_SEND",
        message: "Error occurred while sending verification email!"
    },
    AUTH_500_CREATE: {
        status: 500,
        code: "AUTH_500_CREATE",
        message: "Error occurred while creating user!"
    },
    AUTH_500_UPDATE: {
        status: 500,
        code: "AUTH_500_UPDATE",
        message: "Error occurred while updating user!"
    },
    AUTH_500_ACTIVATE: {
        status: 500,
        code: "AUTH_500_ACTIVATE",
        message: "Error occurred while activating user!"
    },
    AUTH_500_DEACTIVATE: {
        status: 500,
        code: "AUTH_500_DEACTIVATE",
        message: "Error occurred while deactivating user!"
    },
    AUTH_500_DELETE: {
        status: 500,
        code: "AUTH_500_DELETE",
        message: "Error occurred while deleting user!"
    },
    AUTH_500_RECOVER: {
        status: 500,
        code: "AUTH_500_RECOVER",
        message: "Error occurred while recovering user!"
    },
    AUTH_500_RETRIEVE: {
        status: 500,
        code: "AUTH_500_RETRIEVE",
        message: "Error occurred while retrieving user(s)!"
    },

    ERROR: {
        status: 500,
        code: "ERROR",
        message: "Internal Server Error!"
    }
};

export { AuthErrors };
