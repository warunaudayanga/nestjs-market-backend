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
    host: "y5svr1t2r5xudqeq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    username: "vabjdmv9zvtupsig",
    password: "hph42p3squlpt4tv",
    database: "ggmaaa1v7znur9qc",
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: false
};
