// seed - це спосіб взаємодії не(реляційної) БД за доромогою JS/Ts, без використання SQL запитів
// seed - це наповнення БД початковими текстовими даними

// Імпортуємо PrismaClient, щоб взаємодіяти з БД (надсилати запити)
import { PrismaClient } from '../generated/prisma'

// Створюємо екземпляр PrismaClient для самої взаємодії з БД
const prisma = new PrismaClient()

// Створюємо головну функцію, яка буде наповнювати БД початковими даними в асихронному режимі
async function main() {
    // Створюємо  асинхронно перший пост, data - це дані, які ми хочемо записати в БД
    const postOne = await prisma.post.create({
        data: {
            name: 'My first post',
            content: 'This is my first post',
            image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg',
            likes: 10,
        }
    })

    // Створюємо асинхронно перший тег
    const tagOne =  await prisma.tag.create({
        data: {
            name: 'FirstTag'
        }
    })

    // Задаємо зв'язок manyToMany між постом та тегом (асинхронно)
    await prisma.tagsOnPosts.create({
        data: {
            postId: postOne.id, // беремо id щойно створеного поста
            tagId: tagOne.id // беремо id щойно створеного тегу
        }
    })  
}

// Викликаємо функцію та обробляємо можливості помилок
main()
    // При завершенні роботи відключаємо клієнт від БД
    .then(async () => {
    await prisma.$disconnect()
})
    // У разі помилок виводимо їх в консоль та відключаєсо клієнта від БД
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})


