import { configureStore } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import authReducer from "../features/auth/authSlice";
import postReducer from "../features/post/postSlice";
import userReducer from "../features/user/userSlice";

const refreshPage = () => window.location.reload();

const checkTokenExpirationMiddleware = (store) => (next) => (action) => {
  const token =
    JSON.parse(localStorage.getItem("user")) &&
    JSON.parse(localStorage.getItem("user"))["accessToken"];
  if (!token) next(action);
  else if (jwt_decode(token).exp < Date.now() / 1000) {
    localStorage.clear();
    refreshPage();
    next(action);
  }
  next(action);
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(checkTokenExpirationMiddleware),
});
