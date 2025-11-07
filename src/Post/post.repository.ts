import { client } from "../client/client" 
import { Prisma } from "../generated/prisma" 
import { PostRepositoryContract } from "./post.types" 

export const postRepository: PostRepositoryContract = {
    getAllPosts: async (skip, take) => {
        try {
            // Знаходимо всі пости в асинххронному режимі
            const posts = await client.post.findMany({
                /*
                    У типізації функції getAllPosts, вказано, що функція приймає 2 query-параметра та повертає список з постами 
                    Так як параметр skip/take може бути не вказаним, відповідно й тип даних різний - це або ж число, або тип undefined
                    Щоб не було помилки (через те, що в призмі не можна передавати тип даних undefined), використовуємо тернарний оператор 

                    Тернарний оператор заміняє умову: (Тернарний оператор: умова ? дія, якщо умова правдива)
                        if (skip !== undefined) {skip: 0} --> skip !== undefined ? skip : 0,

                    По суті, ми передаємо параметри skip/take лише якщо їх тип є числом, і за замовчуванням надаємо базові значення - 0 і 10
                    Виходить, якщо skip/take задано, передаємо їх значення
                    Якщо ж ні — задаємо значення за замовчуванням 0, 10 (тобто пропускаємо 0 ел-в або беремо 10).
                */

                skip: skip !== undefined ? skip : 0,
                take: take !== undefined ? take : 10,
            })

            return posts
        } catch (error){
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

    getPostsById: async (id) => {
        try {
            const neededPost = await client.post.findUnique({where: {id: id}})
            return neededPost

        } catch (error){
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2024"){
                    console.log("Timed out fetching a new connection from the connection pool")
                } else if (error.code === "P1013") { 
                    console.log("The provided database string is invalid")
                } else if (error.code === "P2004") { 
                    console.log("Constraint failed")
                } else if (error.code === " P2025") { 
                    console.log("Record to update/delete does not exist")
                }
            }
            throw error
        }
    },

    createPost: async (data) => {
        try {
            const newPost = await client.post.create({data: data})
            return newPost

        } catch (error){
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2024"){
                    console.log("Timed out fetching a new connection from the connection pool")
                } else if (error.code === "P1013") { 
                    console.log("The provided database string is invalid")
                } else if (error.code === "P2004") { 
                    console.log("Constraint failed")
                } else if (error.code === " P2025") { 
                    console.log("Record to update/delete does not exist")
                }
            }
            throw error
        }
    },

    updatePost: async (id, data) => {
        try {
            const updatedPost = await client.post.update({where: {id: id}, data: data})
            return updatedPost

        } catch (error){
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2024"){
                    console.log("Timed out fetching a new connection from the connection pool")
                } else if (error.code === "P1013") { 
                    console.log("The provided database string is invalid")
                } else if (error.code === "P2004") { 
                    console.log("Constraint failed")
                } else if (error.code === " P2025") { 
                    console.log("Record to update/delete does not exist")
                }
            }
            throw error
        }
    },

    deletePost: async (id) => {
        try {
            const deletedPost = await client.post.delete({where: {id: id}})
            return deletedPost

        } catch (error){
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2024"){
                    console.log("Timed out fetching a new connection from the connection pool")
                } else if (error.code === "P1013") { 
                    console.log("The provided database string is invalid")
                } else if (error.code === "P2004") { 
                    console.log("Constraint failed")
                } else if (error.code === " P2025") { 
                    console.log("Record to update/delete does not exist")
                }
            }
            throw error
        }
    }
}