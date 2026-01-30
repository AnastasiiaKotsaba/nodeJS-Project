import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth-middleware'

import {postController} from './post.controller' // імпорт контролера для постів
const router = Router() // створюємо роутер для постів

// Створюємо маршрути (роути) для обробки запитів для постів
router.get('/posts', postController.getAllPosts)
router.get('/posts/:id', postController.getPostsById)
router.post('/posts', authMiddleware, postController.createPost)
router.patch('/posts/:id', authMiddleware, postController.updatePost)
router.delete('/posts/:id', authMiddleware, postController.deletePost)
router.post('/posts/:id/comments', authMiddleware, postController.addCommentToPost)
router.put('/posts/:postId/likes/:userId', authMiddleware, postController.addLikeToPost)
router.delete('/posts/:postId/likes/:userId', authMiddleware, postController.deleteLikeFromPost)

export default router