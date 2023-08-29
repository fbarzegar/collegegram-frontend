import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { removeToken, setToken } from "../api/token";
import { IUser, getMe, login, register } from "../api/user";

export const loginThunk = createAsyncThunk(
  "user/loginThunk",
  async (
    { usernameOrEmail, password }: { usernameOrEmail: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      return await login(usernameOrEmail, password);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerThunk = createAsyncThunk(
  "user/registerThunk",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      return await register(email, password);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getMeThunk = createAsyncThunk(
  "user/me",
  async ({ token }: { token?: string }, { rejectWithValue }) => {
    try {
      return await getMe();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export type userSliceType = {
  status: "idle" | "authorized" | "unauthorized" | "loading";
  user: IUser | null;
  token: string | null;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "idle",
    user: null,
    token: null,
  } as userSliceType,
  reducers: {
    logout(state) {
      state.status = "unauthorized";
      state.token = null;
      state.user = null;
      removeToken();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        if (action.payload.token) {
          state.status = "authorized";
          setToken(action.payload.token);
          state.user = action.payload.user;
        }
      })
      .addCase(loginThunk.rejected, (state) => {
        state.status = "unauthorized";
      });
    builder
      .addCase(registerThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "authorized";
          setToken(action.payload.token);
          state.user = action.payload.user;
          state.token = action.payload.token;
        } else {
          state.status = "unauthorized";
        }
      })
      .addCase(registerThunk.rejected, (state) => {
        state.status = "unauthorized";
      });

    builder
      .addCase(getMeThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMeThunk.fulfilled, (state, action) => {
        if (action.payload?._id) {
          state.user = action.payload;
          state.status = "authorized";
        }
      })
      .addCase(getMeThunk.rejected, (state, action) => {
        state.status = "unauthorized";
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;