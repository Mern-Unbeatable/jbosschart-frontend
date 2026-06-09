import axios from 'axios';
import Cookies from 'js-cookie';
import { API_CONFIG, ROUTES } from '../config';
import { API_ENDPOINTS } from './httpEndpoint';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getAuthRuntime = async () => {
  const [{ default: store }, { logout, loginSuccess }] = await Promise.all([
    import('../store/store'),
    import('../store/slices/authSlice'),
  ]);

  return { store, logout, loginSuccess };
};


const FALLBACK_BASE_URL = 'https://jobsschart-api.maktechgroup.tech/api/v1';
const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL || FALLBACK_BASE_URL,
  timeout: API_CONFIG.TIMEOUT || 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Track in-flight refresh to avoid multiple concurrent refresh calls
let refreshPromise = null;

axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.baseURL) {
      throw new Error(
        'Missing REACT_APP_API_BASE_URL. Set it in .env.development and restart dev server.',
      );
    }

    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const locale = localStorage.getItem('locale') || 'en';
    config.headers['Accept-Language'] = locale;

    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Retry on network errors or 5xx responses
    const attempt = originalRequest._retryCount ?? 0;
    const isRetryable = !error.response || error.response.status >= 500;
    if (isRetryable && attempt < API_CONFIG.RETRY_ATTEMPTS) {
      originalRequest._retryCount = attempt + 1;
      await sleep(API_CONFIG.RETRY_DELAY * originalRequest._retryCount);
      return axiosInstance(originalRequest);
    }

    // Token refresh on 401
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Deduplicate: if another request already triggered refresh, wait for it
        if (!refreshPromise) {
          const refreshToken = Cookies.get('refreshToken');
          if (!refreshToken) throw new Error('No refresh token');

          if (!API_CONFIG.BASE_URL) {
            throw new Error('Missing REACT_APP_API_BASE_URL');
          }

          refreshPromise = axios
            .post(
              `${API_CONFIG.BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`,
              { refreshToken },
              { headers: { 'Content-Type': 'application/json' } },
            )
            .then((res) => res.data)
            .finally(() => {
              refreshPromise = null;
            });
        }

        const refreshed = await refreshPromise;
        const { store, loginSuccess } = await getAuthRuntime();
        const newToken = refreshed.token ?? refreshed.accessToken;
        const user = refreshed.user ?? store.getState().auth.user;

        store.dispatch(loginSuccess({ token: newToken, user }));

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch {
        const { store, logout } = await getAuthRuntime();
        store.dispatch(logout());
        window.location.replace(ROUTES.LOGIN);
        return Promise.reject(error);
      }
    }

    if (error.response?.status === 403) {
      console.error('Access Forbidden:', error.response.data);
    }

    if (error.response?.status >= 500) {
      console.error('Server Error:', error.response.data);
    }

    if (!error.response) {
      console.error('Network Error:', error.message);
    }

    return Promise.reject({
      message:
        error.response?.data?.message || error.message || 'An error occurred',
      status: error.response?.status,
      data: error.response?.data,
    });
  },
);

export default axiosInstance;
