import { UserServiceContract, CreateUser } from './user.types'
import { userRepository } from './user.repository'
import { sign } from 'jsonwebtoken'

export const userService: UserServiceContract = {
    registration: async (data: CreateUser) => {
        const createdUser = await userRepository.createUser(data)
        return createdUser
    },

    login: async (email, password) => {
        const neededUser = await userRepository.findUserByEmail(email)

        if(!neededUser){
            return  "not found user"
        }

        // Створюємо змінну яка перевіряє, чи співпадають паролі при авторизації
        const matchPassword = password === neededUser.password

        if(!matchPassword){
            return "wrong password"
        }
        const token = sign(neededUser.id, "", {
            expiredAt: "7d"
        })
        return neededUser
    }
}
