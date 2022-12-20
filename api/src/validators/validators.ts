import { Request, Response, NextFunction } from 'express'
import { check, validationResult } from 'express-validator'

export const registerUserValidaton = [
  check('username').notEmpty().withMessage('Must provide username.'),
  check('firstname')
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage('Must provide first name.'),
  check('lastname')
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage('Must provide last name.'),
  check('email')
    .notEmpty()
    .normalizeEmail()
    .isEmail()
    .withMessage('Not a valid email address.'),
  check('password')
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters.'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const validationErrors: string[] = errors
        .array()
        .map((error) => error.msg)
      return res.status(404).json({
        validationErrors,
      })
    }
    return next()
  },
]

export const loginUserValidaton = [
  check('username').notEmpty().withMessage('Must provide valid username.'),
  check('password').notEmpty().withMessage('Must provide valid password.'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const validationErrors: string[] = errors
        .array()
        .map((error) => error.msg)
      return res.status(404).json({
        validationErrors,
      })
    }
    return next()
  },
]

export const BookValidaton = [
  check('title')
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage('Must provide title with min 2 characters.'),
  check('author')
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage('Must provide author with min 2 characters.'),
  check('publishDate').notEmpty().withMessage('Must provide date.'),
  check('description')
    .notEmpty()
    .isLength({ min: 20 })
    .withMessage('Content body must be at least 20 characters.'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const validationErrors: string[] = errors
        .array()
        .map((error) => error.msg)
      return res.status(404).json({
        validationErrors,
      })
    }
    return next()
  },
]

export const updateUserValidaton = [
  check('username')
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage('Must provide a username with min 2 charaters.'),
  check('firstname')
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage('Must provide a first name with min 2 charaters.'),
  check('lastname')
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage('Must provide a last name with min 2 charaters.'),
  check('email')
    .notEmpty()
    .normalizeEmail()
    .isEmail()
    .withMessage('Not a valid email address.'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const validationErrors: string[] = errors
        .array()
        .map((error) => error.msg)
      return res.status(404).json({
        validationErrors,
      })
    }
    return next()
  },
]

export const updatePasswordValidation = [
  check('oldpassword')
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters.'),
  check('newpassword')
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters.'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const validationErrors: string[] = errors
        .array()
        .map((error) => error.msg)
      return res.status(404).json({
        validationErrors,
      })
    }
    return next()
  },
]

//add author validation here
export const authorValidation = [
  check('name')
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage('name must be at least 2 characters.'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const validationErrors: string[] = errors
        .array()
        .map((error) => error.msg)
      return res.status(404).json({
        validationErrors,
      })
    }
    return next()
  },
]
