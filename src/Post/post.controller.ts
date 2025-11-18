// import type { Request, Response } from 'express'
import { postService } from './post.service'
import { CreatePostChecked, PostControllerContract, UpdatePostChecked } from './post.types'

export const postController: PostControllerContract = {
    // Створємо обробку запиту GET за посиланням /posts
    getAllPosts: async (req, res) => {
        // Отримуємо query-параметри і одразу задаємо їм тип або число, або undefined
        const skip = Number(req.query.skip) || undefined
        const take = Number(req.query.take) || undefined

        // Скорочоємо умову, яка перевіряє, чи є переданий параметр числом
        if ((req.query.skip && Number.isNaN(skip)) || (req.query.take && Number.isNaN(take))) {
            res.status(400).json("Query params must be numbers")
            return;
        }

        const responseData = await postService.getAllPosts(skip, take)
        res.status(200).json(responseData);
    },


    // Створюємо обробку запиту GET за посиланням /posts/:id (коли клієнт хоче отримати лише 1 пост по його id)
    getPostsById: async (req, res) => {
        // Отримуємо id з req.params і перетворюємо його в число
        const id = Number(req.params.id)

        // Створюємо умови для випадків, коли id не є числом або коли пост із задананим id не знайдено
        if (isNaN(id)){ // Якщо id не є числом, повертаємо 400 помилку
            res.status(400).json('id must be a number')
            return;
        }

        const responseIdData = await postService.getPostsById(id)

        if (!responseIdData){                            
			res.status(500).json("There was something wrong")
			return
		} 

        // Повідомляємо клієнту про вдале з'єднання з сервером і відправляємо потрібний пост за вказаним id
        // res.status(200).json(onePost)
        res.status(200).json(responseIdData)
    },

    // Створюємо обробку запиту POST за посиланням /posts, яка дозволяє створювати новий пост
    createPost: async (req, res) => {
        // отримуємо дані з тіла запиту (body) через запит на створення нового поста (POST)
        const data: CreatePostChecked = req.body 
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

        // У випадку, якщо пост не створено, повертаємо 500 помилку серверу 
        if (!responseDataPost){                            
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
            const data: UpdatePostChecked = req.body
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
    },

    // Cтворюємо обробку запиту DELETE за посиланням /posts/:id, яке буде видаляти пост по заданому id
    deletePost: async (req, res) => {
        // Отримуємо потрібний id поста з req.params і перетворюємо його в число
        const id = Number(req.params.id)

        if (Number.isNaN(id)) { // Якщо id не є числом
            res.status(400).json("Id must be a number")
            return
        }

        // Викликаємо функцію видалення поста з сервісу, передаючи їй id потрібного поста
        const responseDataDelete = await postService.deletePost(id)

        if (!responseDataDelete) {
            res.status(500).json("There was something wrong")
            return
        }

        res.status(200).json(responseDataDelete) // повертаємо клієнтові статус 200 (успішне видалення поста) та видалений пост
    }
}

