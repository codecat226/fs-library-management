import express, { Application } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import apiErrorHandler from './middlewares/apiErrorHandler'
import bookRouter from './routers/book.router'
import userRouter from './routers/user.router'
import authorRouter from './routers/author.router'

dotenv.config({ path: '.env' })
const app: Application = express()

// Express configuration
app.set('port', process.env.PORT)

// Global middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)
// app.use(apiContentType)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/public', express.static('public'))
app.use(morgan('dev'))

// Set up routers
//add versioning so that the api can still be used during migration
app.use('/api/v1/books', bookRouter)
app.use('/api/v1/authors', authorRouter)
app.use('/api/users', userRouter)

// Custom API error handler
app.use(apiErrorHandler)

//Swagger Documentation
const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      description: 'A complete REST API for library',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: [
    'src/routers/book.router.ts',
    'src/routers/user.router.ts',
    'src/routers/author.router.ts',
  ],
}

const openapiSpecification = swaggerJsdoc(options)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))

export default app
