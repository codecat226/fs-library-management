import { Author } from "./authorTypes";

export type InitialStateBooks = {
  books: BookType[];
  loading: boolean;
  error: string;
};

export type BookType = {
  _id: string;
  bookId: string;
  borrowId: string;
  ISBN: string;
  title: string;
  description: string;
  publisher: string;
  author: Author;
  status: boolean;
  publishDate: string;
  borrowDate: string;
  returnDate: string;
};

export type Bookprops = {
  book: {
    bookId: string;
    ISBN: string;
    title: string;
    description: string;
    publisher: string;
    author: Author;
    status: boolean;
    borrowId: string;
    publishDate: string;
    borrowDate: string;
    returnDate: string;
  };
};

export type AddBookInitialValues = {
  ISBN: string;
  title: string;
  description: string;
  publisher: string;
  author: string;
  status: boolean;
  publishDate: string;
};
