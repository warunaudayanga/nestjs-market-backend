import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from "./common/filters/http-exception.filter";
import { LoggerService } from "./common/services/logger.service";
import { AppModule } from "./app.module";
// import * as helmet from "helmet";
import * as cookieParser from "cookie-parser";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,func-style
async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, { logger: new LoggerService() });
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
    app.use(cookieParser());
    // app.use(helmet());
    app.enableCors();
    // app.setViewEngine("");
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.setGlobalPrefix("api");
    await app.listen(process.env.PORT || 8080);
}
// noinspection JSIgnoredPromiseFromCall
bootstrap();
