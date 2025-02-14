import express from 'express'
import {registerUser, loginUser, userCoins, addCoins} from '../controllers/userController.js'
import userAuth from '../middlewares/auth.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/coins', userAuth, userCoins)
userRouter.post('/add-coins', addCoins)

export default userRouter

//http://localhost:4000/api/user/register
//http://localhost:4000/api/user/login