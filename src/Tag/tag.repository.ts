import { client } from "../client/client" 
import { Prisma } from "../generated/prisma" 
import { TagRepositoryContract } from "./tag.types" 

export const tagRepository: TagRepositoryContract = {
    getAllTags: async (skip, take) => {
        try {
            const tags = await client.tag.findMany({
                skip: skip !== undefined ? skip : 0,
                take: take !== undefined ? take : 10,
            })

            return tags
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

    getTagById: async (id) => {
        try {
            const neededTag = await client.tag.findUnique({where: {id: id}})
            return neededTag

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