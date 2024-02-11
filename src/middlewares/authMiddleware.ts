import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const secretKey = process.env.JWT_SECRET_KEY!
  const token = req.cookies.jwt

  if (token) {
    const isValid = jwt.verify(token, secretKey)

    if (isValid) {
      next()
    } else {
      res.status(401).json({ err: 'JWT Token is invalid or has expired.' })
    }
  } else {
    res.status(401).json({ error: 'Please sign in!' })
  }
}
