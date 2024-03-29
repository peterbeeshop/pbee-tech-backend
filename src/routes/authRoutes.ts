import { signup, login, logout } from '../controllers/authController'
import { Router } from 'express'
import User from '../models/User'

const router = Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)

router.get('/users', (req, res) => {
  User.find({})
    .then(users => {
      res.send(users)
    })
    .catch(err => res.send(err))
})

export default router
