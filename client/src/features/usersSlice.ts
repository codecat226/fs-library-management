import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AdminUser, InitialStateUsers } from "types/userTypes";

const initialState: InitialStateUsers = {
  users: [],
  loading: true,
  error: "",
};

//async function for fetching users data
export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (searchQuery: string) => {
    const response = await axios.get(
      `http://localhost:4000/api/users?search=${searchQuery}`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAllUsers.fulfilled,
        (state, action: PayloadAction<AdminUser[]>) => {
          state.loading = false;
          state.users = action.payload;
          state.error = "";
        }
      )
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        //add default message so the type is not undefined
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default usersSlice.reducer;
