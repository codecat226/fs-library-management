import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express'
import braintree from 'braintree'
import User, { UserDocument } from '../models/User'
import { BadRequestError, errorRes } from '../helpers/apiError'
import { v4 } from 'uuid'
import jwt, { Secret } from 'jsonwebtoken'
import { securePassword, decryptPassword } from '../helpers/password'
import {
  BT_MERCHANT_ID,
  BT_PRIVATE_KEY,
  BT_PUBLIC_KEY,
  JWT_SECRET,
} from '../util/secrets'
import { successRes } from '../helpers/apiSuccess'
import { sendEmail } from '../util/sendEmail'
import { CustomRequest, TokenInterface } from '../middlewares/isAuthorised'
import { createToken } from '../util/createToken'

export interface VerifyTokenInterface {
  userId: string
  username: string
  email: string
  hashPW: string
  firstname: string
  lastname: string
  image: string
}

// Braintree Setup - for deployment, the info below must be changed
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: BT_MERCHANT_ID,
  publicKey: BT_PUBLIC_KEY,
  privateKey: BT_PRIVATE_KEY,
})

export const registerUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, firstname, lastname, email } = req.body
    const foundUser = await User.findOne({ email: email })
    if (foundUser) {
      return errorRes(res, 400, 'User with this email address already exists')
    }
    const hashPW = await securePassword(String(password))
    const imagePath = req.file?.path
    //create jwt token, pass user input as payload in token
    const privKey: Secret = JWT_SECRET
    const token = jwt.sign(
      {
        username,
        hashPW,
        firstname,
        lastname,
        email,
        image: imagePath,
      },
      String(privKey),
      {
        expiresIn: '15m',
      }
    )

    const emailData = {
      email: email,
      subject: 'Account verification',
      html: `<p>Hi ${username}!&nbsp;<a href="http://localhost:3000/activate/${token}">Please click on this link to verify your email address.</a></p>`,
    }
    sendEmail(emailData)
    return successRes(
      res,
      200,
      'Please check your email address to verify your account.'
    )
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const verifyUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.params
    if (token) {
      const privKey: Secret = JWT_SECRET
      jwt.verify(token, String(privKey), async (err: any, decoded: any) => {
        if (err) {
          return errorRes(res, 401, 'link has expired, please register again')
        }
        const { username, email, hashPW, firstname, lastname, image } =
          decoded as VerifyTokenInterface
        //check if user exists
        const foundUser = await User.findOne({ email: email })

        if (foundUser) {
          return errorRes(
            res,
            400,
            'User with this email address already exists'
          )
        }
        //set verify to true
        const newUser = new User({
          userId: v4(),
          username: username,
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: hashPW,
          isAdmin: false,
          isVerified: true,
          image: image,
        })
        const userData = await newUser.save()
        if (!userData) {
          return errorRes(res, 400, 'User could not be created')
        }
        return successRes(
          res,
          200,
          'User successfully verified. Please log in.'
        )
      })
    }
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// POST /api/users/login

export const loginUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body
    const foundUser = await User.findOne({ username: username })
    if (!foundUser) {
      return errorRes(res, 404, 'User with this username does not exist')
    }
    const isPW = await decryptPassword(password, foundUser.password)
    if (!isPW) {
      return errorRes(res, 406, 'username or password does not match')
    }
    //check if user is banned by admin
    if (foundUser.isBanned) {
      return errorRes(res, 401, 'user is banned')
    }
    if (foundUser.isVerified) {
      // clear previous cookies if exists
      if (req.cookies[`${(foundUser as UserDocument)._id}`]) {
        req.cookies[`${(foundUser as UserDocument)._id}`] = ''
      }
      // if all goes well create jwt
      const privKey: Secret = JWT_SECRET
      // create the token
      const token = jwt.sign({ id: foundUser._id }, String(privKey), {
        expiresIn: '15m',
      })
      // create cookie to send the token inside
      res.cookie(String(foundUser._id), token, {
        // cookies sent to clients can be set for a specific path, if necessary
        path: '/',
        // remember to make expiration LESS than the token expiration //12 mins
        expires: new Date(Date.now() + 1000 * 720),
        // Setting httpOnly prevents client-side scripts from accessing data
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      //send the token to the frontend
      // return res.status(200).send({ message: 'login success', token: token })
      return successRes(res, 200, 'login success', {
        token: token,
        user: foundUser,
      })
    } else {
      return errorRes(res, 400, 'Please verify email account first')
    }
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /users/:userId
export const updateUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //update (non-sensitive) basic User info
  try {
    const { username, firstname, lastname, email } = req.body
    const { id } = req.params
    const foundUser = await User.findOne({ _id: id })
    if (!foundUser) {
      return errorRes(res, 404, 'Could not find user')
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      {
        username,
        firstname,
        lastname,
        email,
        image: req.file?.path,
      },
      {
        new: true,
      }
    )
    if (!updatedUser) {
      return errorRes(res, 404, 'Could not update user information')
    }
    return successRes(res, 200, 'updated user successfully', updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /users/edit-password/:userId
export const updateUserPassword: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //update (sensitive) User info
  try {
    const { username, oldpassword, newpassword, confirmpassword } = req.body
    const { id } = req.params
    const foundUser = await User.findOne({ _id: id, username: username })
    if (!foundUser) {
      return errorRes(res, 404, 'Could not find user')
    }
    const plainPW = await decryptPassword(oldpassword, foundUser.password)
    if (!plainPW) {
      return errorRes(res, 404, 'Wrong password')
    }
    if (newpassword !== confirmpassword) {
      return errorRes(res, 400, 'Confirm password does not match')
    }
    const hashPW = await securePassword(newpassword)
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      {
        password: hashPW,
      },
      {
        new: true,
      }
    )
    if (!updatedUser) {
      return errorRes(res, 404, 'Could not update user password')
    }
    return successRes(res, 200, 'updated password successfully')
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// // DELETE /users/:userId
export const deleteUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    await User.findByIdAndDelete(id)
    res.status(200).send({
      message: 'user was succesfully deleted',
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /users/:userId
export const findUserById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params
    const foundUser = await User.findById(userId)
    if (!foundUser) {
      res.status(404).send({ message: `User ${userId} not found` })
    }
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /users
export const findAllUsers: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const search = req.query.search ? req.query.search : ''

    const allUsers = await User.find({
      $or: [
        { username: { $regex: '.*' + search + '.*', $options: 'i' } },
        { firstname: { $regex: '.*' + search + '.*', $options: 'i' } },
        { lastname: { $regex: '.*' + search + '.*', $options: 'i' } },
        { email: { $regex: '.*' + search + '.*', $options: 'i' } },
      ],
    })
    if (!allUsers) {
      return errorRes(res, 404, 'Could not get users')
    }
    return successRes(res, 200, 'success', allUsers)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const showProfile: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // use projection to not send password data to frontend
    const foundUser = await User.findOne(
      { _id: (req as CustomRequest).id },
      { password: 0 }
    )
    if (!foundUser) {
      return errorRes(res, 404, 'User does not exist')
    }
    return successRes(res, 200, 'user found', foundUser)
  } catch (error: any) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// POST method /forgot-password
export const forgotPassword: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body
    const userData = await User.findOne({ email: email })
    if (userData) {
      if (userData.isVerified) {
        const newToken = createToken()
        const updatedToken = await User.updateOne(
          { email: email },
          {
            $set: {
              token: newToken,
            },
          }
        )
        if (updatedToken) {
          const { username, email } = userData
          const emailData = {
            email: email,
            subject: 'Password reset',
            html: `<p>Hi ${username}!&nbsp;<a href="http://localhost:3000/reset-password/${newToken}">Please click on this link to reset password.</a></p>`,
          }
          sendEmail(emailData)
          return successRes(
            res,
            200,
            'Please check your email address to reset your password.'
          )
        }
      } else {
        return errorRes(res, 400, 'Please verify your email first')
      }
    } else {
      return errorRes(res, 404, 'Failed to find user with email.')
    }
  } catch (error: any) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// POST method /reset-password
export const resetPassword: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //try to find user with token passed in url params
    const { token } = req.params
    const userData = await User.findOne({ token: token })
    if (userData) {
      const { password } = req.body
      const hashPW = await securePassword(password)
      await User.findOneAndUpdate(
        { token: userData.token },
        {
          $set: {
            password: hashPW,
            token: '',
          },
        }
      )
      return successRes(res, 201, 'password successfully changed!')
    } else {
      errorRes(res, 404, 'Could not find user')
    }
  } catch (error: any) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// /logout (POST)
export const logoutUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.cookie) {
      return res.status(404).send({
        message: 'no cookie found',
      })
    }
    const token = req.headers.cookie.split('=')[1]
    if (!token) {
      return res.status(404).send({
        message: 'Token not found',
      })
    }

    // verify token
    const privKey: Secret = JWT_SECRET
    jwt.verify(token, String(privKey), function (err, decoded) {
      if (err) {
        console.log(err)
        return res.status(400).send({
          message: 'Could not verify token',
        })
      }
      //clear cookies
      req.cookies[`${(decoded as TokenInterface).id}`] = ''
      res.clearCookie(`${(decoded as TokenInterface).id}`, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        path: '/',
      })
    })
    res.status(200).json({
      message: 'user logged out',
    })
  } catch (error: any) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// / /refresh (GET)
export const createRefreshToken: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //check if there is a cookie (check if user is already logged in)
    if (!req.headers.cookie) {
      return res.status(401).send({
        message: 'no cookie found',
      })
    }
    //get token out of the cookie
    const oldToken = req.headers.cookie.split('=')[1]
    if (!oldToken) {
      return res.status(401).send({
        message: 'No token found',
      })
    }

    //verify the old token
    const privKey: Secret = JWT_SECRET
    jwt.verify(oldToken, String(privKey), function (err, decoded) {
      if (err) {
        console.log(err)
        return res.status(401).send({
          message: 'Could not verify token',
        })
      }
      //if the token IS verified --> reset OLD cookies in res and req header
      req.cookies[`${(decoded as TokenInterface).id}`] = ''
      res.clearCookie(`${(decoded as TokenInterface).id}`, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        path: '/',
      })

      //generate the NEW token:
      // const payload: JwtPayload = { id: (decoded as TokenInterface).id };
      const newToken = jwt.sign(
        { id: (decoded as TokenInterface).id },
        String(privKey),
        {
          expiresIn: '10m',
        }
      )
      // send the NEW token inside cookie
      res.cookie(String((decoded as TokenInterface).id), newToken, {
        //Cookies sent to clients can be set for a specific path, not just a domain.
        path: '/',
        expires: new Date(Date.now() + 1000 * 480),
        //8mims
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      // set the id (which comes from payload when we SIGNED the token here so that it can be accessed in the user profile route request
      ;(req as CustomRequest).id = (decoded as TokenInterface).id
      // go next since it is middleware
      return successRes(res, 200, 'created new refresh token', {
        token: newToken,
      })
    })
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

// POSt /users/ban/:userId
export const banUserById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params
    const foundUser = await User.findOne({ _id: userId })
    if (!foundUser) {
      res.status(404).send({ message: `User ${userId} not found` })
    }
    const bannedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        isBanned: true,
      },
      {
        new: true,
      }
    )
    if (!bannedUser) {
      return errorRes(res, 404, 'Could not ban user')
    }
    return successRes(res, 200, 'banned user successfully', bannedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

//unban/:userId'
export const unbanUserById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params
    const foundUser = await User.findOne({ _id: userId })
    if (!foundUser) {
      res.status(404).send({ message: `User ${userId} not found` })
    }
    const unbannedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        isBanned: false,
      },
      {
        new: true,
      }
    )
    if (!unbannedUser) {
      return errorRes(res, 404, 'Could not unban user')
    }
    return successRes(res, 200, 'unbanned user successfully', unbannedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// /borrowed/:id
export const findBorrowedBooks: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params
    const foundUser = await User.findOne({ _id: userId })
      .select('-password')
      .populate('borrowedBooks')

    if (!foundUser) {
      return errorRes(res, 404, 'User does not exist')
    }
    await foundUser.populate('borrowedBooks.author', 'name')

    const books = foundUser.borrowedBooks
    return successRes(res, 200, 'user with books found', books)
  } catch (error: any) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// braintree/token
export const getBrainTreeToken: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const braintreeToken = await gateway.clientToken.generate({})
    if (!braintreeToken) {
      return errorRes(res, 500, 'could not create braintree token')
    }
    return res.status(200).json(braintreeToken)
  } catch (error: any) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// braintree/donate
export const processDonation: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nonce, amount, email } = req.body
    gateway.transaction
      .sale({
        amount: amount,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      })
      .then(function (result) {
        if (result.success) {
          console.log('Transaction ID: ' + result.transaction.id)

          //send confirmation email to the user:
          const emailData = {
            email: email,
            subject: 'Thank you for your donation',
            html: `<p>Thank you so much for your generous donation of &euro;${amount} &hearts;</p> <br/> <p>- Integrify Public Library.</p>`,
          }
          sendEmail(emailData)
          return successRes(res, 200, 'donation success')
        } else {
          console.error(result.message)
          return errorRes(res, 400, 'Could not process donation')
        }
      })
      .catch(function (err) {
        console.error(err)
      })
  } catch (error: any) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
