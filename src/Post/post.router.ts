import { Router } from 'express'

import {postController} from './post.controller' // імпорт контролера для постів
const router = Router() // створюємо роутер для постів

// Створюємо маршрути (роути) для обробки запитів для постів
router.get('/posts', postController.getAllPosts)
router.get('/posts/:id', postController.getPostsById)
router.post('/posts', postController.createPost)
router.patch('/posts/:id', postController.updatePost)



export default router