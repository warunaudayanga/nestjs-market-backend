import { Inject, Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggerService } from "../../../common/services/logger.service";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { DataRepository } from "../repositories/data.repository";

@Injectable({ scope: Scope.REQUEST })
export class DataService {

    constructor(
        @InjectRepository(DataRepository) private dataRepository: DataRepository,
        @Inject(REQUEST) protected readonly req: Request,
        protected logger: LoggerService
    ) { }

    async set(key: string, value: string): Promise<boolean> {
        try {
            const data = await this.dataRepository.findOne({ key });
            if (data) {
                await this.dataRepository.update({ key }, { value });
            } else {
                await this.dataRepository.save({ key, value });
            }
            return true;
        } catch (err: any) {
            return false;
        }
    }

    async get(key: string): Promise<string | undefined> {
        try {
            let data = await this.dataRepository.findOne({ key });
            return data.value;
        } catch (err: any) {
            return undefined;
        }
    }

}
