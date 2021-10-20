const StockErrors = {
    STOCK_400_EMPTY_PRODUCT: {
        status: 400,
        code: "STOCK_400_EMPTY_PRODUCT",
        message: "Stock product cannot be empty!"
    },
    STOCK_400_EMPTY_PRICE: {
        status: 400,
        code: "STOCK_400_EMPTY_PRICE",
        message: "Stock price cannot be empty!"
    },
    STOCK_400_EMPTY_QTY: {
        status: 400,
        code: "STOCK_400_EMPTY_QTY",
        message: "Stock qty cannot be empty!"
    },
    STOCK_400_INVALID_PRODUCT: {
        status: 400,
        code: "STOCK_400_INVALID_PRODUCT",
        message: "Invalid value for stock product!"
    },
    STOCK_400_INVALID_PRICE: {
        status: 400,
        code: "STOCK_400_INVALID_PRICE",
        message: "Invalid value for stock price!"
    },
    STOCK_400_INVALID_QTY: {
        status: 400,
        code: "STOCK_400_INVALID_QTY",
        message: "Invalid value for stock qty!"
    },
    STOCK_404_PRODUCT: {
        status: 404,
        code: "STOCK_404_PRODUCT",
        message: "Cannot find a product with given id!"
    },
    STOCK_409_EXIST_PRODUCT_AND_PRICE: {
        status: 409,
        code: "STOCK_409_EXIST_PRODUCT_AND_PRICE",
        message: "Stock item with given product and price already exist!"
    }
};

export { StockErrors };
