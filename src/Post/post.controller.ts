import type { Request, Response } from 'express'
import postService from './post.service'
import { CreatePostData } from './post.types'

const postController = {
    // Створємо обробку запиту GET за посиланням /posts
    getAllPosts: (req: Request, res: Response) => {
        // Отримуємо вміст query-параметрів skip і take
        // Після задання query-параметрів в адресі, вони доступні в об'єкті req.query
        // Приблизно запит виглядає ось так: http://127.0.0.1:8000/posts?skip=2&take=3
        const skip = Number(req.query.skip)
        const take = Number(req.query.take)

        const responseData = postService.getAllPosts(skip, take)

        if (responseData.status == 'error') {
            res.status(400).json(responseData.message) // 400 помилка - помилка на стороні клієнта
            return // return = break у Python, вказуємо його, щоб не виконувати подальший код у разі помиоки
        }
        
        // Повідомляємо клієнту про вдале з'єднання з сервером і відправляємо оброблений об'єкт постів
        // У випадку, якщо не було задано параметрів skip і take, буде відправлено всі пости
        res.status(200).json(responseData)
    },

    // Створюємо обробку запиту GET за посиланням /posts/:id (коли клієнт хоче отримати лише 1 пост по його id)
    getPostsById: (req: Request, res: Response) => {
        // Отримуємо id з req.params і перетворюємо його в число
        const id = Number(req.params.id)

        const responseIdData = postService.getPostsById(id)
        
        if (responseIdData.status == 'error'){
            res.status(400).json(responseIdData.message)
            return
        }
        // Повідомляємо клієнту про вдале з'єднання з сервером і відправляємо потрібний пост за вказаним id
        // res.status(200).json(onePost)
        res.status(200).json(responseIdData)
    },

    // Створюємо обробку запиту POST за посиланням /posts, яка дозволяє створювати новий пост
    createPost: async (req: Request, res: Response) => {
        try { // Записуємо код в try, щоб у випадку помилки виконати catch (вивести помилку)
            const data: CreatePostData = req.body // отримуємо дані з тіла запиту (body) через запит на створення нового поста (POST)
            console.log(data)

            const responseDataPost = await postService.createPost(data)
            console.log('data 2', data)

            if (responseDataPost.status == 'error'){
                res.status(400).json(responseDataPost.message)
                return
            }

            res.status(201).json(responseDataPost) // повертаємо клієнтові статус 201 (успішне створення ресурсу) та створений пост
    
        } catch (error) { // у випадку помилки повертаємо 500 код та повідомляємо, що щось пішло не так
            console.log(error)
            res.status(500).json({message: 'There was something wrong'})
            
        }
    }, 

    // Створюємо обробку запиту PATCH за посиланням /posts/:id, яке буде оновлювати пост по заданому id
    updatePost: async (req: Request, res: Response) => {
        try {
            // Отримуємо потрібний id поста з req.params і перетворюємо його в число
            const id = Number(req.params.id)

            // Отримуємо дані з тіла запиту (body) через запит на оновлення поста (PATCH)
            const data = req.body
            console.log(data)

            // Викликаємо функцію оновлення поста з сервісу, передаючи їй id потрібного поста та дані для оновлення
            const responseDataUpdate = await postService.updatePost(id, data)

            // У випадку помилки, повертаєму клієнтові 400 помилку 
            if (responseDataUpdate.status == 'error'){
                res.status(400).json(responseDataUpdate.message)
                return
            }

            res.status(200).json(responseDataUpdate) // повертаємо клієнтові статус 200 (успішне оновлення поста) та сам оновлений пост
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'There was something wrong'})
        }
    }
}

export default postController