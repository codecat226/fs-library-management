import axios from "axios";
import { UpdateAuthor } from "types/authorTypes";
import { AddAuthorInitialValues } from "types/authorTypes";
axios.defaults.withCredentials = true;

const baseUrl = "http://localhost:4000/api/v1/authors";

// FOR ADMIN

export const createAuthor = async (values: AddAuthorInitialValues) => {
  const res = await axios.post(`${baseUrl}`, values);
  return res;
};

export const deleteAuthor = async (authorId: string) => {
  const res = await axios.delete(`${baseUrl}/${authorId}`);
  return res;
};

export const updateAuthor = async (values: UpdateAuthor, authorId: string) => {
  const res = await axios.put(`${baseUrl}/${authorId}`, values);
  return res;
};
