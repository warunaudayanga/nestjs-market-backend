import { HttpException, HttpStatus, Injectable, Scope } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggerService } from "../../../common/services/logger.service";
import { UserDto } from "../dto/user.dto";
import { SuccessDto } from "../../../common/dto/success.dto";
import { FindConditions } from "typeorm/find-options/FindConditions";
import { UserErrors } from "../dto/user.errors.dto";
import { UserRepository } from "../repositories/user.repository";

@Injectable({ scope: Scope.REQUEST })
export class UserService {

    constructor(
        @InjectRepository(UserRepository) private userRepository: UserRepository,
        private logger: LoggerService
    ) {}

    async create(createUserDto: UserDto): Promise<User> {
        try {
            return await this.userRepository.saveAlt(createUserDto);
        } catch (err: any) {
            if (err.code === "ER_DUP_ENTRY") {
                throw new HttpException(UserErrors.USER_409_EXIST_NIC, HttpStatus.CONFLICT);
            }
            this.logger.error(err);
            throw new HttpException(UserErrors.USER_500_CREATE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: string, updateUserDto: Partial<UserDto>): Promise<SuccessDto> {
        if (!id) {
            return Promise.reject(new HttpException(UserErrors.USER_400_EMPTY_ID, HttpStatus.NOT_FOUND));
        }
        try {
            const updateResult = await this.userRepository.update(id, updateUserDto);
            if (updateResult.affected > 0) {
                return new SuccessDto("User updated successfully.");
            }
            return Promise.reject(new HttpException(UserErrors.USER_404_ID, HttpStatus.NOT_FOUND));
        } catch (err: any) {
            if (err.code === "ER_DUP_ENTRY") {
                throw new HttpException(UserErrors.USER_409_EXIST_NIC, HttpStatus.CONFLICT);
            }
            this.logger.error(err);
            throw new HttpException(UserErrors.USER_500_UPDATE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async get(id: string): Promise<User> {
        if (!id) {
            return Promise.reject(new HttpException(UserErrors.USER_400_EMPTY_ID, HttpStatus.NOT_FOUND));
        }
        try {
            const user = await this.userRepository.findOne(id);
            if (user) {
                return user;
            }
            return Promise.reject(new HttpException(UserErrors.USER_404_ID, HttpStatus.NOT_FOUND));
        } catch (err: any) {
            this.logger.error(err);
            throw new HttpException(UserErrors.USER_500_RETRIEVE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOne(filter: FindConditions<User>): Promise<User> {
        try {
            const user = await this.userRepository.findOne(filter);
            if (user) {
                return user;
            }
            return Promise.reject(new HttpException(UserErrors.USER_404_ID, HttpStatus.NOT_FOUND));
        } catch (err: any) {
            this.logger.error(err);
            throw new HttpException(UserErrors.USER_500_RETRIEVE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAll(): Promise<User[]> {
        try {
            return await this.userRepository.find();
        } catch (err: any) {
            this.logger.error(err);
            throw new HttpException(UserErrors.USER_500_RETRIEVE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: string): Promise<SuccessDto> {
        try {
            const deleteResult = await this.userRepository.delete(id);
            if (deleteResult.affected > 0) {
                return new SuccessDto("User deleted successfully.");
            }
            return Promise.reject(new HttpException(UserErrors.USER_404_ID, HttpStatus.NOT_FOUND));
        } catch (err: any) {
            this.logger.error(err);
            throw new HttpException(UserErrors.USER_500_DELETE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
