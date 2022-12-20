import express, { Request, Response, NextFunction } from 'express'
import { errorRes } from '../helpers/apiError'
import User from '../models/User'
import { CustomRequest } from './isAuthorised'

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // use projection to not send password data to frontend
    const foundUser = await User.findOne({ _id: (req as CustomRequest).id })
    if (!foundUser) {
      return errorRes(res, 404, 'User does not exist')
    }
    if (foundUser.isAdmin === false) {
      return errorRes(res, 401, 'User is not authorised admin')
    }
    next()
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    })
  }
}
