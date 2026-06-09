export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/signin',
    REGISTER: '/auth/signup',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
  },

  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
    LIST: '/users',
    BY_ID: (id) => `/users/${id}`,
  },

  CONTACT: {
    SEND: '/contact',
  },

  SERVICES: {
    LIST: '/services',
    BY_ID: (id) => `/services/${id}`,
  },
};

export default API_ENDPOINTS;
