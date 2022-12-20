import mongoose, { Schema, Document } from 'mongoose'

export interface UserDocument extends Document {
  userId: string
  username: string
  password: string
  firstname: string
  lastname: string
  email: string
  image: string
  isAdmin: boolean
  isVerified: boolean
  token: string
  isBanned: boolean
  borrowedBooks: { _id: mongoose.Schema.Types.ObjectId }[]
}

const userSchema: Schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'User must provide a username'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: [8, 'Password must be at least 8 characters'],
    required: [true, 'User must provide a password'],
  },
  firstname: {
    type: String,
    required: [true, 'User must provide a first name'],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, 'User must provide a last name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please enter an email address'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  image: {
    type: String,
    default: '../../public/images/blank-profile-picture-g1954f9579_640.png',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
    default: '',
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  borrowedBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
})

export default mongoose.model<UserDocument>('User', userSchema)
