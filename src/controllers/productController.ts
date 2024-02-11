import { Request, Response } from 'express'
import Product from '../models/Product'

export const getProducts = (req: Request, res: Response) => {
  const products = Product.find({})
  products.then(product => res.json(product)).catch(err => res.send(err))
}

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, description, quantity, image } = req.body

  try {
    const products = await Product.create({
      name,
      price,
      description,
      quantity,
      image,
    })
    res.json({ products })
  } catch (error) {
    res.json({ error })
  }
}
