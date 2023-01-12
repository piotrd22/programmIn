import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import messageService from "./messageService";

const initialState = {
  isLoading: false,
};

export const createMess = createAsyncThunk(
  "messages/create",
  async (messData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await messageService.createMess(messData, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMess = createAsyncThunk(
  "messages/find",
  async (convId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await messageService.getMess(convId, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const messageSlice = createSlice({
  name: "message",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getMess.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getMess.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMess.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
