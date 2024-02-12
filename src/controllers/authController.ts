import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'

const secretKey = process.env.JWT_SECRET_KEY!

const maxAge = 3 * 24 * 60 * 60 //3 days

if (!secretKey) {
  console.log('JWTSecretKey is not defined in the environment variables.')
  process.exit(1) // or handle the error appropriately
}
const createToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, secretKey, { expiresIn: maxAge })
}

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body
  User.findOne({ email }).then(user => {
    if (!user) {
      res.send('No user was found. Create account')
    } else {
      //if a user was found, we check if the password they entered == the one saved in the db
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) res.send(err.message)
        if (result) {
          const token = createToken(user._id)
          res
            .cookie('jwt', token, { maxAge: maxAge * 1000 })
            .status(200)
            .json(user)
        } else res.send('incorrect password') //if the passwords didn't match
      })
    }
  })
}

export const signup = (req: Request, res: Response) => {
  const { email, password } = req.body
  User.findOne({ email }).then(user => {
    if (user) {
      res
        .status(409)
        .send('A user with that email already exists. Please login!')
    } else {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)
      User.create({ email, password: hash })
        .then(createdUser => res.status(201).json(createdUser))
        .catch(error => res.json({ error }))
    }
  })
}

export const logout = (req: Request, res: Response) => {
  res.clearCookie('jwt').json('User has been logged out')
}
