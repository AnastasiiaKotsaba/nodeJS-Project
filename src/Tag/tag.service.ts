import { TagServiceContract } from './tag.types'
import { tagRepository } from './tag.repository'

export const tagService: TagServiceContract = {
    getAllTags: async (skip, take) => {
        const tags = await tagRepository.getAllTags(skip, take)
		return tags
    },

    getTagById: async (id) => {
        const oneTag = await tagRepository.getTagById(id)
        return oneTag
    },

    createTag: async (data) => {
        const createdTag = await tagRepository.createTag(data)
        return createdTag
    },

    updateTag: async (id, data) => {
        const updatedTag = await tagRepository.updateTag(id, data)
        return updatedTag
    },

    deleteTag: async (id) => {
        const deletedTag = await tagRepository.deleteTag(id)
        return deletedTag
    }
}
