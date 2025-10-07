let express = require('express') 
const postController = require('./post.controller') // імпорт контролера для постів
const router = express.Router() // створюємо роутер для постів

// Створюємо маршрути (роути) для обробки запитів для постів
router.get('/posts', postController.getAllPosts)
router.get('/posts/:id', postController.getPostsById)
router.post('/posts', postController.createPost)



module.exports=router