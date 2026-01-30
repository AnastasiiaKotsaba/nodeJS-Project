import type { Request, Response } from "express" 
import { Prisma } from '../generated/prisma'

export type Tag = Prisma.TagGetPayload<{}>

export type CreateTagChecked = Prisma.TagUncheckedCreateInput
export type UpdateTagChecked = Prisma.TagUncheckedUpdateInput

export interface TagServiceContract {
    getAllTags: (skip?: number, take?: number) => Promise<Tag[]>
    getTagById: (id: number) => Promise<Tag | null>
    createTag: (data: CreateTagChecked) => Promise<Tag | null>
    updateTag: (id: number, data: UpdateTagChecked) => Promise<Tag | null>
    deleteTag: (id: number) => Promise<Tag | null>
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

    createTag: (
        req: Request<object, Tag | string, CreateTagChecked>, 
        res: Response<Tag | string>
    ) => Promise<void>

    updateTag: (
        req: Request<{ id: string }, Tag | string, UpdateTagChecked>, 
        res: Response<Tag | string>
    ) => Promise<void>

    deleteTag: (
        req: Request<{ id: string }, Tag | string, object>,
        res: Response<Tag | string>
    ) => Promise<void>
}  

export interface TagRepositoryContract {
    getAllTags: (skip?: number, take?: number) => Promise<Tag[]>
    getTagById: (id: number) => Promise<Tag | null>
    createTag: (data: CreateTagChecked) => Promise<Tag | null>
    updateTag: (id: number, data: UpdateTagChecked) => Promise<Tag | null>
    deleteTag: (id: number) => Promise<Tag | null>
}