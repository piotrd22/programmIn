import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isLoading: false,
};

export const getUser = createAsyncThunk(
  "user/get",
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

export const updateUser = createAsyncThunk(
  "user/update",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await userService.updateUser(userData._id, userData, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await userService.deleteUser(userData, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const followUser = createAsyncThunk(
  "user/follow",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await userService.followUser(userData, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "user/follow",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await userService.unfollowUser(userData, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserFollowers = createAsyncThunk(
  "user/followers",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await userService.getUserFollowers(userId, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserFollowing = createAsyncThunk(
  "user/following",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await userService.getUserFollowing(userId, token);
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
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserFollowers.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getUserFollowers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserFollowers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getUserFollowing.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getUserFollowing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserFollowing.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
