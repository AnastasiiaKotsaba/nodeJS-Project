const path = require('path') // для роботи з шляхами
const fs = require('fs') // для роботи з файловою системою
const fsPromises = require('fs/promises') // для асинхронної роботи з файловою системою 

// Створюємо шлях до файлу posts.json (__dirname - це шлях до дитекторії де знаходиться прописана змінна, а posts.json - потрібний файл)
// path.join - об'єднує задані шляхи в один
const postPATH = path.join(__dirname, '../../posts.json') // В результаті шлях приблизно виглядає так: .../NodeJS/main.js/posts.json

// Читаємо файл posts.json, записуємо вміст файлу в обєкт posts 
// fs.readFileSync - читає синхронно файл (поки файл не буде прочитано, код не виконується)
// JSON.parse - перетворює JSON в JavaScript об'єкт
const posts = JSON.parse(fs.readFileSync(postPATH, 'utf-8'))

const postService = {
    getAllPosts: (skip, take) => {
        // Створюємо копію об'єкту posts, щоб не змінювати оригінальний об'єкт (диструктуризація)
        let postCopys = [...posts]

        // Обробляємо запит query-параметру skip 
        if (skip) { // перевіряємо, чи був заданий query-параметр skip в адересі додатку
            const numSkip = Number(skip) // через те, що req.query повертає рядок, перетворюємо skip в число   
            if (isNaN(numSkip)) { // у разі помилки, якщо skip не є числом (isNaN), повертаємо 400 помилку
                // Повертаємо об'єкт з помилкою
                return { 
                    status: "error",
                    message: "query skip must be a number"
                }  
            }
            // Якщо ж помилки немає, то обробляємо об'єкт постів, пропускаючи перші numSkip елементів
            postCopys = posts.slice(numSkip)
        }

        // Обробляємо запити query-параметру take
        if (take) { 
            const numTake = Number(take)
            if (isNaN(numTake)) {
                return {
                    status: "error",
                    message: "query take must be a number"
                }
            }
            // Якщо помилки немає, то обробляємо об'єкт постів, виводячи з першого по numTake елементів
            postCopys = postCopys.slice(0, numTake)
        }

        // Повертаємо об'єкт з успішним статусом і даними
        return {
            status:"success",
            data: postCopys
        }

        
    },

    getPostsById: (id) => {
        // Створюємо умови для випадків, коли id не є числом або коли пост із задананим id не знайдено
        if (isNaN(id)){ // Якщо id не є числом, повертаємо 400 помилку
            return {
                status: "error",
                message: "id must be a number"
            }
        }

        // Якщо id є числом і пост з таким id існує, шукаємо цей пост в об'єкті posts
        const onePost = posts.find((post) => {
            return id === post.id // Повертаємо пост з потрібним id
        })

        if (!onePost){ // Якщо поста з таким id не існує, повертаємо 404 помилку
            return {
                status: "error",
                message: "post was not found"
            }
        }

        // Повертаємо об'єкт з успішним статусом і даними
        return {
            status:"success",
            data: onePost
        }
    },

    createPost: async (data) => {
        // Перевіряємо, чи всі потрібні поля заповнені для створення поста
        if (!data || !data.name || !data.content || !data.image) { // У випадку, якщо поле не заповнене, повертаємо 422 помилку клієнтові та повідомляємо про нестачу даних
            return { // перериваємо виконарня коду
                status: "error",
                message: "There is a lack of data"
            }
        }

    
        //  Отримуємо останній пост в об'єкті posts, щоб задати новому створеному посту id
        const lastPost = posts[posts.length - 1] // отримуємо останній елемент масиву posts
        console.log(lastPost)
        let postId = 0 // задаємо id для нового поста, якщо це буде перший пост, то його id буде 0

        if (lastPost) { // перевіряємо, чи існує останній пост (у випадку, якщо це не перший пост)
            postId = lastPost.id + 1 // задаємо id нового поста, збільшуючи id останнього поста на 1
            console.log(postId)
        }
    
        //  Робимо диструктуризацію об'єкту data, копіюючи попередні дані та додаючи нову властивість id
        const post = { ...data, id: postId }

        posts.push(post) // додаємо новй пост в об'єкт posts

        
        /*
            Нехай останній пост має id 6

            1. в lastPost ми отримуємо цей об'єкт останнього поста: 
                lastPost = {id: 6, name: 'Post 6', content: '...', image: '...'}

            2. На всяк випадок задаємо початковий id = 0 (якщо пост був першим)
            3. Перевіряємо, чи існує lastPost (у випадку, якщо це не перший пост)
            4. Якщо lastPost існує, то задаємо id нового поста, збільшуючи id останнього поста на 1:
            postId = lastPost.id + 1 
            Виходить: postId = 6 + 1 = 7

            5. Робимо диструктуризацію об'єкту data, копіюючи попередні дані та додаючи нову властивість id:
                data = {name: '...', content: '...', image: '...'}
                post = {...data, id: postId}

                Виходить: post = {name: '...', content: '...', image: '...', id: 7}

            6. Додаємо новий пост в об'єкт posts: [{}, {}..., {name: '...', content: '...', image: '...', id: 7}]
        */

        // Записуємо оновлений об'єкт posts в файл posts.json (асинхронно) 
        await fsPromises.writeFile(postPATH, JSON.stringify(posts)) // JSON.stringify - об'єкт в JSON

        return {
            status:"success",
            data: post
        }
    }
}
module.exports = postService