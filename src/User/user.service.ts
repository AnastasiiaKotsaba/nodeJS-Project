import { UserServiceContract } from './user.types'
import { userRepository } from './user.repository'
import { sign } from 'jsonwebtoken'
import { ENV } from '../config/env'
import { hash, compare } from 'bcrypt'

export const userService: UserServiceContract = {
    async login(data) {
        // Знаходим користувача за email
		const user = await userRepository.findUserByEmail(data.email);

        // Якщо користувача не знайдено, повертаємо повідомлення про помилку
		if (!user){ return "Not found" } 

        // Перевіряємо чи співпадають паролі
		const matchedPasswords = await compare(data.password, user.password)

        // Якщо паролі не співпадають, повертаємо повідомлення про помилку
		if (!matchedPasswords){
			return "You entered wrong credentials"
		} 

        // Cnструюємо JWT токен
        // Для sign({по чому саме кодуємо токен}, 'секретний ключ (по чому будемо знаходити)', {хедерси (через скільки днів токен буде не діійсним)})
		const token = sign({id: user.id}, ENV.SECRET_KEY, {
		    expiresIn: "7d"
		})

        // Після успішної авторизації повертаємо токен
		return {token}
	},

	async registration(data) {
        // Знаходим користувача за email
		const user = await userRepository.findUserByEmail(data.email)

        // Якщо користувач вже існує, повертаємо повідомлення про помилку
		if (user) {
			return "User already exists with this email"
		}

		// Створюємо хешований пароль (основний пароль 'солимо' 10 разів)
		const hashedPassword = await hash(data.password, 10)

		// Cтворюємо новий об'єкт користувача з хешованим паролем
		const newUserData = {
			...data,
			password: hashedPassword,
		}

        // Якщо користувача не існує, створюємо нового
		const createdUser = await userRepository.createUser(newUserData)

        // Токен для кодування даних нового користувача
		const token = sign({id: createdUser.id}, ENV.SECRET_KEY, { expiresIn: "7d" })

		return {token} 
	},
	
    async me(id) {
        // Знаходимо користувача по id
		const me = await userRepository.findUserById(id)

        // Якщо користувача не знайдено, повертаємо повідомлення про помилку
		if(!me) { return "User was not found" }

        // Повертаємо інформацію про користувача
		return me
	}
};

