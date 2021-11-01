import { GetAllDto } from "../dto/getAllDto";

const omit = (obj, keys?: string[]): void => {
    if (obj) {
        Object.keys(obj).forEach(key => {
            return (obj[key] === undefined || keys?.includes(key)) && delete obj[key];
        });
    }
};

const toFirstCase = (str: string): string => {
    // entityName = entityName.toLowerCase();
    return str[0].toUpperCase() + str.slice(1);
};

const applyName = (str: string, entityData: string[]): string => {
    const name = entityData[0];
    const conflict = entityData[1];
    return str
        .replace("{{upperCase}}", name.toUpperCase())
        .replace("{{firstCase}}", toFirstCase(name))
        .replace("{{lowerCase}}", name.toLowerCase())
        .replace("{{conflict}}", conflict ? conflict.toLowerCase() : "unique field")
        .replace("{{upperConflict}}", conflict ? conflict.toUpperCase() : "UNIQUE");
};

const toNumber = (n: number | string): number => {
    return !isNaN(Number(n)) ? Number(n) : undefined;
};

const paginate = (getAllDto?: Partial<GetAllDto>): { skip: number, take: number } => {
    const page = toNumber(getAllDto?.page);
    const limit = toNumber(getAllDto?.limit);
    const skip = page && limit ? (page - 1) * limit : undefined;
    const take = page && limit ? limit : undefined;
    return { skip, take };
};

export { omit, toFirstCase, applyName, paginate, toNumber };
