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

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await postService.deletePost(postId, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/update",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await postService.updatePost(postData, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getComments = createAsyncThunk(
  "posts/getcomments",
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await postService.getComments(postId, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const commentPost = createAsyncThunk(
  "posts/comment",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await postService.commentPost(postData, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const uncommentPost = createAsyncThunk(
  "posts/uncomment",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await postService.uncommentPost(postData, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateComment = createAsyncThunk(
  "posts/updatecomment",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await postService.updateComment(postData, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userPosts = createAsyncThunk(
  "posts/profile",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await postService.userPosts(userId, token);
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
