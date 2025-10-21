// import type { Request, Response } from 'express'
import { postService } from './post.service'
import { CreatePostData, IPostControllerContract, UpdatePostData } from './post.types'

export const postController: IPostControllerContract = {
    // Створємо обробку запиту GET за посиланням /posts
    getAllPosts: (req, res) => {
        // Отримуємо вміст query-параметрів skip і take
        // Після задання query-параметрів в адресі, вони доступні в об'єкті req.query
        // Приблизно запит виглядає ось так: http://127.0.0.1:8000/posts?skip=2&take=3
        const skip = Number(req.query.skip)
        const take = Number(req.query.take)

        if (skip) {
            const numSkip = Number(skip) // через те, що req.query повертає рядок, перетворюємо skip в число   
            
            if (Number.isNaN(numSkip)) { // у разі помилки, якщо skip не є числом (isNaN), повертаємо 400 помилку
                res.status(400).json("query skip must be a number") // 400 помилка - помилка на стороні клієнта
                return; // return = break у Python, вказуємо його, щоб не виконувати подальший код у разі помиоки
            }

            const responseData = postService.getAllPosts(skip, take)

            // Повідомляємо клієнту про вдале з'єднання з сервером і відправляємо оброблений об'єкт постів
            // У випадку, якщо не було задано параметрів skip і take, буде відправлено всі пости
            res.status(200).json(responseData)
        }

        if (take) { 
            const numTake = Number(take)
            if (Number.isNaN(numTake)) {
                res.status(400).json("query take must be a number") 
                return; 
            
            }
            const responseData = postService.getAllPosts(skip, take)            
            res.status(200).json(responseData)
        }

        const responseData = postService.getAllPosts(skip, take)            
        res.status(200).json(responseData)
    },

    // Створюємо обробку запиту GET за посиланням /posts/:id (коли клієнт хоче отримати лише 1 пост по його id)
    getPostsById: (req, res) => {
        // Отримуємо id з req.params і перетворюємо його в число
        const id = Number(req.params.id)

        // Створюємо умови для випадків, коли id не є числом або коли пост із задананим id не знайдено
        if (isNaN(id)){ // Якщо id не є числом, повертаємо 400 помилку
            res.status(400).json('id must be a number')
            return;
        }

        const responseIdData = postService.getPostsById(id)

        if (!responseIdData){ // Якщо поста з таким id не існує, повертаємо 404 помилку
            res.status(400).json('post was not found')
            return;
        }
    
        // Повідомляємо клієнту про вдале з'єднання з сервером і відправляємо потрібний пост за вказаним id
        // res.status(200).json(onePost)
        res.status(200).json(responseIdData)
    },

    // Створюємо обробку запиту POST за посиланням /posts, яка дозволяє створювати новий пост
    createPost: async (req, res) => {
        // отримуємо дані з тіла запиту (body) через запит на створення нового поста (POST)
        const data: CreatePostData = req.body 
        console.log(data)

        // Перевіряємо, чи всі потрібні поля заповнені для створення поста
        if (!data || !data.name || !data.content || !data.image) { // У випадку, якщо поле не заповнене, повертаємо 422 помилку клієнтові та повідомляємо про нестачу даних
            res.status(422).json('There is a lack of data')
            return
        }

        if (typeof data.name !== 'string'){ // Перевіряємо, чи є name рядком
            res.status(422).json('Name must be a string')
            return
        }

        if (typeof data.content !== 'string'){ // Перевіряємо, чи є content рядком
            res.status(422).json('Content must be a string')
            return
        }   

        if (typeof data.image !== 'string'){ // Перевіряємо, чи є image рядком
            res.status(422).json('Image must be a string')
            return
        }

        // Викликаємо функцію створення поста з сервісу, передаючи їй дані для створення поста
        const responseDataPost = await postService.createPost(data)

        if (!responseDataPost){ // У випадку, якщо пост не створено, повертаємо 500 помилку серверу{
			res.status(500).json("There was something wrong")
			return
		} 
        res.status(201).json(responseDataPost) // повертаємо клієнтові статус 201 (успішне створення ресурсу) та створений пост
    }, 

    // Створюємо обробку запиту PATCH за посиланням /posts/:id, яке буде оновлювати пост по заданому id
    updatePost: async (req, res) => {
            // Отримуємо потрібний id поста з req.params і перетворюємо його в число
            const id = Number(req.params.id)

            // Отримуємо дані з тіла запиту (body) через запит на оновлення поста (PATCH)
            const data: UpdatePostData = req.body
            console.log(data)

            if (Number.isNaN(id)) { // Якщо id не є числом
                res.status(400).json("Id must be a number")
                return;
            }

            if (typeof data === 'undefined') { // Якщо data не передана
                res.status(422).json('There is lack of data to update')
			    return;
            }
            
            // Викликаємо функцію оновлення поста з сервісу, передаючи їй id потрібного поста та дані для оновлення
            const responseDataUpdate = await postService.updatePost(id, data)

            if (!responseDataUpdate) {
                res.status(500).json("There was something wrong")
                return
            } 

            res.status(200).json(responseDataUpdate) // повертаємо клієнтові статус 200 (успішне оновлення поста) та сам оновлений пост
    }
}

