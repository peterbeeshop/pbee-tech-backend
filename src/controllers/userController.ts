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
    res.status(200).json({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
    })
  } else {
    res.status(404).json({ message: 'Could not find user' })
  }
}

export const editEmail = async (req: Request, res: Response) => {
  const { email } = req.body //new email user wants to change to
  const userId = currentUser(req, res)
  const doesEmailExist = await User.find({ email })

  if (doesEmailExist.length !== 0) {
    res.status(401).json({ message: 'Email is already taken!' })
  } else {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { email },
      { new: true },
    )

    if (updatedUser) {
      res.status(200).json(updatedUser.email)
    } else {
      res.status(404).json({ message: 'Could not find user' })
    }
  }
}

export const editPassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body
  const userId = currentUser(req, res)
  const user = await User.findById(userId)

  if (user) {
    bcrypt.compare(oldPassword, user?.password, async (err, decoded) => {
      if (err) {
        res.status(500).json({ message: 'An error occured on the server' })
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
          .catch(error => res.status(500).json({ message: error.message }))
      } else {
        res.status(401).json({ error: 'Incorrect passord.' })
      }
    })
  } else {
    res.status(404).json({ error: 'No user was found' })
  }
}
