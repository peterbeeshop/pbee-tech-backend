//gets the value of the current logged in user;

import { Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export const currentUser = (req: Request, res: Response) => {
  const secretKey = process.env.JWT_SECRET_KEY!
  const token = req.cookies.jwt
  let payload

  const isValid = jwt.verify(token, secretKey)
  if (isValid) {
    const value = isValid as JwtPayload
    payload = value.id //returns to us the id of the current logged in user;
  }
  return payload
}
