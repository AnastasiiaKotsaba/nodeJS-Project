import type { Request, Response } from "express" 
import { Prisma } from '../generated/prisma'

export type User = Prisma.UserGetPayload<{}>

export type UserWithoutPassword = Prisma.UserGetPayload<{
    omit: { password: true }
}>

export type UserForLogin = {
	email: string
	password: string
}
export interface AuthenticatedUser {
    id: number
}

export interface ResponseToken {
    token: string
}

export type CreateUser = Prisma.UserUncheckedCreateInput

export interface UserServiceContract {
    login: (data: UserForLogin) => Promise<ResponseToken | string>
    registration: (data: CreateUser) => Promise<ResponseToken | string>
    me: (id: number) => Promise<UserWithoutPassword | string>
}

export interface UserControllerContract {
    login: (
        req: Request<object, ResponseToken | {message: string}, UserForLogin, object>,
        res: Response<ResponseToken | {message: string}>
    ) => void

    registration: (
        req: Request<object, ResponseToken | {message: string}, CreateUser, object>,
        res: Response<ResponseToken | {message: string}>
    ) => void

    me: (
		req: Request<object, UserWithoutPassword | { message: string }, object, object, {idUser: number}>,
		res: Response<UserWithoutPassword | { message: string }, {idUser: number}>,
	) => void

}

export interface UserRepositoryContract {
    findUserByEmail: (email: string) => Promise<User | null>
    findUserById: (id: number) => Promise<UserWithoutPassword | null>
    createUser: (data: CreateUser) => Promise<User>
}