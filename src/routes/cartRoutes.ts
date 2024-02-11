import { Router } from 'express'
import {
  addToCart,
  itemsInCart,
  removeItemFromCart,
} from '../controllers/cartController'
import { authenticateUser } from '../middlewares/authMiddleware'

const router = Router()

router.get('/cart', authenticateUser, itemsInCart)

router.post('/cart', authenticateUser, addToCart)

router.post('/delete-item-from-cart', authenticateUser, removeItemFromCart)

export default router
