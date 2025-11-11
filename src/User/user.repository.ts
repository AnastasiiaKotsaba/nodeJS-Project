import { client } from "../client/client";
import { Prisma } from "../generated/prisma";
import { UserRepositoryContract } from "./user.types";

export const userRepository: UserRepositoryContract = {
    findUserByEmail: async (email) => {
        try {
            const user = await client.user.findUnique({where: {email: email}})
            return user

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2024"){
                    console.log("Timed out fetching a new connection from the connection pool")
                } else if (error.code === "P1013") { // не вдалося підлючитись до БД за заданим посиланням
                    console.log("The provided database string is invalid")
                } else if (error.code === "P2004") { // вказані дані не підходять за типом даних
                    console.log("Constraint failed")
                } else if (error.code === " P2025") { // не вдалося знайти користувача
                    console.log("Record to update/delete does not exist")
                }
            }
            throw error
        }
    },

    createUser: async (data) => {
        try {
            const newUser = await client.user.create({data: data})
            return newUser 

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2024"){
                    console.log("Timed out fetching a new connection from the connection pool")
                } else if (error.code === "P1013") { // не вдалося підлючитись до БД за заданим посиланням
                    console.log("The provided database string is invalid")
                } else if (error.code === "P2004") { // вказані дані не підходять за типом даних
                    console.log("Constraint failed")
                } else if (error.code === " P2025") { // не вдалося знайти користувача
                    console.log("Record to update/delete does not exist")
                }
            }
            throw error
            
        }
    },

}