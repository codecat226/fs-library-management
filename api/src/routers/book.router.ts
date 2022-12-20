import express from 'express'

import {
  createBook,
  findAllBooks,
  findBookById,
  deleteBook,
  updateBook,
  borrowBook,
  returnBook,
} from '../controllers/book.controller'

// MIDDLEWARES
import { isAdmin } from '../middlewares/isAdmin'
import { isAuthorised } from '../middlewares/isAuthorised'

const router = express.Router()

router.get('/', isAuthorised, findAllBooks)
router.get('/:bookId', isAuthorised, findBookById)
router.put('/:bookId', isAuthorised, isAdmin, updateBook)
router.delete('/:bookId', isAuthorised, isAdmin, deleteBook)
router.post('/', isAuthorised, isAdmin, createBook)

// BORROW/RETURN BOOKS
router.post('/borrow', isAuthorised, borrowBook)
router.post('/return', isAuthorised, returnBook)

export default router

/**
 * @swagger
 * components:
 *  schemas:
 *    Book:
 *      type: object
 *      required:
 *        - bookId
 *        - ISBN
 *        - title
 *        - author
 *        - status
 *        - publishDate
 *        - description
 *        - publisher
 *      properties:
 *        bookId:
 *          type: string
 *          description: auto generated id of the book
 *        ISBN:
 *          type: string
 *          description: ISBN of book
 *        title:
 *          type: string
 *          description: title of the book
 *        description:
 *          type: string
 *          description: description of the book
 *        publisher:
 *            type: string
 *            description: publish of the book
 *        author:
 *            type: string
 *            description: author of the book
 *        status:
 *            type: boolean
 *            description: status for availability of book (true/false)
 *        borrowId:
 *            type: string
 *            description: auto generated id of the book
 *        publishDate:
 *            type: string
 *            description: publish date of book
 *        borrowDate:
 *            type: string
 *            description: auto generated borrow date of the book
 *        returnDate:
 *            type: string
 *            description: auto generated return date of the book
 *      example:
 *            bookId: 2
 *            ISBN: 978-3-16-148410-1
 *            title: Harry Potter and the Chamber of Secrets
 *            description: Harry Potter, an eleven-year-old orphan, discovers that he is a wizard
 *            publisher: bloomsbury
 *            author: J.K. Rowling
 *            status: false
 *            borrowId: 4324
 *            publishDate: 28/02/1999
 *            borrowDate: 29/06/2022
 *            returnDate: 28/07/2022
 */

// grouping requests into tags
/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Library App - Books API
 */

// get request for all books
/**
 * @swagger
 * /api/v1/books:
 *  get:
 *    summary: returns all the books
 *    tags: [Books]
 *    responses:
 *      200:
 *        description: all the books
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Book'
 *      404:
 *        description: the books were not found
 */

// get request for single book
/**
 * @swagger
 * /books/{id}:
 *  get:
 *    summary: get the book with id
 *    tags: [Books]
 *    parameters:
 *      - in : path
 *        name : id
 *        schema:
 *          type: string
 *        required: true
 *        description: book id
 *    responses:
 *      200:
 *        description: the book with id
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Book'
 *      404:
 *        description: the book with id was not found
 */

// post request
/**
 * @swagger
 * /books:
 *  post:
 *    summary: create a new book
 *    tags: [Books]
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Book'
 *    responses:
 *      201:
 *        description: the book was created
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Book'
 *      404:
 *        description: the book with id was not found
 *      500:
 *        description: server error
 */

// put request

/**
 * @swagger
 * /books/{id}:
 *  put:
 *    summary: update the book with id
 *    tags: [Books]
 *    parameters:
 *      - in : path
 *        name : id
 *        schema:
 *          type: string
 *        required: true
 *        description: book id
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Book'
 *    responses:
 *      200:
 *        description: the book was updated
 *      404:
 *        description: the book with id was not found
 *      500:
 *        description: server error
 */

// delete request

/**
 * @swagger
 * /books/{id}:
 *  delete:
 *    summary: delete the book with id
 *    tags: [Books]
 *    parameters:
 *      - in : path
 *        name : id
 *        schema:
 *          type: string
 *        required: true
 *        description: book id
 *    responses:
 *      200:
 *        description: the book was deleted
 *      404:
 *        description: the book with id was not found
 */

// post request
/**
 * @swagger
 * /books/borrow:
 *  post:
 *    summary: borrow a new book
 *    tags: [Books]
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *                type: object
 *                required:
 *                  - bookId
 *                  - userId
 *                properties:
 *                  bookId:
 *                    type: string
 *                  userId:
 *                    type: string
 *    responses:
 *      201:
 *        description: the book was borrowed
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Book'
 *      404:
 *        description: the book/user with id was not found
 *      400:
 *        description: the book is currently unavailable
 *      500:
 *        description: server error
 */

// post request
/**
 * @swagger
 * /books/return:
 *  post:
 *    summary: return a book
 *    tags: [Books]
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *                type: object
 *                required:
 *                  - bookId
 *                  - userId
 *                properties:
 *                  bookId:
 *                    type: string
 *                  userId:
 *                    type: string
 *    responses:
 *      201:
 *        description: the book was returned
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Book'
 *      404:
 *        description: the book/user with id was not found
 *      400:
 *        description: could not return book
 *      500:
 *        description: server error
 */
