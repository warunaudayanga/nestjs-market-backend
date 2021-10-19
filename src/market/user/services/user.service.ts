import { Injectable } from "@nestjs/common";
import { LoggerService } from "../../../common/services/logger.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>, private readonly logger: LoggerService) { }

}
