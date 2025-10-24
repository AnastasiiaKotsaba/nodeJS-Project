import type { Request, Response } from "express" // іспортуємо типи Request і Response для типізації об'єктів Cotroller і Servise
import { Prisma } from '../generated/prisma' // імпортуємо Prisma для типізації об'єктів

// Створюємо тип для поста (типізація об'єкта поста та полів) через Prisma типи
export type Post = Prisma.PostGetPayload<{}>

// Створюємо тип для поста, де вкючені зв'язки з моделлю тегів
export type PostWithTags = Prisma.PostGetPayload<{
    include: {
        tags: true
    }
}>

// Створюємо тип для створення поста без зв'язків
export type CreatePost = Prisma.PostCreateInput

// Створюємо тип для створення поста зі всіма зв'язками та id тегів
export type CreatePostChecked = Prisma.PostUncheckedCreateInput

// Створюємо тип UpdatePost, необхідних для оновлення поста (усі поля є необов'язковими, поле id не потрібне)
export type UpdatePost = Prisma.PostUpdateInput

export type UpdatePostChecked = Prisma.PostUncheckedUpdateInput

// Omit - створює новий тип, виключаючи вказані властивості з існуючого типу
// Partial - створює новий тип, роблячи всі властивості існуючого типу необов'язковими

// Створюємо інтерфейси для типізації об'єкту Controller
export interface PostServiceContract {
    // Типізація методів об'єкта postService
    // Назва методу: (параметр: тип) => те, що повертає фунція

    getAllPosts: (skip?: number, take?: number) => Post[]; // Повертає масив постів (Post[])        
    getPostsById: (id: number) => Post | null; // Повертає один пост або null (якщо поста не знайдено)
    createPost: (data: CreatePostChecked) => Promise<Post | null>; // Повертає Promise (через асинхронність методу), який буде 'розпакований' на створений пост або null (якщо пост не створено)             
    updatePost: (id: number, data: UpdatePostChecked) => Promise<Post | null>;  // Повертає Promise (через асинхронність методу), який буде 'розпакований' на оновлений пост або null (якщо пост не оновлено)
    deletePost: (id: number) => Promise<Post | null>; // Повертає Promise (через асинхронність методу), який буде 'розпакований' на видалений пост або null (якщо пост не видалено)
}

export interface PostControllerContract {
    // Типізація методів об'єкта postController
    // Назва методу: (типізація параметрів req і res) => void (за правилом функція в controller-і нічого не повертає)

    /* Типіація параметру req:
        1 параметр - типізація Route параметрів (це завжди об'єкт Object, якщо немає вказаних конкретних route параметрів, якщо вони вказані, то передаємо об'єкт з їх типізацією)
        2 параметр - типізація того, що повертає метод (у нашому випадку це або масив постів Post[] (якщо все успішно) або рядок string з повідомленням про помилку)
        3 параметр - типізація тіла req (body) (якщо запит не має body, то просто об'єкт Object, але якщо тіло запиту є, то ми повинні вказати інтерфейс з типізацією того, що ми хочемо додати в саме тіло)
        4 параметр - типізація Query параметрів (це або ж об'єкт з конкретною типізацією параметрів, або ж просто  Object)
    */

    getAllPosts: (
        req: Request<object, Post[] | string, object, { skip?: string; take?: string }>, 
        res: Response<Post[] | string>
    ) => void

    getPostsById: (
        req: Request<{ id: string }, Post | string, object>, 
        res: Response<Post | string>
    ) => void

    createPost: (
        req: Request<object, Post | string, CreatePostChecked>, 
        res: Response<Post | string>
    ) => void

    updatePost: (
        req: Request<{ id: string }, Post | string, UpdatePostChecked>, 
        res: Response<Post | string>
    ) => void

    deletePost: (
        req: Request<{ id: string }, Post | string, object>,
        res: Response<Post | string>
    ) => void
}   