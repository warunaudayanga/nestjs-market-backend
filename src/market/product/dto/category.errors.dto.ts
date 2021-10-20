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
    CATEGORY_403_CONSTRAINT_PRODUCT: {
        status: 403,
        code: "CATEGORY_403_CONSTRAINT_PRODUCT",
        message: "Cannot delete category. Delete usage in product first!"
    }
};

export { CategoryErrors };
