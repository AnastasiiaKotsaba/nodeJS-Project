import express from 'express' // для створення веб-сервера (додатку) на основі express
import type { Express } from "express"
import postRouter from'./Post/post.router' // імпорт роутер для постів
import tagRouter from'./Tag/tag.router' // імпорт роутер для тегів
import userRouter from './User/user.router'


// Задаємо хост та порт для сервера, щоб вподальшому створити сервер
const HOST = '127.0.0.1'
const PORT = 8000

// Створюємо додаток express
const app: Express = express()

app.use(express.json()) // щоб сервер міг парсити json-файли
app.use(postRouter) // підключаємо роутер для постів
app.use(tagRouter) // підключаємо роутер для тегів
app.use(userRouter) // підключаємо роутер для тегів


// Створюємо обробник listen, який 'слухає' запити на сервер
// Запускаємо сервер за вказаним хостом та портом
app.listen(PORT, HOST, () => {
    // В консолі виводимо посилання на сайт
    console.log(`Server: http://${HOST}:${PORT}`)
})