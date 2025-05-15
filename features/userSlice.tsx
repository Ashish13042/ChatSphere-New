import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/services/GlobalApi";
import axios from "axios";
import { APIURL } from "@/services/APIURL";
import { saveLocalItem } from "@/services/secureStorage";

interface UserState {
  user: any | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};

// Async thunk to fetch user data
export const fetchUser = createAsyncThunk("user/fetchUser", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance({
      method: "post",
      url: "/auth/check-auth",
    });
    const data = response.data as { user: any }; // Explicitly type response.data
    return data.user;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Failed to fetch user");
  }
});

// Async thunk for sign in
export const signInUser = createAsyncThunk(
  "user/signInUser",
  async ({ identifier, password }: { identifier: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(APIURL + "/auth/signin", {
        identifier,
        password,
      });
      const data = response.data as { token?: string; user?: any };
      if (data.token) {
        saveLocalItem("userToken", data.token);
        return data.user;
      } else {
        return rejectWithValue("Invalid response from server.");
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Signin failed.");
    }
  }
);

// Async thunk for sign up
export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (
    { name, email, password, userName }: { name: string; email: string; password: string; userName: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(APIURL + "/auth/signup", {
        name,
        email,
        password,
        userName,
      });
      const data = response.data as { token?: string; user?: any };
      if (data.token) {
        saveLocalItem("userToken", data.token);
        return data.user;
      } else {
        return rejectWithValue("Invalid response from server.");
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Signup failed.");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // Sign In
      .addCase(signInUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // Sign Up
      .addCase(signUpUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;