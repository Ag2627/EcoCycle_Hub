import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/rewards";

export const fetchRewards = createAsyncThunk("rewards/fetchRewards", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

const rewardSlice = createSlice({
  name: "rewards",
  initialState: { rewards: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRewards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRewards.fulfilled, (state, action) => {
        state.loading = false;
        state.rewards = action.payload;
      });
  }
});

export default rewardSlice.reducer;
