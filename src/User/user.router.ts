import { Router } from 'express'
import { userController } from './user.controller' 

const userRouter = Router() 

userRouter.get('/register', userController.registration)
userRouter.get('/login', userController.login)

export default userRouter