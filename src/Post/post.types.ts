import type { Request, Response } from "express" // іспортуємо типи Request і Response для типізації об'єктів Cotroller і Servise

// Створюємо інтерфейс для поста (типізація об'єкта поста та полів)
export interface IPost {
    id: number,
    name: string,
    content: string,
    image: string,
    likes: number
}
// Створюємо тип CreatePostData, необхідних для створення поста (усі поля, окрім id)
export type CreatePostData = Omit<IPost, 'id'>

// Створюємо тип UpdatePostData, необхідних для оновлення поста (усі поля є необов'язковими, поле id не потрібне)
export type UpdatePostData = Partial<CreatePostData>

// Omit - створює новий тип, виключаючи вказані властивості з існуючого типу
// Partial - створює новий тип, роблячи всі властивості існуючого типу необов'язковими

// Створюємо інтерфейси для типізації об'єкту Controller
export interface IPostServiceContract {
    // Типізація методів об'єкта postService
    // Назва методу: (параметр: тип) => те, що повертає фунція
    getAllPosts: (skip?: number, take?: number) => IPost[]; // Повертає масив постів (IPost[])        
    getPostsById: (id: number) => IPost | null; // Повертає один пост або null (якщо поста не знайдено)
    createPost: (data: CreatePostData) => Promise<IPost | null>; // Повертає Promise (через асинхронність методу), який буде 'розпакований' на створений пост або null (якщо пост не створено)             
    updatePost: (id: number, data: UpdatePostData) => Promise<IPost | null>;  // Повертає Promise (через асинхронність методу), який буде 'розпакований' на оновлений пост або null (якщо пост не оновлено)
}

export interface IPostControllerContract {
    // Типізація методів об'єкта postController
    // Назва методу: (типізація параметрів req і res) => void (за правилом функція в controller-і нічого не повертає)

    /* Типіація параметру req:
        1 параметр - типізація Route параметрів (це завжди об'єкт Object, якщо немає вказаних конкретних route параметрів, якщо вони вказані, то передаємо об'єкт з їх типізацією)
        2 параметр - типізація того, що повертає метод (у нашому випадку це або масив постів IPost[] (якщо все успішно) або рядок string з повідомленням про помилку)
        3 параметр - типізація тіла req (body) (якщо запит не має body, то просто об'єкт Object, але якщо тіло запиту є, то ми повинні вказати інтерфейс з типізацією того, що ми хочемо додати в саме тіло)
        4 параметр - типізація Query параметрів (це або ж об'єкт з конкретною типізацією параметрів, або ж просто  Object)
    */

    getAllPosts: (
        req: Request<object, IPost[] | string, object, { skip?: string; take?: string }>, 
        res: Response<IPost[] | string>
    ) => void

    getPostsById: (
        req: Request<{ id: string }, IPost | string, object>, 
        res: Response<IPost | string>
    ) => void

    createPost: (
        req: Request<object, IPost | string, CreatePostData>, 
        res: Response<IPost | string>
    ) => void

    updatePost: (
        req: Request<{ id: string }, IPost | string, UpdatePostData>, 
        res: Response<IPost | string>
    ) => void
}   