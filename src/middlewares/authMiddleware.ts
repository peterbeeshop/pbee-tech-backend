// authMiddleware.js
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

function authenticateUser(req: Request, res: Response, next: NextFunction) {
  // const {jwt}
}

module.exports = authenticateUser
