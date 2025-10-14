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