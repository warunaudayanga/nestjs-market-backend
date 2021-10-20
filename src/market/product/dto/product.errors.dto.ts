const ProductErrors = {
    PRODUCT_400_EMPTY_ID: {
        status: 400,
        code: "PRODUCT_400_EMPTY_ID",
        message: "Product id cannot be empty!"
    },
    PRODUCT_400_NOT_EMPTY_CODE: {
        status: 400,
        code: "PRODUCT_400_NOT_EMPTY_CODE",
        message: "Product code cannot be inserted!"
    },
    PRODUCT_400_EMPTY_NAME: {
        status: 400,
        code: "PRODUCT_400_EMPTY_NAME",
        message: "Product name cannot be empty!"
    },
    PRODUCT_400_EMPTY_CATEGORY: {
        status: 400,
        code: "PRODUCT_400_EMPTY_CATEGORY",
        message: "Product category cannot be empty!"
    },
    PRODUCT_400_EMPTY_UNIT: {
        status: 400,
        code: "PRODUCT_400_EMPTY_UNIT",
        message: "Product unit cannot be empty!"
    },
    PRODUCT_400_INVALID_CATEGORY: {
        status: 400,
        code: "PRODUCT_400_INVALID_CATEGORY",
        message: "Invalid value for product category!"
    },
    PRODUCT_400_INVALID_UNIT: {
        status: 400,
        code: "PRODUCT_400_INVALID_CATEGORY",
        message: "Invalid value for product unit!"
    },
    PRODUCT_404_CATEGORY: {
        status: 400,
        code: "PRODUCT_404_CATEGORY",
        message: "Cannot find a product category with given id!"
    },
    PRODUCT_409_EXIST_CODE: {
        status: 409,
        code: "PRODUCT_409_EXIST_CODE",
        message: "Product with given code already exist!"
    }
};

export { ProductErrors };
