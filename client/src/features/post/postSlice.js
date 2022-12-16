import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
  posts: [],
  post: null,
};

export const createPost = createAsyncThunk(
  "posts/create",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await postService.createPost(postData, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const homePosts = createAsyncThunk("posts/home", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.accessToken;
    return await postService.homePosts(token);
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const likePost = createAsyncThunk(
  "posts/like",
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await postService.likePost(postId, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: (builder) => {},
});

export default postSlice.reducer;
