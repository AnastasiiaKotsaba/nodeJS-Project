import { client } from "../client/client" 
import { UserRepositoryContract } from "./user.types" 

export const userRepository: UserRepositoryContract = {
    async findUserByEmail(email) {
		try {
            // Знаходимо користувача за email
			return await client.user.findUnique({
				where: {
					email,
                },
            })
        // Якщо виникає помилка, виводимо в консоль
		} catch (error) {
			console.log(error)
			throw error
		}
	},

	async findUserById(id) {
        try {
            // Знаходимо користувача за id та виключаємо пароль з результату
            return await client.user.findUnique({
				where: {
                    id,
				},
				omit:{
                    password: true
				}
			})

		} catch (error) {
			console.log(error)
			throw error
		}
	},

    async createUser(data) {
        try {
            // Створюємо нового користувача 
            return await client.user.create({
                data,
            })

        } catch (error) {
            console.log(error)
            throw error
        }
    }
}