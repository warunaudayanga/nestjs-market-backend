// import { Injectable, NestMiddleware } from "@nestjs/common";
// import { NextFunction, Request, Response } from "express";
// import { EntityManager } from "typeorm";
// import { Auth } from "../auth/entities/auth.entity";
// import { AuthType } from "../auth/enums/auth.enums";
// import { StatusString } from "../common/entity/entity.enums";
// import { Gender } from "../market/user/enums/user.enums";
// import { RegisterDto } from "../auth/dto/register.dto";
// import { AuthService } from "../auth/services/auth.service";
//
// @Injectable()
// export class SeedingMiddleware implements NestMiddleware {
//
//     // to avoid round trips to db we store the info about whether
//     // the seeding has been completed as boolean flag in the middleware
//     // we use a promise to avoid concurrency cases. Concurrency cases may
//     // occur if other requests also trigger a seeding while it has already
//     // been started by the first request. The promise can be used by other
//     // requests to wait for the seeding to finish.
//     private isSeedingComplete: Promise<boolean>;
//
//     constructor(private readonly entityManager: EntityManager) {}
//
//     async use(req: Request, res: Response, next: NextFunction): Promise<void> {
//
//         if (await this.isSeedingComplete) {
//             // seeding has already taken place,
//             // we can short-circuit to the next middleware
//             return next();
//         }
//
//         const crypt = AuthService.generatePassword("admin@123");
//
//         const admin: Auth = {
//             id: undefined,
//             email: "admin@market.com",
//             nic: "000000000V",
//             password: crypt.password,
//             salt: crypt.salt,
//             type: AuthType.ADMIN,
//             verified: true,
//             status: true,
//             statusString: StatusString.ACTIVE,
//             profile: {
//                 id: undefined,
//                 firstName: "Admin",
//                 lastName: "",
//                 image: undefined,
//                 dob: new Date("2000-01-01"),
//                 gender: Gender.MALE,
//                 phone: "0000000000",
//                 regDate: new Date(),
//                 address: {
//                     line1: ""
//                 },
//                 position: undefined,
//                 status: undefined,
//                 statusString: undefined,
//                 createdAt: undefined,
//                 createdBy: undefined,
//                 updatedAt: undefined,
//                 updatedBy: undefined
//             },
//             createdAt: undefined,
//             createdBy: undefined,
//             updatedAt: undefined,
//             updatedBy: undefined
//         };
//
//         this.isSeedingComplete = (async (): Promise<boolean> => {
//             // for example you start with an initial seeding entry called 'initial-seeding'
//             // on 2019-06-27. if 'initial-seeding' already exists in db, then this
//             // part is skipped
//             if (!await this.entityManager.findOne(Auth, { email: "admin@market.com", nic: "000000000V" })) {
//                 await this.entityManager.transaction(async transactionalEntityManager => {
//                     await transactionalEntityManager.save(Auth, admin);
//                     // persist in db that 'initial-seeding' is complete
//                     // await transactionalEntityManager.save(new Auth());
//                 });
//             }
//
//             // now a month later on 2019-07-25 you add another seeding
//             // entry called 'another-seeding-round' since you want to initialize
//             // entities that you just created a month later
//             // since 'initial-seeding' already exists it is skipped but 'another-seeding-round'
//             // will be executed now.
//             // if (!await this.entityManager.findOne(Auth, { email: "admin@market.com", nic: "00000000V" })) {
//             //     await this.entityManager.transaction(async transactionalEntityManager => {
//             //         await transactionalEntityManager.save(Auth, admin);
//             //         // persist in db that 'initial-seeding' is complete
//             //         // await transactionalEntityManager.save(new Auth());
//             //     });
//             // }
//
//             return true;
//         })();
//
//         await this.isSeedingComplete;
//
//         next();
//     }
// }
