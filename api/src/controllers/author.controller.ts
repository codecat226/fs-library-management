import { Request, Response, NextFunction, RequestHandler } from 'express'
import { BadRequestError, errorRes } from '../helpers/apiError'
import { successRes } from '../helpers/apiSuccess'
import Author from '../models/Author'

export const createAuthor: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body

    const author = new Author({
      name: name,
      writtenBooks: [],
    })
    const newAuthor = await author.save()
    if (!newAuthor) {
      return errorRes(res, 400, 'Could not create new author')
    }
    return successRes(res, 201, 'author created', newAuthor)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const updateAuthor: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const { authorId } = req.params
    const foundAuthor = Author.findOne({ _id: authorId })
    if (!foundAuthor) {
      return errorRes(res, 404, `Could not find author with ${authorId}`)
    }
    const updatedAuthor = await Author.findByIdAndUpdate(authorId, update, {
      new: true,
    })
    if (!updatedAuthor) {
      return res.status(400).send({ message: 'Could not update author' })
    }
    const populateUpdatedAuthor = await Author.findOne({
      _id: authorId,
    }).populate('writtenBooks')
    if (populateUpdatedAuthor) {
      return successRes(res, 200, 'author updated', populateUpdatedAuthor)
    }
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const deleteAuthor: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorId } = req.params
    const foundAuthor = await Author.findOne({ _id: authorId })
    if (!foundAuthor) {
      return res.status(404).send({ message: `Author ${authorId} not found` })
    }
    await Author.findByIdAndDelete(authorId)
    return successRes(res, 200, 'author deleted', foundAuthor)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const findAuthorById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorId } = req.params
    const foundAuthor = await Author.findById(authorId)
    if (!foundAuthor) {
      return res.status(404).send({ message: `Author ${authorId} not found` })
    }
    return successRes(res, 200, 'success', foundAuthor)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

//GET all authors
export const findAllAuthors: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allAuthors = await Author.find().populate('writtenBooks', 'title')
    if (!allAuthors) {
      return errorRes(res, 404, 'Could not find authors')
    }
    return successRes(res, 200, 'success', allAuthors)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
