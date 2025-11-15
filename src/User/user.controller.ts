import type {AuthenticatedUser, UserControllerContract } from "./user.types"
import { userService } from "./user.service"
import { verify } from "jsonwebtoken"
import { ENV } from "../config/env"


export const userController: UserControllerContract = {
	async login(req, res) {
        // Авторизація користувача
		const authUser = await userService.login(req.body)

		if (typeof authUser === "string") {
			if (authUser === "You entered wrong credentials") {
				res.status(422).json({message: authUser})
			} else if (authUser === "User was not found") {
				res.status(404).json({message: authUser})
			} else {
				res.status(500).json({
					message: "Unknown error. Please, try again",
				})
			}
			return
		}

		res.status(200).json(authUser)
	},

	async registration(req, res) {
        // Реєстрація користувача
		const regUser = await userService.registration(req.body)

		if (typeof regUser === "string") {
			if (regUser === "User already exists with this email") {
                // 409 - користувач вже існує з такою поштою
				res.status(409).json({message: regUser})
			} else {
				res.status(500).json({
					message: "Unknown error. Please, try again",
				})
			}
			return
		}
        
		res.status(200).json(regUser)
	},

	async me(req, res) {
        // Отримання інформації про авторизованого користувача з хедесів авторизації
		const authorizationInfo = req.headers.authorization

        // Якщо інформація про авторизацію відсутня, повертаємо помилку 401
		if (!authorizationInfo) {
			res.status(401).json({
				message: "Authorization is required. Please, provide authorization info",
			})
			return
		}

        // Розділяємо тип токена і сам токен по пробілу (формат: Bearer token), бо в хедері приходить рядок
		const[typeToken, token] = authorizationInfo.split(" ")

        // Перевіряємо чи тип токена Bearer і чи токен взагалі існує
		if (typeToken !== "Bearer" || !token){
			res.status(401).json({
				message: "invalid authorization. Use Bearer token"
			})
			return
		}
		
		try {
            // Розкодуємо токен за допомогою секретного ключа
            // Для verify((те, що розшифровуємо), 'секретний ключ (по чому будемо знаходити)')
            // as AuthenticatedUser - тип розкодованого токена
			const decodedToken = verify(token, ENV.SECRET_KEY) as AuthenticatedUser
			
            // Отримуємо інформацію про користувача за id з розкодованого токена
			const me = await userService.me(decodedToken.id)

            // Якщо користувача не знайдено, повертаємо помилку 404
			if (typeof me === 'string') {
				res.status(404).json({
					message: 'User was not found'
				})
				return
			}
			res.status(200).json(me)

        // Виводимо помилки
		} catch (error) {
			res.status(401).json({
				message: 'Was entered invalid token'
			})
		}
	},
};
