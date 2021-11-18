import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { AuthService } from "./auth/services/auth.service";
import { Auth } from "./auth/entities/auth.entity";
import { AuthType } from "./auth/enums/auth.enums";
import { StatusString } from "./common/entity/entity.enums";
import { Gender } from "./market/user/enums/user.enums";
import { EntityManager } from "typeorm";
import { Position } from "./market/user/entities/position.entity";
import { User } from "./market/user/entities/user.entity";

@Injectable()
export class AppService implements OnApplicationBootstrap {

    constructor(private readonly entityManager: EntityManager) {}

    async onApplicationBootstrap(): Promise<any> {
        const crypt = AuthService.generatePassword("admin@123");

        if (!await this.entityManager.findOne(Auth, { email: "admin@market.com", nic: "000000000V" })) {
            await this.entityManager.transaction(async transactionalEntityManager => {
                const adminDto: Auth = {
                    id: undefined,
                    email: "admin@market.com",
                    nic: "000000000V",
                    password: crypt.password,
                    salt: crypt.salt,
                    type: AuthType.ADMIN,
                    verified: true,
                    status: true,
                    statusString: StatusString.ACTIVE,
                    profile: {
                        firstName: "Admin",
                        lastName: "",
                        image: undefined,
                        dob: new Date("2000-01-01"),
                        gender: Gender.MALE,
                        phone: "0000000000",
                        regDate: new Date(),
                        address: {
                            line1: ""
                        },
                        position: undefined,
                        status: false,
                        statusString: StatusString.DEACTIVE,
                        createdAt: undefined,
                        createdBy: undefined,
                        updatedAt: undefined,
                        updatedBy: undefined
                    },
                    createdAt: undefined,
                    createdBy: undefined,
                    updatedAt: undefined,
                    updatedBy: undefined
                };
                const admin = await transactionalEntityManager.save(Auth, adminDto);

                let position = await this.entityManager.findOne(Position, { name: "Admin" });
                if (!position) {
                    const adminPosition: Position = {
                        name: "Admin",
                        status: false,
                        statusString: StatusString.DEACTIVE,
                        createdAt: new Date(),
                        createdBy: admin.id,
                        updatedAt: undefined,
                        updatedBy: undefined
                    };
                    position = await transactionalEntityManager.save(Position, adminPosition);
                }

                await transactionalEntityManager.update(User, admin.profile.id, { position: position.id });
            });
        }
    }
}
