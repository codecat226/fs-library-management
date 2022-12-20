import mongoose, { Schema, Document } from 'mongoose'

export interface BookDocument extends Document {
  bookId: string
  ISBN: string
  title: string
  description: string
  publisher: string
  author: {
    _id: mongoose.Schema.Types.ObjectId
  }
  status: boolean
  borrowId: string
  publishDate: string
  borrowDate: string
  returnDate: string
}

const bookSchema: Schema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      required: true,
      unique: true,
    },
    ISBN: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    title: {
      type: String,
      required: [true, 'title must be provided'],
      minlength: [2, 'title must be at least two characters'],
      maxlength: [100, 'title cannot be over 20 characters'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    publisher: {
      type: String,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    borrowId: {
      type: String,
      trim: true,
      unique: true,
    },
    publishDate: {
      type: String,
      trim: true,
    },
    borrowDate: {
      type: String,
    },
    returnDate: {
      type: String,
    },
  },
  { timestamps: true }
)

export default mongoose.model<BookDocument>('Book', bookSchema)
