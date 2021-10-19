export const omit = (obj, keys?: string[]): void => {
    Object.keys(obj).forEach(key => {
        return (obj[key] === undefined || keys?.includes(key)) && delete obj[key];
    });
};
