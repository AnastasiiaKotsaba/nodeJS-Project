import { TagServiceContract } from './tag.types'
import { tagRepository } from './tag.repository'

export const tagService: TagServiceContract = {
    getAllTags: async (skip, take) => {
        const tags = await tagRepository.getAllTags(skip, take)
		return tags
    },

    getTagById: async (id) => {
        const onePost = await tagRepository.getTagById(id)
        return onePost
    }
}
