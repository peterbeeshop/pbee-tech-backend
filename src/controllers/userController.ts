import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { currentUser } from '../helpers/currentUser'
import User from '../models/User'

export const editName = async (req: Request, res: Response) => {
  const { firstName, lastName } = req.body
  const userId = currentUser(req, res)
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { firstName, lastName },
    { new: true },
  )

  if (updatedUser) {
    res
      .status(200)
      .json({
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
      })
  } else {
    res.status(404).json({ message: 'Could not find user' })
  }
}

export const editEmail = async (req: Request, res: Response) => {
  const { email } = req.body
  const userId = currentUser(req, res)
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { email },
    { new: true },
  )

  if (updatedUser) {
    res.status(200).json(updatedUser)
  } else {
    res.json({ error: 'Could not find user' })
  }
}

export const editPassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body
  const userId = currentUser(req, res)
  const user = await User.findById(userId)

  if (user) {
    bcrypt.compare(oldPassword, user?.password, async (err, decoded) => {
      if (err) {
        res.status(500).json({ error: 'An error occured on the server' })
      }
      if (decoded) {
        // Hash the new password before updating
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword
        user
          .save()
          .then(updatedUser => {
            res.json('Your password has been changed successfully!')
          })
          .catch(error => res.send({ error }))
      } else {
        res.status(401).json({ error: 'Incorrect passord.' })
      }
    })
  } else {
    res.status(404).json({ error: 'No user was found' })
  }
}
