const returnError = (): boolean => {
    return Number(process.env.RETURN_ERRORS) === 1;
};

export { returnError };
