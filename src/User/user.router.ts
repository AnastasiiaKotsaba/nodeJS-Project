import { Router } from 'express'
import { userController } from './user.controller' 

const userRouter = Router() 

userRouter.post('/login', userController.login)
userRouter.post('/register', userController.registration)
userRouter.get('/me', userController.me)

export default userRouter