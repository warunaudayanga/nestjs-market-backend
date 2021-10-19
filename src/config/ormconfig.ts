import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const dev: TypeOrmModuleOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "market-nest",
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true
};

export const prod: TypeOrmModuleOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "market-nest",
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: false
};
