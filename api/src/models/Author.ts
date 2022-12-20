import mongoose, { Document } from 'mongoose'

export interface AuthorDocument extends Document {
  name: string
  writtenBooks: { _id: string }[]
}

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  writtenBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
  ],
})

export default mongoose.model<AuthorDocument>('Author', authorSchema)
