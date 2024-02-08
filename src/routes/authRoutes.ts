import { signup,login } from "../controllers/authController";
import { Router } from "express";
import User from "../models/User/user";

const router = Router();

router.post('/signup', signup)
router.post('/login', login)
router.get('/users', (req, res) => {
    User.find({}).then(users => {
        res.send(users)
    }).catch(err => res.send(err))
})
router.delete('/users', (req, res) => {
    User.deleteMany()
})

export default router;