let express = require('express') // для створення веб-сервера (додатку) на основі express
const postRouter = require('./Post/post.router') // імпорт роутер для постів

// Задаємо хост та порт для сервера, щоб вподальшому створити сервер
const HOST = '127.0.0.1'
const PORT = 8000

// Створюємо додаток express
const app = express()

app.use(express.json()) // щоб сервер міг парсити json-файли
app.use(postRouter) // підключаємо роутер для постів

// Створюємо обробник listen, який 'слухає' запити на сервер
// Запускаємо сервер за вказаним хостом та портом
app.listen(PORT, HOST, () => {
    // В консолі виводимо посилання на сайт
    console.log(`Server: http://${HOST}:${PORT}`)
})