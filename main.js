// Підключаємо потрібні бібліотеки
let moment = require('moment') // для роботи з датами, часом, днями тижня і т.д.
let express = require('express') // для створення веб-сервера (додатку) на основі express
const path = require('path') // для роботи з шляхами
const fs = require('fs') // для роботи з файловою системою

// Задаємо хост та порт для сервера, щоб вподальшому створити сервер
const HOST = '127.0.0.1'
const PORT = 8000

// Створюємо додаток express
const app = express()


// Створюємо шлях до файлу posts.json (__dirname - це шлях до дитекторії де знаходиться прописана змінна, а posts.json - потрібний файл)
// path.join - об'єднує задані шляхи в один
const postPATH = path.join(__dirname, 'posts.json') // В результаті шлях приблизно виглядає так: .../NodeJS/main.js/posts.json

// Читаємо файл posts.json, записуємо вміст файлу в обєкт posts 
// fs.readFileSync - читає синхронно файл (поки файл не буде прочитано, код не виконується)
// JSON.parse - перетворює JSON в JavaScript об'єкт
const posts = JSON.parse(fs.readFileSync(postPATH, 'utf-8'))


// Створємо обробку запиту GET за посиланням /timestamp
// req (request) - для отримання даних з серверу
// res (response) - для відправки даних на сервер
app.get('/timestamp', (req, res) => {
    res.status(200).json({"Current date": getDate()})
})

// Створємо обробку запиту GET за посиланням /posts
app.get('/posts', (req, res) => {
    // Отримуємо вміст query-параметрів skip і take
    // Після задання query-параметрів в адресі, вони доступні в об'єкті req.query
    // Приблизно запит виглядає ось так: http://127.0.0.1:8000/posts?skip=2&take=3
    const skip = req.query.skip
    const take = req.query.take

    // Створюємо копію об'єкту posts, щоб не змінювати оригінальний об'єкт (диструктуризація)
    let postCopys = [...posts]

    // Обробляємо запит query-параметру skip 
	if (skip) { // перевіряємо, чи був заданий query-параметр skip в адересі додатку
		const numSkip = Number(skip) // через те, що req.query повертає рядок, перетворюємо skip в число   
		if (isNaN(numSkip)) { // у разі помилки, якщо skip не є числом (isNaN), повертаємо 400 помилку
			res.status(400).json("query skip must be a number") // 400 помилка - помилка на стороні клієнта
			return // return = break у Python, вказуємо його, щоб не виконувати подальший код у разі помиоки
		}
        // Якщо ж помилки немає, то обробляємо об'єкт постів, пропускаючи перші numSkip елементів
		postCopys = posts.slice(numSkip)
	}

    // Обробляємо запити query-параметру take
    if (take) { 
        const numTake = Number(take)
        if (isNaN(numTake)) {
            res.status(400).json("query take must be a number")
            return
        }
        // Якщо помилки немає, то обробляємо об'єкт постів, виводячи з першого по numTake елементів
        postCopys = postCopys.slice(0, numTake)
    }

    // Повідомляємо клієнту про вдале з'єднання з сервером і відправляємо оброблений об'єкт постів
    // У випадку, якщо не було задано параметрів skip і take, буде відправлено всі пости
    res.status(200).json(postCopys)
})


// Створюємо обробку запиту GET за посиланням /posts/:id (коли клієнт хоче отримати лише 1 пост по його id)
app.get("/posts/:id", (req, res) => {
    // Отримуємо id з req.params і перетворюємо його в число
	const id = Number(req.params.id)
	
    // Створюємо умови для випадків, коли id не є числом або коли пост із задананим id не знайдено
	if (isNaN(id)){ // Якщо id не є числом, повертаємо 400 помилку
		res.status(400).json('id must be a number')
		return
	}

    if (!onePost){ // Якщо поста з таким id не існує, повертаємо 404 помилку
        res.status(404).json('post was not found')
        return
    }
    
    // Якщо id є числом і пост з таким id існує, шукаємо цей пост в об'єкті posts
	const onePost = posts.find((post) => {
		return id === post.id // Повертаємо пост з потрібним id
	})

    // Повідомляємо клієнту про вдале з'єднання з сервером і відправляємо потрібний пост за вказаним id
	res.status(200).json(onePost)
})


// User-запити 
// Знаходимо шлях до файлу users.json
const userPATH = path.join(__dirname, 'users.json')
const users = JSON.parse(fs.readFileSync(userPATH, 'utf-8'))

// Створємо обробку запиту GET за посиланням /users, яка повертає всіх користувачів
app.get('/users', (req, res) => {
    res.status(200).json(users) // Повідомляємо клієнту про вдале з'єднання із сервером і відправляємо усіх користувачів 
})

// Створюємо обробку запиту GET за посиланням /user/:id, яка повертає одного користувача по вказаному id
app.get('/user/:id', (req, res) => {
    const id = Number(req.params.id) // отримуємо id з req.params і перетворюємо його в число
    const fields = req.query.fields // отримуємо query-параметр fields з req.query, щоб вказати, які поля користувача потрібно повернути

    // Перевіряємо, у випадку, якщо id не є числом, то повертаємо 400 помилку клієнтові
    if (isNaN(id)) {
        res.status(400).json('id must be a number')
        return
    }

    // Шукаємо користувача з потрібним id в об'єкті users
    const oneUser = users.find((user) => {
        return id === user.id // Повертаємо користувача з потрібним id
    })
    
    // Якщо користувача з таким id не існує, повертаємо 404 помилку клієнтові
    if (!oneUser) {
        res.status(404).json('user was not found')
        return
    }

    if (fields) { // Якщо був заданий query-параметр fields в адресі
        // Розділяємо об'єкт fields по знаку ',', щоб отримати масив із назв потрібних полів
        // Приклад: ..user/1?fields=name, email ---> ['name', 'email']
		const fieldName = fields.split(',')
        console.log(fieldName)
        
        // Створюємо новий об'єкт, в який будемо записувати потрібні поля користувача(відфільтровані)
        let filteredUsers = {}

        // Перебираємо масив fieldName за допомогою map і перевіряємо, чи існує таке поле в об'єкті oneUser
        fieldName.forEach((field) => { // field - це буде назва поля, яке потрібно знайти в об'єкті oneUser
            if (oneUser[field] !== undefined) { // Перевіряємо, якщо таке поле існує в об'єкті oneUser
                filteredUsers[field] = oneUser[field] // записуємо його в об'єкт filteredUsers. Приклад: filteredUsers['name'] = oneUser['name']
            } else if (oneUser[field] === undefined) { // У випадку, якщо такого поля не існує, повертаємо 404 помилку клієнтові
                res.status(404).json(`field ${field} was not found`)
                return
            } else if (!isNaN(field)) { // Якщо ж поле є числом, повертаємо 400 помилку клієнтові
                res.status(400).json("fields must be a text, not a number")
                return
            }
        })

        // Приклад: (запит: .../user/1?fields= id,name)
        // oneUser = {id: 1, name: 'User 1'}
        // fieldName = ['id', 'name']
        // filteredUsers = {id: 1, name: 'User 1'}

        /*
            1. Код бере усю інформацію про користувача з id 1:
                oneUser = {id: 1, name: 'User 1', email: '"userone@gmailcom", 'password': '1234'}

            2. Сплітує query-параметр fields по комі, записуючи в масив feldName кожну назву поля:
                fieldName = ['id', 'name']

            3. Перебирає масив fieldName через map і перевіряє, чи існують такі поля в об'єкті oneUser
            4. Якщо поля існують, вони записуються до нового об'єкта filteredUsers:
                filteredUsers = {id: 1, name: 'User 1'}
            5. Якщо якесь поле не існує, повертається 404 помилка
            6. Якщо ж поле є числом, повертається 400 помилка
        */
       
        // Повертаємо відфільтрованого користувача з потрібними полями (якщо вони були вказані)
        res.status(200).json(filteredUsers)
    }

    // Повертаємо об'єкт потрібного користувача за вказаним id (з усіма полями за замовчуванням)
    res.status(200).json(oneUser)
})


app.get('/user/name/:name', (req, res) => {
    const name = req.params.name

    const oneUser = users.find((user) => {
        return name === user.name
    })

    if (!isNaN(name)) {
        res.status(400).json('name must be a text, not a number')
        return
    }

    if (!oneUser) {
        res.status(404).json('user with this name was not found')
        return
    }

    res.status(200).json(oneUser)
})

// 1
function getCurrentDate() {
    console.log(`Today is: ${moment().format('dddd')}`)
}

// 2
function getCurrentMonth() {
    console.log(`Current month is: ${moment().format('MMMM')}`)
}

// 3
function getCurrentYear() {
    console.log(`Current year is: ${moment().format('YYYY')}`)
}

// 4
function getDate(){
    console.log(`Current date is: ${moment().format('YYYY/MM/DD HH:mm:ss')}`)
    return moment().format('YYYY/MM/DD HH:mm:ss')
}

// 5
function getCurrentWeekDay() {
    console.log(`Today is: ${moment().format('dddd')}`)
}

// Створюємо обробник listen, який 'слухає' запити на сервер
// Запускаємо сервер за вказаним хостом та портом
app.listen(PORT, HOST, () => {
    // В консолі виводимо посилання на сайт
    console.log(`Server: http://${HOST}:${PORT}`)
})

getCurrentDate()
getCurrentMonth()
getCurrentYear()
getCurrentWeekDay()
getDate()