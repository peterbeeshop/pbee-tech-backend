import {
  getAllAddress,
  getAddressForUser,
  createAddress,
} from '../controllers/addressController'
import { Router } from 'express'
import { authenticateUser } from '../middlewares/authMiddleware'

const router = Router()

//get all the address in the db
router.get('/address', authenticateUser, getAddressForUser)

router.get('/all-address', getAllAddress)

router.post('/address', createAddress)

export default router
