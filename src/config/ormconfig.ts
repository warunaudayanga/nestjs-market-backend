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

// noinspection JSUnusedGlobalSymbols
export const jawsDB: TypeOrmModuleOptions = {
    type: "mysql",
    host: "y5svr1t2r5xudqeq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    username: "vabjdmv9zvtupsig",
    password: "hph42p3squlpt4tv",
    database: "ggmaaa1v7znur9qc",
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: false
};

// mysql://bc20bc43d0a19e:9fea8399@us-cdbr-east-04.cleardb.com/heroku_125faf3373d2fbb?reconnect=true
export const clearDB: TypeOrmModuleOptions = {
    type: "mysql",
    host: "us-cdbr-east-04.cleardb.com",
    port: 3306,
    username: "bc20bc43d0a19e",
    password: "9fea8399",
    database: "heroku_125faf3373d2fbb",
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: false
};

export { clearDB as prod };
