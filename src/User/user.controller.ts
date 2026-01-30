import type {UserControllerContract } from "./user.types"
import { userService } from "./user.service"

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
        // Отримуємо інформацію про користувача за id з розкодованого токена
		const me = await userService.me(res.locals.idUser)
		
		console.log(req.params)

        // Якщо користувача не знайдено, повертаємо помилку 404
		if (typeof me === 'string') {
			res.status(404).json({
				message: 'User was not found'
			})
			return
		}
		res.status(200).json(me)
	}
}
