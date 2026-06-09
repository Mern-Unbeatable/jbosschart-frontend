// store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';

// Create async thunk for logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      // Call the signOut mutation
      await dispatch(authApi.endpoints.signOut.initiate()).unwrap();
    } catch (error) {
      console.error('Logout API error:', error);
      // Don't reject - we still want to clear local state
    } finally {
      // Clear all localStorage items
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('auth');

      // Clear sessionStorage if any
      sessionStorage.clear();
    }
  }
);

const getInitialState = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  return {
    user: user ? JSON.parse(user) : null,
    token: token || null,
    isAuthenticated: !!token,
    loading: false,
    error: null,
  };
};

const initialState = getInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;

      if (token && user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('auth', JSON.stringify({ user, token }));
      }
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;

      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('auth');
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      if (state.token && state.user) {
        localStorage.setItem('user', JSON.stringify(state.user));
        localStorage.setItem('auth', JSON.stringify({ user: state.user, token: state.token }));
      }
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        // Still clear local state even if API call fails
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      });
  },
});

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectUserRole = (state) => state.auth.user?.role;

export const {
  setCredentials,
  clearCredentials,
  setLoading,
  updateUser,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;