import type { Request, Response } from "express" 
import { Prisma } from '../generated/prisma'

export type User = Prisma.UserGetPayload<{}>

export type UserWithoutPassword = Prisma.UserGetPayload<{
    omit: {
        password: true
    }
}>

export type UserForLogin = Prisma.UserGetPayload<{
    select: {
        email: true,
        password: true
    }
}>

export interface ResponseToken {
    token: string
}

export type CreateUser = Prisma.UserUncheckedCreateInput

export interface UserServiceContract {
    // registration: (data: CreateUser) => Promise<ResponseToken>
    registration: (data: CreateUser) => Promise<ResponseToken>

    login: (email: string, password: string) => Promise<ResponseToken>
}

export interface UserControllerContract {
    registration: (
        req: Request<object, ResponseToken | string, CreateUser>,
        res: Response<ResponseToken | string>
        ) => Promise<void>,
    login: (
        req: Request<object, ResponseToken | string, UserForLogin>,
        res: Response<ResponseToken | string>
    ) => Promise<void>

}

export interface UserRepositoryContract {
    findUserByEmail: (email: string) => Promise<User | null>
    createUser: (data: CreateUser) => Promise<UserWithoutPassword>
}