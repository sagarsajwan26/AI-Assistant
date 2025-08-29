import Router from 'express'
import { Login, logout, signUp } from '../controllers/auth.controller.js'

const router = Router()

router.route('/signup').post(signUp)
router.route('/login').post(Login)
router.route('/logout').get(logout)

export default router