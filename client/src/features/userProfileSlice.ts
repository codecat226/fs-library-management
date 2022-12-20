import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { InitialStateUser, UserProfile } from "../types/userTypes";

const initialState: InitialStateUser = {
  error: "",
  loading: true,
  isLoggedIn: false,
  isAdmin: false,
  user: {} as UserProfile,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await axios.get("http://localhost:4000/api/users/profile", {
    withCredentials: true,
  });
  return response.data.data;
});

const userProfileSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    setLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.user = {} as UserProfile;
    },
    setAdmin: (state) => {
      state.isAdmin = true;
    },
    removeAdmin: (state) => {
      state.isAdmin = false;
    },
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          state.loading = false;
          state.user = action.payload;
          state.isAdmin = action.payload.isAdmin;
          state.error = "";
        }
      )
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.user = {} as UserProfile;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setLoggedIn, setUser, setLoggedOut, setAdmin, removeAdmin } =
  userProfileSlice.actions;
export default userProfileSlice.reducer;
