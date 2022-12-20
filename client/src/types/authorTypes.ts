export type InitialStateAuthors = {
  authors: Author[];
  loading: boolean;
  error: string;
};

export type Author = {
  name: string;
  writtenBooks: string[];
};

export type AuthorInBook = {
  _id: string;
  title: string;
};

export type UpdateAuthor = {
  name: string;
};

export type AddAuthorInitialValues = {
  name: string;
};
