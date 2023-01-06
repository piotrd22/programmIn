import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import conversationService from "./conversationService";

const initialState = {
  isLoading: false,
};

export const createConv = createAsyncThunk(
  "conversation/create",
  async (usersId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await conversationService.createConv(usersId, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getThisConv = createAsyncThunk(
  "conversation/find",
  async (usersId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await conversationService.getThisConv(usersId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getThisConv.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getThisConv.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getThisConv.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default conversationSlice.reducer;
