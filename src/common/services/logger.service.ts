/* eslint-disable @typescript-eslint/no-unused-vars */
// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols

import { readFileSync, writeFileSync } from "fs";
import { LoggerService as NestLogger, LogLevel } from "@nestjs/common";
import { Logger, ILogObject } from "tslog";

export class LoggerService implements NestLogger {

    private logger: Logger;

    private static logger: Logger;

    private filename: string;

    private static filename: string;

    constructor() {
        this.logger = new Logger({ displayTypes: false });
        this.filename = process.env.LOG_FILE as string;
        this.attachTransports();
    }

    static staticInitialize(): void {
        this.logger = new Logger({ displayTypes: false });
        this.filename = process.env.LOG_FILE as string;
        this.attachTransports();
    }

    static attachTransports(): void {
        this.logger.attachTransport({
            silly: LoggerService.logToTransport,
            debug: LoggerService.logToTransport,
            trace: LoggerService.logToTransport,
            info: LoggerService.logToTransport,
            warn: LoggerService.logToTransport,
            error: LoggerService.logToTransport,
            fatal: LoggerService.logToTransport
        }, "debug");
    }

    private attachTransports(): void {
        this.logger.attachTransport({
            silly: LoggerService.logToTransport,
            debug: LoggerService.logToTransport,
            trace: LoggerService.logToTransport,
            info: LoggerService.logToTransport,
            warn: LoggerService.logToTransport,
            error: LoggerService.logToTransport,
            fatal: LoggerService.logToTransport
        }, "debug");
    }

    private static logToTransport(logObject: ILogObject): void {
        if (logObject.logLevelId > 2) {

            let logFileArray: Array<any>;
            const filename = process.env.LOG_FILE;

            try {
                logFileArray = JSON.parse(readFileSync(`${filename}.json`).toString());
            } catch (err: any) {
                logFileArray = [];
                writeFileSync(`${filename}.json`, JSON.stringify(logFileArray, null, 2));
            }

            logFileArray.push({ time: new Date().toLocaleString(), logObject });

            if (logFileArray.length > 100) {
                logFileArray.splice(0, logFileArray.length - 100);
            }

            writeFileSync(`${filename}.json`, JSON.stringify(logFileArray, null, 2));
        }
    }

    log(message: any, ...optionalParams: any[]): void {
        this.logger.info(message, ...optionalParams);
    }

    static log(message: any, ...optionalParams: any[]): void {
        this.logger.info(message, ...optionalParams);
    }

    warn(message: any, ...optionalParams: any[]): void {
        this.logger.warn(message, ...optionalParams);
    }

    static warn(message: any, ...optionalParams: any[]): void {
        this.logger.warn(message, ...optionalParams);
    }

    debug?(message: any, ...optionalParams: any[]): void {
        this.logger.debug(message, ...optionalParams);
    }

    static debug?(message: any, ...optionalParams: any[]): void {
        this.logger.debug(message, ...optionalParams);
    }

    verbose?(message: any, ...optionalParams: any[]): void {
        this.logger.trace(message, ...optionalParams);
    }

    static verbose?(message: any, ...optionalParams: any[]): void {
        this.logger.trace(message, ...optionalParams);
    }

    error(message: any, ...optionalParams: any[]): void {
        this.logger.error(message, ...optionalParams);
    }

    static error(message: any, ...optionalParams: any[]): void {
        this.logger.error(message, ...optionalParams);
    }

    fatal(message: any, ...optionalParams: any[]): void {
        this.logger.fatal(message, ...optionalParams);
    }

    static fatal(message: any, ...optionalParams: any[]): void {
        this.logger.fatal(message, ...optionalParams);
    }

    setLogLevels?(levels: LogLevel[]): void {
        throw new Error("Method not implemented.");
    }
}
