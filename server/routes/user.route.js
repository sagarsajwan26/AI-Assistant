import Router from 'express'
import { askToAssistant, getCurrentUser,updateAssistant } from '../controllers/user.controller.js'
import { isAuth } from '../middleware/isAuth.js'

import { upload } from '../middleware/multer.js'


const router = Router()

router.route('/current').get(isAuth,getCurrentUser)
router.route('/update').post(isAuth,upload.single('assistantImage'),updateAssistant)
router.route('/askToAssistant').post(isAuth,askToAssistant)
export default router