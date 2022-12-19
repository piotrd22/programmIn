import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
  user: null,
};

export const getUser = createAsyncThunk(
  "posts/home",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await userService.getUser(userId, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {},
});

export default userSlice.reducer;
