const SaleErrors = {
    SALE_400_NOT_EMPTY_ID: {
        status: 400,
        code: "SALE_400_NOT_EMPTY_ID",
        message: "Sale id cannot be inserted!"
    },
    SALE_400_NOT_EMPTY_CODE: {
        status: 400,
        code: "SALE_400_NOT_EMPTY_CODE",
        message: "Sale code cannot be inserted!"
    },
    SALE_400_EMPTY_STOCK: {
        status: 400,
        code: "SALE_400_EMPTY_STOCK",
        message: "Sale stock cannot be empty!"
    },
    SALE_400_EMPTY_QTY: {
        status: 400,
        code: "SALE_400_EMPTY_QTY",
        message: "Sale qty cannot be empty!"
    },
    SALE_400_INVALID_STOCK: {
        status: 400,
        code: "SALE_400_INVALID_STOCK",
        message: "Invalid value for sale stock!"
    },
    SALE_400_INVALID_QTY: {
        status: 400,
        code: "SALE_400_INVALID_QTY",
        message: "Invalid value for sale qty!"
    },
    SALE_404_PRODUCT: {
        status: 404,
        code: "SALE_404_PRODUCT",
        message: "Cannot find a product with given id!"
    }
};

export { SaleErrors };
