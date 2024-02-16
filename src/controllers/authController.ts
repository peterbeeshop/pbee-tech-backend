import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'

const secretKey = process.env.JWT_SECRET_KEY!

const maxAge = 3 * 24 * 60 * 60 //3 days

const isProduction = process.env.NODE_ENV === 'production'

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
      res.status(404).json({ message: 'No user was found. Create account' })
    } else {
      //if a user was found, we check if the password they entered == the one saved in the db
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) res.status(500).json({ message: err.message })
        if (result) {
          const token = createToken(user._id)
          res
            .cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
            .status(200)
            .json({ user, token })
        } else
          res.status(401).json({ message: 'Invalid email adress or password!' }) //if the passwords didn't match
      })
    }
  })
}

export const signup = (req: Request, res: Response) => {
  const { email, password } = req.body
  User.findOne({ email }).then(user => {
    if (user) {
      res.status(409).json({
        message: 'A user with that email already exists. Please login!',
      })
    } else {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)
      User.create({ email, password: hash })
        .then(createdUser => {
          const token = createToken(createdUser._id)
          res
            .cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
            .status(201)
            .json({ user: createdUser, token })
        })
        .catch(error => res.status(500).json({ message: error.message }))
    }
  })
}

export const logout = (req: Request, res: Response) => {
  console.log('cookie', req.cookies.jwt)
  res.clearCookie('jwt').json('User has been logged out')
}
