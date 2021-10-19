/* eslint-disable @typescript-eslint/no-var-requires */
import { ServeStaticModule } from "@nestjs/serve-static";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dev, prod } from "./config/ormconfig";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { join } from "path";
import { CommonModule } from "./common/common.module";
import { AuthModule } from "./auth/auth.module";
import { AccessModule } from "./market/access/access.module";
import { UserModule } from "./market/user/user.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "../dist/public")
        }),
        TypeOrmModule.forRoot(process.env.NODE_ENV === "production" ? prod : dev),
        AuthModule,
        CommonModule,
        AccessModule,
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
