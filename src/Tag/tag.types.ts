import type { Request, Response } from "express" 
import { Prisma } from '../generated/prisma'

export type Tag = Prisma.TagGetPayload<{}>

export interface TagServiceContract {
    getAllTags: (skip?: number, take?: number) => Promise<Tag[]>
    getTagById: (id: number) => Promise<Tag | null>
}

export interface TagControllerContract {
    getAllTags: (
        req: Request<object, Tag[] | string, object, { skip?: string; take?: string }>, 
        res: Response<Tag[] | string>
    ) => Promise<void>

    getTagById: (
        req: Request<{ id: string }, Tag | string, object>, 
        res: Response<Tag | string>
    ) => Promise<void>
}  

export interface TagRepositoryContract {
    getAllTags: (skip?: number, take?: number) => Promise<Tag[]>
    getTagById: (id: number) => Promise<Tag | null>
}