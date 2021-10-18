/* eslint-disable @typescript-eslint/no-var-requires */
import { ServeStaticModule } from "@nestjs/serve-static";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { join } from "path";
import { CommonModule } from "./common/common.module";
import { AuthModule } from "./auth/auth.module";
import { dev, prod } from "./config/ormconfig";

@Module({
    imports: [
        ConfigModule.forRoot(),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "../dist/public")
        }),
        TypeOrmModule.forRoot(process.env.NODE_ENV === "production" ? prod : dev),
        CommonModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
