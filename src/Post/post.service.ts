import { PostServiceContract } from './post.types'
import { postRepository } from './post.repository'

export const postService: PostServiceContract = {
    getAllPosts: async (skip, take) => {
        const posts = await postRepository.getAllPosts(skip, take)
		return posts
    },

    getPostsById: async (id) => {
        const onePost = await postRepository.getPostsById(id)
        return onePost
    },

    createPost: async (data) => {
        const createdPost = await postRepository.createPost(data)
        return createdPost
    },

    updatePost: async (id, data) => {
        const updatedPost = await postRepository.updatePost(id, data)
        return updatedPost
    },

    deletePost: async (id) => {
        const deletedPost = await postRepository.deletePost(id)
        return deletedPost
    }
}
