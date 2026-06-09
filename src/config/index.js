// src/config/index.js

const getEnv = (key, fallback = '') => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] ?? fallback;
  }
  return fallback;
};

/* =========================
   APP CONFIG
========================= */
export const APP_CONFIG = {
  NAME: getEnv('REACT_APP_NAME', 'NM'),
  VERSION: getEnv('REACT_APP_VERSION', '1.0.0'),
};

/* =========================
   ROUTES
========================= */
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  ENTREPRENEURSHIP: '/entrepreneurship',
  COMMUNITY: '/community',

  CONSULTANTS: '/consultants',
  CONSULTANT_DETAIL: '/consultants/:id',
  CONSULTANT_DETAIL_CHAT: '/consultants/:id/chat',

  CREDIT: '/credit',
  WEBSHOP: '/webshop',
  PRODUCT_DETAIL: '/webshop/:id',
  CHECKOUT: '/checkout',
  DONATION: '/donation',
  BLOG: '/blog',
  FAQ: '/faq',
  BLOG_DETAIL: '/blog/:blogId',

  LOGIN: '/login',
  REGISTER: '/register',

  ADMIN: '/admin',
  USER: '/user',
  CONSULTANT: '/consultant',
  REDUX_DEMO: '/redux-demo',

  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_EMAILS: '/admin/emails',
  ADMIN_LEADS: '/admin/leads',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_MARKETPLACE_ORDERS: '/admin/marketplace-orders',
  ADMIN_CASE_STUDIES: '/admin/case-studies',
  ADMIN_BLOG: '/admin/blog',
  ADMIN_JOBS: '/admin/jobs',
  ADMIN_PRICING: '/admin/pricing',
  ADMIN_CONSULTANTS: '/admin/consultants',
  ADMIN_USERS: '/admin/users',
  ADMIN_WEBSHOP: '/admin/webshop',
  ADMIN_WEBSHOP_ADD_PRODUCT: '/admin/webshop/add-new-product',
  ADMIN_WEBSHOP_PRODUCT_VIEW: '/admin/webshop/view/:productId',
  ADMIN_DONATION: '/admin/donation',
  ADMIN_ADS: '/admin/ads-management',
  ADMIN_ADS_PUBLISHED: '/admin/ads-management/published',
  ADMIN_SESSION: '/admin/session',
  ADMIN_PAYOUT: '/admin/payout',
  ADMIN_SETTINGS: '/admin/settings',
  ADMIN_PROFILE: '/admin/profile',
  ADMIN_FAQ: '/admin/faq',

  USER_DASHBOARD: '/user/dashboard',
  USER_BOOKED_SCHEDULE: '/user/booked-schedule',
  USER_CHAT: '/user/chat',
  USER_PROFILE: '/user/profile',
  USER_ORDERS: '/user/orders',
  USER_SETTINGS: '/user/settings',

  CONSULTANT_DASHBOARD: '/consultant/dashboard',
  CONSULTANT_SCHEDULE: '/consultant/schedule',
  CONSULTANT_SESSIONS_HISTORY: '/consultant/sessions-history',
  CONSULTANT_CHAT: '/consultant/chat',
  CONSULTANT_PROFILE: '/consultant/profile',
  CONSULTANT_BOOKINGS: '/consultant/bookings',
  CONSULTANT_SUPPORT_TICKETS: '/consultant/support-tickets',
  CONSULTANT_EARNINGS: '/consultant/earnings',
  CONSULTANT_PAYOUT: '/consultant/payout',
  CONSULTANT_SETTINGS: '/consultant/settings',
};

/* =========================
   API CONFIG (SAFE)
========================= */
// export const API_CONFIG = {
//   BASE_URL: getEnv('REACT_APP_API_BASE_URL', ''),
//   VITALS_ENDPOINT: getEnv('REACT_APP_VITALS_ENDPOINT', ''),

//   TIMEOUT: parseInt(getEnv('REACT_APP_API_TIMEOUT', '10000'), 10),
//   RETRY_ATTEMPTS: parseInt(getEnv('REACT_APP_API_RETRY_ATTEMPTS', '3'), 10),
//   RETRY_DELAY: parseInt(getEnv('REACT_APP_API_RETRY_DELAY', '1000'), 10),
// };

export const API_CONFIG = {
  BASE_URL:
    process.env.REACT_APP_API_BASE_URL ||
    'https://jobsschart-api.maktechgroup.tech/api/v1',
      VITALS_ENDPOINT: getEnv('REACT_APP_VITALS_ENDPOINT', ''),
  TIMEOUT: parseInt(process.env.REACT_APP_API_TIMEOUT, 10) || 10000,
  RETRY_ATTEMPTS: parseInt(process.env.REACT_APP_API_RETRY_ATTEMPTS, 10) || 3,
  RETRY_DELAY: parseInt(process.env.REACT_APP_API_RETRY_DELAY, 10) || 1000,
};

/* =========================
   SEO CONFIG
========================= */
export const SEO_CONFIG = {
  DEFAULT_TITLE: getEnv('REACT_APP_SEO_TITLE', 'NM'),
  DEFAULT_DESCRIPTION: getEnv(
    'REACT_APP_SEO_DESCRIPTION',
    'A professional React application'
  ),
  DEFAULT_KEYWORDS: getEnv(
    'REACT_APP_SEO_KEYWORDS',
    'react,webpack,tailwind'
  ).split(','),

  SITE_URL:
    typeof window !== 'undefined' ? window.location.origin : '',
};

/* =========================
   PERFORMANCE BUDGETS
========================= */
export const PERFORMANCE_BUDGETS = {
  LCP: 2500,
  FCP: 1800,
  CLS: 0.1,
  INP: 200,
  TTFB: 800,
};

/* =========================
   TOAST CONFIG
========================= */
export const TOAST_CONFIG = {
  POSITION: 'top-center',
  DURATION: 3000,
};