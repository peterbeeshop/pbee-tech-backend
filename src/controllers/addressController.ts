import { Request, Response } from 'express'
import Address from '../models/Address'

export const getAllAddress = async (req: Request, res: Response) => {
  try {
    const addresses = await Address.find({})
    res.json(addresses)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getAddressForUser = async (req: Request, res: Response) => {
  const { userId } = req.cookies
  try {
    const address = await Address.find({ user: userId })
    res.json(address)
  } catch (error) {}
}

export const createAddress = async (req: Request, res: Response) => {
  const { userId } = req.cookies
  console.log(userId)
  try {
    const { fullName, street, city, province, phoneNumber } = req.body
    const address = await Address.create({
      user: userId,
      fullName,
      street,
      city,
      province,
      phoneNumber,
    })
    res.json(address)
  } catch (error) {
    res.status(500).json({
      error: 'Error occured while creating address. Please try again!',
    })
  }
}
