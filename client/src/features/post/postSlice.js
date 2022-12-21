import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
  posts: [],
  isLoading: false,
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

const refreshPage = () => window.location.reload();

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(homePosts.fulfilled, (state, action) => {
        const sorted = action.payload.sort((x, y) => {
          return new Date(y.createdAt) - new Date(x.createdAt);
        });
        state.posts = sorted;
        state.isLoading = false;
      })
      .addCase(homePosts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(homePosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        if (action.payload.image) refreshPage();
        state.posts = [action.payload, ...state.posts];
        state.isLoading = false;
      })
      .addCase(createPost.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
        state.isLoading = false;
      })
      .addCase(deletePost.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (action.payload.image) refreshPage();
        state.posts = state.posts.map((post) =>
          action.payload._id === post._id ? action.payload : post
        );
        state.isLoading = false;
      })
      .addCase(updatePost.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userPosts.fulfilled, (state, action) => {
        const sorted = action.payload.sort((x, y) => {
          return new Date(y.createdAt) - new Date(x.createdAt);
        });
        state.posts = sorted;
        state.isLoading = false;
      })
      .addCase(userPosts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(userPosts.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export default postSlice.reducer;
