import { Request, Response, NextFunction, RequestHandler } from 'express'
import Book from '../models/Book'
import { BadRequestError, errorRes } from '../helpers/apiError'
import { v4 } from 'uuid'
import { successRes } from '../helpers/apiSuccess'
import Author from '../models/Author'
import User from '../models/User'

// POST /books
export const createBook: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ISBN, title, description, publisher, author, status, publishDate } =
      req.body

    const newBook = new Book({
      bookId: v4(),
      ISBN,
      title,
      description,
      publisher,
      author,
      status,
      borrowId: v4(),
      publishDate,
    })

    const foundAuthor = await Author.findOne({ name: author })
    //if author already exists
    if (foundAuthor) {
      newBook.author = { _id: foundAuthor._id }
      foundAuthor.writtenBooks.push({ _id: newBook._id })
      await foundAuthor.save()
    } else {
      // if adding a book with a new author
      const newAuthor = new Author({
        name: author,
        writtenBooks: [{ _id: newBook._id }],
      })
      await newAuthor.save()
      newBook.author = { _id: newAuthor._id }
    }
    const savedBook = await newBook.save()
    if (!savedBook) {
      return errorRes(res, 400, 'Could not create new book')
    }
    return successRes(res, 201, 'Added new book', savedBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /books/:bookId
export const updateBook: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    let newAuthor
    const { bookId } = req.params
    const foundBook = await Book.findOne({ _id: bookId })
    if (!foundBook) {
      return errorRes(res, 404, `Book ${bookId} not found`)
    }
    //if the author is also changed:
    if (foundBook.author !== update.author) {
      //take the book out of the old author written books
      const oldAuthor = await Author.findOne({ _id: foundBook.author })
      if (!oldAuthor) {
        return errorRes(res, 404, 'Old author not found')
      }
      const oldAuthorBooks = [...oldAuthor.writtenBooks]
      //filter all books to take out current book
      const newBooks = [...oldAuthorBooks].filter(
        (book) => book._id.toString() !== bookId.toString()
      )
      oldAuthor.writtenBooks = newBooks
      await oldAuthor.save()
      const foundAuthor = await Author.findOne({ name: update.author })
      //if the author already exists in the database:
      if (foundAuthor) {
        // add this new book details to the written books of author
        foundAuthor.writtenBooks.push({ _id: bookId })
        await foundAuthor.save()
        newAuthor = {
          _id: foundAuthor._id,
        }
      } else if (!foundAuthor) {
        //if author does not exist yet, create a new author
        const addAuthor = new Author({
          name: update.author,
          writtenBooks: [
            {
              _id: bookId,
            },
          ],
        })
        await addAuthor.save()
        newAuthor = {
          _id: addAuthor._id,
        }
      }
      update.author = newAuthor
    }
    await Book.findByIdAndUpdate(bookId, update, {
      new: true,
    })
    const updatedBook = await Book.findOne({ _id: bookId }).populate(
      'author',
      'name'
    )
    if (!updatedBook) {
      return errorRes(res, 400, 'Could not update book')
    }
    return successRes(res, 200, 'Updated book succesfully', updatedBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// // DELETE /books/:bookId
export const deleteBook: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params
    await Book.findByIdAndDelete(bookId)
    return successRes(res, 200, 'Deleted book successfully')
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /books/:bookId
export const findBookById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params
    const foundBook = await Book.findOne({ _id: bookId })
    if (!foundBook) {
      return errorRes(res, 404, `Book ${bookId} not found`)
    }
    return successRes(res, 200, 'Found book', foundBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /books
export const findAllBooks: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const search = req.query.search ? req.query.search : ''
    const allBooks = await Book.find({
      $or: [
        { title: { $regex: '.*' + search + '.*', $options: 'i' } },
        { publisher: { $regex: '.*' + search + '.*', $options: 'i' } },
        { ISBN: { $regex: '.*' + search + '.*', $options: 'i' } },
      ],
    }).populate('author')

    if (!allBooks) {
      errorRes(res, 404, 'Could not find any books')
    }
    successRes(res, 200, 'success', allBooks)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// /borrowBook
export const borrowBook: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.body
    const { userId } = req.body
    const foundBook = await Book.findOne({ _id: bookId })
    if (!foundBook) {
      return errorRes(res, 404, `Could not find book with ${bookId}`)
    }
    if (foundBook.status === false) {
      return errorRes(res, 400, 'This book is currently unavailable')
    }
    const foundUser = await User.findOne({ _id: userId })
    if (!foundUser) {
      return errorRes(res, 404, `Could not find user with ${userId}`)
    }

    foundUser.borrowedBooks = [...foundUser.borrowedBooks, foundBook]
    await foundUser.save()

    // set up borrow and return date for the book
    const today = new Date() //date now
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()
    const formatDate = mm + '/' + dd + '/' + yyyy
    const returnDate = new Date() //date now
    returnDate.setDate(returnDate.getDate() + 30) // Set now + 30 days as the new date
    const returnDd = String(returnDate.getDate()).padStart(2, '0')
    const returnMm = String(returnDate.getMonth() + 1).padStart(2, '0')
    const returnYyyy = returnDate.getFullYear()
    const returnFormatDate = returnMm + '/' + returnDd + '/' + returnYyyy

    const updatedStatusBook = await Book.findOneAndUpdate(
      { _id: bookId },
      {
        status: false,
        borrowDate: formatDate,
        returnDate: returnFormatDate,
        borrowId: v4(),
      },
      { new: true }
    )
    if (!updatedStatusBook) {
      return errorRes(res, 400, 'Could not borrow book')
    }
    return successRes(
      res,
      200,
      'Checked out book successfully!',
      updatedStatusBook
    )
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// /returnBook
export const returnBook: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.body
    const { userId } = req.body
    const foundBook = await Book.findOne({ _id: bookId })
    if (!foundBook) {
      return errorRes(res, 404, `Could not find book with ${bookId}`)
    }
    const foundUser = await User.findOne({ _id: userId })
    if (!foundUser) {
      return errorRes(res, 404, `Could not find user with ${userId}`)
    }
    const oldBorrowedBooks = [...foundUser.borrowedBooks]
    //filter all books to take out current book
    const newBooks = [...oldBorrowedBooks].filter(
      (book) => book._id.toString() !== bookId.toString()
    )

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        borrowedBooks: newBooks,
      },
      {
        new: true,
      }
    )
    if (!updatedUser) {
      return errorRes(res, 404, 'Could not update user books information')
    }

    const updatedStatusBook = await Book.findOneAndUpdate(
      { _id: bookId },
      {
        status: true,
        borrowDate: '',
        returnDate: '',
      },
      { new: true }
    )
    if (!updatedStatusBook) {
      return errorRes(res, 400, 'Could not return book')
    }
    return successRes(
      res,
      200,
      'Returned book successfully!',
      updatedStatusBook
    )
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
