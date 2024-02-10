// authMiddleware.js
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('secret in authmidd:', process.env.JWT_SECRET_KEY)
  console.log('starting to authenticate user')
  const secretKey = process.env.JWT_SECRET_KEY!
  const token = req.cookies.jwt
  if (token) {
    const decoded = jwt.verify(token, secretKey)
    console.log('token exists')
    try {
      if (decoded) {
        console.log(decoded)
        next()
      }
    } catch (error) {
      res.status(401).json({ err: error })
    }
  } else {
    res.status(401).json({ error: 'JWT Token is invalid' })
  }
}
