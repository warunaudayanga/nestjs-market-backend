const PurchaseErrors = {
    PURCHASE_400_NOT_EMPTY_ID: {
        status: 400,
        code: "PURCHASE_400_NOT_EMPTY_ID",
        message: "Purchase id cannot be inserted!"
    },
    PURCHASE_400_NOT_EMPTY_CODE: {
        status: 400,
        code: "PURCHASE_400_NOT_EMPTY_CODE",
        message: "Purchase code cannot be inserted!"
    },
    PURCHASE_400_EMPTY_PRODUCT: {
        status: 400,
        code: "PURCHASE_400_EMPTY_PRODUCT",
        message: "Purchase product cannot be empty!"
    },
    PURCHASE_400_EMPTY_PRICE: {
        status: 400,
        code: "PURCHASE_400_EMPTY_PRICE",
        message: "Purchase price cannot be empty!"
    },
    PURCHASE_400_EMPTY_SALE_PRICE: {
        status: 400,
        code: "PURCHASE_400_EMPTY_SALE_PRICE",
        message: "Purchase sale price cannot be empty!"
    },
    PURCHASE_400_EMPTY_QTY: {
        status: 400,
        code: "PURCHASE_400_EMPTY_QTY",
        message: "Purchase qty cannot be empty!"
    },
    PURCHASE_400_EMPTY_SUPPLIER: {
        status: 400,
        code: "PURCHASE_400_EMPTY_SUPPLIER",
        message: "Purchase supplier cannot be empty!"
    },
    PURCHASE_400_EMPTY_DATE: {
        status: 400,
        code: "PURCHASE_400_EMPTY_DATE",
        message: "Purchase date cannot be empty!"
    },
    PURCHASE_400_INVALID_PRODUCT: {
        status: 400,
        code: "PURCHASE_400_INVALID_PRODUCT",
        message: "Invalid value for purchase product!"
    },
    PURCHASE_400_INVALID_SUPPLIER: {
        status: 400,
        code: "PURCHASE_400_INVALID_SUPPLIER",
        message: "Invalid value for purchase supplier!"
    },
    PURCHASE_400_INVALID_DATE: {
        status: 400,
        code: "PURCHASE_400_INVALID_DATE",
        message: "Invalid value for purchase date!"
    },
    PURCHASE_400_INVALID_EXPECT_DATE: {
        status: 400,
        code: "PURCHASE_400_INVALID_EXPECT_DATE",
        message: "Invalid value for purchase expected date!"
    },
    PURCHASE_400_INVALID_PRICE: {
        status: 400,
        code: "PURCHASE_400_INVALID_PRICE",
        message: "Invalid value for purchase price!"
    },
    PURCHASE_400_INVALID_SALE_PRICE: {
        status: 400,
        code: "PURCHASE_400_INVALID_SALE_PRICE",
        message: "Invalid value for purchase sale price!"
    },
    PURCHASE_400_INVALID_QTY: {
        status: 400,
        code: "PURCHASE_400_INVALID_QTY",
        message: "Invalid value for purchase qty!"
    },
    PURCHASE_404_PRODUCT: {
        status: 404,
        code: "PURCHASE_404_PRODUCT",
        message: "Cannot find a product with given id!"
    },
    PURCHASE_404_SUPPLIER: {
        status: 404,
        code: "PURCHASE_404_SUPPLIER",
        message: "Cannot find a supplier with given id!"
    }
};

export { PurchaseErrors };
