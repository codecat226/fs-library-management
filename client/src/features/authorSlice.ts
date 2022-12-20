import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Author, InitialStateAuthors } from "types/authorTypes";

const initialState: InitialStateAuthors = {
  authors: [],
  loading: true,
  error: "",
};

//async function for fetching books data
export const fetchAuthors = createAsyncThunk(
  "authors/fetchAuthors",
  async () => {
    const response = await axios.get("http://localhost:4000/api/v1/authors", {
      withCredentials: true,
    });
    return response.data.data;
  }
);

const authorSlice = createSlice({
  name: "authors",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAuthors.fulfilled,
        (state, action: PayloadAction<Author[]>) => {
          state.loading = false;
          state.authors = action.payload;
          state.error = "";
        }
      )
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.loading = false;
        state.authors = [];
        //add default message so the type is not undefined
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default authorSlice.reducer;
