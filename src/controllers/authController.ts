import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User'

export const signup = (req: Request, res: Response) => {
  const { email, password } = req.body
  User.findOne({ email }).then(user => {
    if (user) {
      res.send('User already exists. Login in')
    } else {
      let salt = bcrypt.genSaltSync(10)
      let hash = bcrypt.hashSync(password, salt)
      User.create({ email, password: hash })
        .then(createdUser => res.send(createdUser))
        .catch(err => res.send(err))
    }
  })
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
          res
            .cookie('userId', user._id, { maxAge: 1200000 })
            .send('successfully logged in.')
        } else res.send('incorrect password') //if the passwords didn't match
      })
    }
  })
}
