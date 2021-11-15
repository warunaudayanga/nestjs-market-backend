const arrayAndItems = (arr: any[], ...items: any[]): any[] => {
    const newArr = [...arr];
    items.forEach(item => {
        newArr.push(item);
    });
    return newArr;
};

const toFirstCase = (str: string): string => {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

const mapDates = (entity: {[key: string]: any}): void => {
    Object.keys(entity).forEach(key => {
        if (typeof entity[key] === "object" && !Array.isArray(entity[key])) {
            if (entity[key]) mapDates(entity[key]);
        } else if (String(entity[key]).match(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/)) {
            entity[key] = new Date(entity[key]);
        }
    });
};

const getDimensions = (element: HTMLElement): { width: number; height: number } => {
    const computedStyle = getComputedStyle(element);
    let height = element.clientHeight; // height with padding
    let width = element.clientWidth; // width with padding
    height -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
    width -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
    return { width, height };
};

export { arrayAndItems, toFirstCase, mapDates, getDimensions };
