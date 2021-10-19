const CategoryErrors = {
    CATEGORY_400_EMPTY_ID: {
        status: 400,
        code: "CATEGORY_400_EMPTY_ID",
        message: "Category id cannot be empty!"
    },
    CATEGORY_400_EMPTY_NAME: {
        status: 400,
        code: "CATEGORY_400_EMPTY_NAME",
        message: "Category name cannot be empty!"
    },
    CATEGORY_401_NOT_ACTIVE: {
        status: 401,
        code: "CATEGORY_401_NOT_ACTIVE",
        message: "Category is not activated!"
    },
    CATEGORY_404_ID: {
        status: 404,
        code: "CATEGORY_404_ID",
        message: "Cannot find a category with given id!"
    },
    CATEGORY_409_EXIST_NAME: {
        status: 409,
        code: "CATEGORY_409_EXIST_NAME",
        message: "Category with given name already exist!"
    },

    CATEGORY_500_CREATE: {
        status: 500,
        code: "CATEGORY_500_CREATE",
        message: "Error occurred while creating category!"
    },
    CATEGORY_500_UPDATE: {
        status: 500,
        code: "CATEGORY_500_UPDATE",
        message: "Error occurred while updating category!"
    },
    CATEGORY_500_DELETE: {
        status: 500,
        code: "CATEGORY_500_DELETE",
        message: "Error occurred while deleting category!"
    },
    CATEGORY_500_RETRIEVE: {
        status: 500,
        code: "CATEGORY_500_RETRIEVE",
        message: "Error occurred while retrieving category(s)!"
    },

    ERROR: {
        status: 500,
        code: "ERROR",
        message: "Internal Server Error!"
    }
};

export { CategoryErrors };
