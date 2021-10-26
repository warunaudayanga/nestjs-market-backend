import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import { existsSync } from "fs";
import * as path from "path";

@Controller()
export class AppController {

    @Get("errors")
    getErrorFile(@Res() res: Response): void {
        const filename = process.env.LOG_FILE;
        if (existsSync(`${filename}.json`)) {
            res.sendFile(path.join(__dirname + `../../${filename}.json`));
        } else {
            res.status(404).send("No error file found on server!");
        }
    }

}
