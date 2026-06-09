import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { signIn, signOut } from '../../services/authApi';

const normalizeRole = (role) =>
  typeof role === 'string' ? role.toLowerCase() : null;

const normalizeUser = (user) => {
  if (!user) return null;
  return {
    ...user,
    role: normalizeRole(user.role),
  };
};

const getErrorMessage = (error, fallback) => {
  if (!error) return fallback;
  if (typeof error === 'string') return error;
  if (typeof error.message === 'string' && error.message.trim()) {
    return error.message;
  }
  return fallback;
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    const { data, error } = await signIn(credentials);

    if (error) {
      return rejectWithValue(getErrorMessage(error, 'Login failed'));
    }

    const payload = data?.data;
    const user = normalizeUser(payload?.user);
    const token = payload?.accessToken;
    const refreshToken = payload?.refreshToken || payload?.user?.refreshTokens;

    if (!user || !token) {
      return rejectWithValue('Invalid login response from server');
    }

    return {
      user,
      token,
      refreshToken: refreshToken || null,
      message: data?.message || 'Login successful',
    };
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    const { error } = await signOut();

    if (error) {
      return rejectWithValue(getErrorMessage(error, 'Logout failed'));
    }

    return true;
  },
);

const loadAuthState = () => {
  try {
    const token = Cookies.get('token') || null;
    const refreshToken = Cookies.get('refreshToken') || null;
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return {
      user: normalizeUser(user),
      isAuthenticated: !!token,
      token,
      refreshToken,
      loading: false,
      error: null,
    };
  } catch {
    return {
      user: null,
      isAuthenticated: false,
      token: null,
      refreshToken: null,
      loading: false,
      error: null,
    };
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuthState(),
  reducers: {
    loginSuccess: (state, action) => {
      state.user = normalizeUser(action.payload.user);
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken || state.refreshToken;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    updateUser: (state, action) => {
      state.user = normalizeUser({ ...state.user, ...action.payload });
    },

    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : action.error?.message || 'Login failed';
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : action.error?.message || null;
      });
  },
});

export const { loginSuccess, logout, setLoading, updateUser, clearAuthError } =
  authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectToken = (state) => state.auth.token;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectUserRole = (state) => state.auth.user?.role || null;
export const selectAuthError = (state) => state.auth.error;
