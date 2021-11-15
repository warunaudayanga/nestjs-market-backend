import { Entity, Address } from "../common/interfaces/common.interfaces";
import { UserType, Gender, StatusString } from "./auth.enums";

export interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    nic: string;
    dob: string;
    phone: string;
    position: string;
    address: Address;
}

export interface Position {
    name: string;
}

export interface PositionEntity extends Position, Entity {}

export interface Profile {
    firstName: string;
    lastName: string;
    image?: string;
    dob: Date;
    gender: Gender;
    phone?: string;
    address?: Address;
    position: Position;
    regDate: Date,
}

export interface ProfileEntity extends Profile {
    id: string;
    position: PositionEntity;
}

export interface UserEntity {
    id: string;
    type: UserType;
    email: string;
    nic: string;
    profile: ProfileEntity;
    verified: boolean;
    status: boolean;
    statusString: StatusString;
    createdAt: Date;
    updatedAt: Date
}

export interface AuthData {
    token: string,
    user: UserEntity,
    expiresIn: number
}

export interface SessionData {
    token: string,
    user: UserEntity,
    expirationDate: Date
}
