import { Request, Response } from 'express'
import { currentUser } from '../helpers/currentUser'
import Product from '../models/Product'
import User from '../models/User'

export const addToCart = async (req: Request, res: Response) => {
  const { productId } = req.body
  const userId = currentUser(req, res)
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $push: { cart: productId } },
    { new: true },
  )

  if (updatedUser) {
    res.status(200).send(updatedUser)
  } else {
    res.status(400).json({
      error: 'There was an error adding item to cart. Please try again!',
    })
  }
}

export const itemsInCart = async (req: Request, res: Response) => {
  const userId = currentUser(req, res)
  const user = await User.findById(userId)

  if (user) {
    const cartItems = await Promise.all(
      user.cart.map(async (id: any) => {
        const prod = await Product.findById(id)
        return prod
      }),
    )
    res.status(200).json(cartItems)
  } else {
    res.json({ error: 'No user was found.' })
  }
}

export const removeItemFromCart = async (req: Request, res: Response) => {
  const { productId } = req.body
  const userId = currentUser(req, res)
  const updatedUser = await User.findByIdAndUpdate(
    { _id: userId },
    { $pull: { cart: productId } }, //$pull is an update operator used to remove an item from an array in mongoose
    { new: true },
  )

  if (updatedUser) {
    res.status(200).json(updatedUser)
  } else {
    res.status(400).json({
      error: 'There was an error deleting item from cart. Please try again!',
    })
  }
}
