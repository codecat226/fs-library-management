import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { InitialStateBooks, BookType } from "types/bookTypes";

const initialState: InitialStateBooks = {
  books: [],
  loading: true,
  error: "",
};

//async function for fetching books data
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (searchQuery: string) => {
    const response = await axios.get(
      `http://localhost:4000/api/v1/books?search=${searchQuery}`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchBooks.fulfilled,
        (state, action: PayloadAction<BookType[]>) => {
          state.loading = false;
          state.books = action.payload;
          state.error = "";
        }
      )
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.books = [];
        //add default message so the type is not undefined
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default bookSlice.reducer;
