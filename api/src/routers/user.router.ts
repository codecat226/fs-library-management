import express, { Router } from 'express'
import {
  registerUser,
  findUserById,
  deleteUser,
  updateUser,
  loginUser,
  verifyUser,
  forgotPassword,
  resetPassword,
  logoutUser,
  findAllUsers,
  showProfile,
  createRefreshToken,
  updateUserPassword,
  banUserById,
  unbanUserById,
  findBorrowedBooks,
  getBrainTreeToken,
  processDonation,
} from '../controllers/user.controller'

//VALIDATORS
import {
  loginUserValidaton,
  registerUserValidaton,
  updatePasswordValidation,
  updateUserValidaton,
} from '../validators/validators'
import { runValidation } from '../validators'

//MULTER IMAGE UPLOAD
import { upload } from '../middlewares/imageUpload'

//AUTHORISATION MIDDLEWARE
import { isAuthorised } from '../middlewares/isAuthorised'
import { isAdmin } from '../middlewares/isAdmin'

const router = Router()

// Every path we define here will get /api/users prefix
router.post(
  '/register',
  upload.single('image'),
  registerUserValidaton,
  runValidation,
  registerUser
)
router.post('/verify/:token', verifyUser)
router.post('/login', loginUserValidaton, runValidation, loginUser)
router.post('/logout', isAuthorised, logoutUser)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.get('/profile', isAuthorised, showProfile)
router.get('/refresh', createRefreshToken)
router.get('/', isAuthorised, isAdmin, findAllUsers)
router.get('/borrowed/:userId', isAuthorised, findBorrowedBooks)
router.get('/:id', isAuthorised, isAdmin, findUserById)
router.delete('/:id', isAuthorised, isAdmin, deleteUser)
router.put(
  '/:id',
  upload.single('image'),
  updateUserValidaton,
  runValidation,
  isAuthorised,
  updateUser
)
router.put(
  '/edit-password/:id',
  updatePasswordValidation,
  runValidation,
  isAuthorised,
  updateUserPassword
)

//BAN USER
router.post('/ban/:userId', isAuthorised, isAdmin, banUserById)
router.post('/unban/:userId', isAuthorised, isAdmin, unbanUserById)

//MAKE DONATION (first get token for braintree, second process payment req)
router.get('/braintree/token', getBrainTreeToken)
router.post('/braintree/donate', isAuthorised, processDonation)

export default router

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - userId
 *        - username
 *        - password
 *        - firstname
 *        - lastname
 *        - email
 *      properties:
 *        userId:
 *          type: string
 *          description: auto generated id of the user
 *        username:
 *          type: string
 *          description: username of user
 *        password:
 *          type: string
 *          description: password of the user
 *        firstname:
 *          type: string
 *          description: first name of the user
 *        lastname:
 *            type: string
 *            description: last name of the user
 *        email:
 *            type: string
 *            description: email of the user
 *        image:
 *            type: string
 *            description: image of the user
 *        isAdmin:
 *            type: boolean
 *            description: boolean if user is an admin
 *        isVerified:
 *            type: boolean
 *            description: boolean if user is verified by email
 *        token:
 *            type: string
 *            description: token used temporarily for forgot password verification
 *        isBanned:
 *            type: boolean
 *            description: boolean if user is banned by admin
 *        borrowedBooks:
 *            type: array
 *            description: array of Book IDs of books which are borrowed by users
 *      example:
 *            userId: 123456
 *            username: 978-3-16-148410-1
 *            password: Harry Potter and the Chamber of Secrets
 *            firstname: Harry Potter, an eleven-year-old orphan, discovers that he is a wizard
 *            lastname: bloomsbury
 *            email: J.K. Rowling
 *            image: false
 *            isAdmin: 4324
 *            isVerified: 28/02/1999
 *            token: 29/06/2022
 *            isBanned: 28/07/2022
 *            borrowedBooks: ["1234", "2134"]
 */

// grouping requests into tags
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Library App - User API
 */

// get request for all users
/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: Returns all the users
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: all the users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */
