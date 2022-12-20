import axios from "axios";
import { AddBookInitialValues } from "types/bookTypes";
axios.defaults.withCredentials = true;

const baseUrl = "http://localhost:4000/api/v1/books";

export const createBook = async (values: AddBookInitialValues) => {
  const res = await axios.post(`${baseUrl}`, values);
  return res;
};

export const deleteBook = async (bookId: string) => {
  const res = await axios.delete(`${baseUrl}/${bookId}`);
  return res;
};

export const updateBook = async (
  values: AddBookInitialValues,
  bookId: string
) => {
  const res = await axios.put(`${baseUrl}/${bookId}`, values);
  return res;
};

export const borrowBook = async (bookId: string, userId: string) => {
  const res = await axios.post(`${baseUrl}/borrow`, { bookId, userId });
  return res;
};

export const returnBook = async (bookId: string, userId: string) => {
  const res = await axios.post(`${baseUrl}/return`, { bookId, userId });
  return res;
};
