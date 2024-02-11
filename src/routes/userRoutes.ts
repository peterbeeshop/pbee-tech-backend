import { Router } from 'express'
import {
  editEmail,
  editName,
  editPassword,
} from '../controllers/userController'

const router = Router()

router.post('/edit-name', editName)

router.post('/edit-email', editEmail)

router.post('/edit-password', editPassword)

export default router
