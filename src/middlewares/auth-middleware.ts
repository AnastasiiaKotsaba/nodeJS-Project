import type { Request, Response, NextFunction } from "express"
import { AuthenticatedUser } from "../User/user.types"
import { verify } from "jsonwebtoken"
import { ENV } from "../config/env"

// Створюємо проміжний обробник (middleware) для авторизації користувача 
// Якщо раніше запит від файлу router потрапляв до контролера,
// то тепер він спочатку потрапляє сюди, обробляється, а потім вже йде до контролера

// Параметр next потрібен для того, щоб передати запит наступному проміжному обробнику або контролеру
export function authMiddleware(req: Request, res: Response<object, {idUser: number}>, next: NextFunction) {
    // Отримуємо інформаціюю про зареєстрованого користувача із заголовків запиту
    const authorization = req.headers.authorization 

    // Перевіряємо, чи взагалі був авторизований користувач
    if (!authorization) {
        res.status(401).json({
            message: "Please, login first",
        }) 
        return 
    }
    
    // Сплітуємо отриманий заголовок на тип токена і сам токен
    const [typeToken, token] = authorization.split(" ") 
    
    // Перевіряємо, чи передана була саме інформація користувача (чи був це Bearer токен)
    if (typeToken !== "Bearer" || !token) {
        res.status(401).json({
            message: "To login use only bearer token",
        }) 
        return 
    }

    // Перевіряємо валідність токена
    try {
        // Розшифровуємо токен за допомогою секретного ключа
        // Для verify((те, що розшифровуємо), 'секретний ключ (по чому будемо знаходити)')
        // as AuthenticatedUser - тип розкодованого токена
        const decodedToken = verify(token, ENV.SECRET_KEY) as AuthenticatedUser 

        // Додаємо id користувача в об'єкт res.locals
        // res.locals - потрібно для того, щоб контролер міг отримати інформацію про користувача
        res.locals.idUser = decodedToken.id
        // Відправляємо запит далі до контролера
        next()

    } catch (error) {
        console.log(error) 
        res.status(401).json({
            message: "invalid token",
        }) 
    }
}

