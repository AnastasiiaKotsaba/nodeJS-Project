import { Router } from 'express'
import { userController } from './user.controller' 
import { authMiddleware } from '../middlewares/auth-middleware'

const userRouter = Router() 

userRouter.post('/login', userController.login)
userRouter.post('/register', userController.registration)
userRouter.get('/me', authMiddleware, userController.me)

export default userRouter