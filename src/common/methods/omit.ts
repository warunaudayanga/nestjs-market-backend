export const omit = (obj): void => {
    Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key]);
};
