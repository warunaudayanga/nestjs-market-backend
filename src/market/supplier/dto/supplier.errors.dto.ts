const SupplierErrors = {
    SUPPLIER_400_NOT_EMPTY_CODE: {
        status: 400,
        code: "SUPPLIER_400_NOT_EMPTY_CODE",
        message: "Supplier code cannot be inserted!"
    },
    SUPPLIER_400_EMPTY_NAME: {
        status: 400,
        code: "SUPPLIER_400_EMPTY_NAME",
        message: "Supplier name cannot be empty!"
    },
    SUPPLIER_400_EMPTY_ADDRESS: {
        status: 400,
        code: "SUPPLIER_400_EMPTY_ADDRESS",
        message: "Supplier address cannot be empty!"
    },
    SUPPLIER_400_EMPTY_PHONE: {
        status: 400,
        code: "SUPPLIER_400_EMPTY_PHONE",
        message: "Supplier phone cannot be empty!"
    },
    SUPPLIER_400_INVALID_EMAIL: {
        status: 400,
        code: "SUPPLIER_400_INVALID_EMAIL",
        message: "Invalid value for supplier email!"
    },
    SUPPLIER_400_INVALID_ADDRESS: {
        status: 400,
        code: "SUPPLIER_400_INVALID_ADDRESS",
        message: "Invalid value for supplier address!"
    },
    SUPPLIER_400_INVALID_PHONE: {
        status: 400,
        code: "SUPPLIER_400_INVALID_PHONE",
        message: "Invalid value for supplier phone!"
    },
    SUPPLIER_400_INVALID_MOBILE: {
        status: 400,
        code: "SUPPLIER_400_INVALID_MOBILE",
        message: "Invalid value for supplier mobile!"
    }
};

export { SupplierErrors };
