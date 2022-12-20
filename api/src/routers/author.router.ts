import express from 'express'
import {
  createAuthor,
  deleteAuthor,
  findAllAuthors,
  findAuthorById,
  updateAuthor,
} from '../controllers/author.controller'

// MIDDLEWARES
import { isAdmin } from '../middlewares/isAdmin'
import { isAuthorised } from '../middlewares/isAuthorised'

const router = express.Router()

router.get('/', isAuthorised, findAllAuthors)
router.get('/:authorId', isAuthorised, findAuthorById)
router.put('/:authorId', isAuthorised, isAdmin, updateAuthor)
router.delete('/:authorId', isAuthorised, isAdmin, deleteAuthor)
router.post('/', isAuthorised, isAdmin, createAuthor)

export default router

/**
 * @swagger
 * components:
 *  schemas:
 *    Author:
 *      type: object
 *      required:
 *        - name
 *        - writtenBooks
 *      properties:
 *        name:
 *          type: string
 *          description: name of the author
 *        writtenBooks:
 *          type: array
 *          description: array of book IDs of books written by author
 *      example:
 *            name: J.K. Rowling
 *            writtenBooks: ["1234", "2345"]
 */

// grouping requests into tags
/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Library App - Author API
 */

// get request for all authors
/**
 * @swagger
 * /api/authors:
 *  get:
 *    summary: returns all the authors
 *    tags: [Authors]
 *    responses:
 *      200:
 *        description: all the authors
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Author'
 *      404:
 *        description: could not find authors
 */
