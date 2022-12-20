import { configureStore, combineReducers } from "@reduxjs/toolkit";
import bookSlice from "features/bookSlice";
import userProfileSlice from "features/userProfileSlice";
import authorSlice from "features/authorSlice";
import usersSlice from "features/usersSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
//default config for persist-redux, added blacklist for reducers not in need
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["booksR", "authorR", "allUsersR"],
};

//combine all reducers so they can be passed easier to the store
const reducer = combineReducers({
  booksR: bookSlice,
  userR: userProfileSlice,
  authorR: authorSlice,
  allUsersR: usersSlice,
});

//create a persistedReducer for the store, pass in previous config and reducers
const persistedReducer = persistReducer(persistConfig, reducer);

//create the store:
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself for typescript check
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
