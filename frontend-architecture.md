# Production-Grade React Frontend Architecture

## Complete Boilerplate Documentation

**Version:** 1.0.0  
**Last Updated:** February 15, 2026  
**Architecture Level:** Principal Frontend Architect (10+ Years Experience)

---

## 📋 Table of Contents

1. [Executive Summary](#executive-summary)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Core Architecture Principles](#core-architecture-principles)
5. [Installation & Setup](#installation--setup)
6. [Configuration System](#configuration-system)
7. [Routing Architecture](#routing-architecture)
8. [State Management (Redux Toolkit)](#state-management-redux-toolkit)
9. [API Integration Layer](#api-integration-layer)
10. [Custom Hooks System](#custom-hooks-system)
11. [SEO Architecture](#seo-architecture)
12. [Performance Monitoring](#performance-monitoring)
13. [Authentication System](#authentication-system)
14. [Error Handling](#error-handling)
15. [Component Architecture](#component-architecture)
16. [Styling System](#styling-system)
17. [Build & Deployment](#build--deployment)
18. [Code Quality Standards](#code-quality-standards)
19. [Performance Optimization](#performance-optimization)
20. [Accessibility (WCAG AA)](#accessibility-wcag-aa)
21. [Testing Strategy](#testing-strategy)
22. [Best Practices](#best-practices)

---

## Executive Summary

This is a **production-grade, enterprise-level React frontend architecture** designed for scalability, performance, and maintainability. Built with modern LTS packages and industry-leading engineering standards, this boilerplate serves as a foundation for building high-performance web applications.

### Key Highlights

- ✅ React 18+ with modern hooks patterns
- ✅ Redux Toolkit for predictable state management
- ✅ Webpack 5 custom configuration with optimization
- ✅ Tailwind CSS for utility-first styling
- ✅ React Router DOM v7 for declarative routing
- ✅ Comprehensive SEO architecture
- ✅ Core Web Vitals monitoring (LCP, FCP, CLS, INP, TTFB)
- ✅ Enterprise-grade API integration layer
- ✅ WCAG AA accessibility compliance
- ✅ Error boundaries and graceful degradation
- ✅ Clean, maintainable, SOLID-compliant code

---

## Technology Stack

### Core Dependencies (LTS & Stable)

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^7.13.0",
  "@reduxjs/toolkit": "^2.11.2",
  "react-redux": "^9.2.0",
  "axios": "^1.13.4",
  "js-cookie": "^3.0.5",
  "lucide-react": "^0.563.0",
  "react-hot-toast": "^2.6.0",
  "web-vitals": "^5.1.0"
}
```

### Development Dependencies

```json
{
  "@babel/core": "^7.23.7",
  "@babel/preset-env": "^7.23.7",
  "@babel/preset-react": "^7.23.3",
  "webpack": "^5.89.0",
  "webpack-dev-server": "^4.15.1",
  "webpack-cli": "^5.1.4",
  "html-webpack-plugin": "^5.6.0",
  "babel-loader": "^9.1.3",
  "css-loader": "^6.9.0",
  "style-loader": "^3.3.4",
  "postcss": "^8.5.6",
  "postcss-loader": "^8.2.0",
  "@tailwindcss/postcss": "^4.1.18"
}
```

### Why These Technologies?

| Technology          | Justification                                                                  |
| ------------------- | ------------------------------------------------------------------------------ |
| **React 18**        | Latest stable LTS, concurrent features, automatic batching, improved hydration |
| **Webpack 5**       | Advanced bundling, module federation, tree-shaking, asset optimization         |
| **Redux Toolkit**   | Simplified Redux with built-in best practices, less boilerplate                |
| **Axios**           | Mature HTTP client, interceptors support, better error handling than fetch     |
| **Tailwind CSS**    | Utility-first, minimal bundle size, rapid development                          |
| **React Router v7** | Modern routing, enhanced lazy loading, better TypeScript support               |

---

## Project Structure

```
Project/
├── public/
│   └── index.html                      # HTML entry point
│
├── src/
│   ├── index.jsx                       # Application bootstrap
│   ├── index.css                       # Global styles (Tailwind imports)
│   ├── App.jsx                         # Root component with providers
│   │
│   ├── components/                     # Reusable UI components
│   │   ├── ErrorBoundary.jsx          # Global error handler
│   │   ├── Layout.jsx                 # Main layout wrapper
│   │   ├── ThemeToggle.jsx            # Theme switcher component
│   │   ├── CartExample.jsx            # Shopping cart demo
│   │   ├── LoginExample.jsx           # Authentication demo
│   │   │
│   │   ├── home/                      # Home page components
│   │   │   └── HomeContent.jsx
│   │   ├── about/                     # About page components
│   │   │   └── AboutContent.jsx
│   │   ├── contact/                   # Contact page components
│   │   │   └── ContactContent.jsx
│   │   ├── services/                  # Services page components
│   │   │   └── ServicesContent.jsx
│   │   │
│   │   └── layout/                    # Role-based layouts
│   │       ├── admin/                 # Admin dashboard layout
│   │       ├── auth/                  # Authentication layout
│   │       └── user/                  # User dashboard layout
│   │
│   ├── pages/                         # Page-level components
│   │   ├── Home.jsx                   # Home page
│   │   ├── About.jsx                  # About page
│   │   ├── Contact.jsx                # Contact page
│   │   ├── Services.jsx               # Services page
│   │   └── ReduxDemo.jsx              # Redux demonstration page
│   │
│   ├── router/                        # Routing configuration
│   │   └── router.jsx                 # Centralized routes
│   │
│   ├── store/                         # Redux state management
│   │   ├── store.js                   # Redux store configuration
│   │   └── slices/                    # Feature-based slices
│   │       ├── authSlice.js          # Authentication state
│   │       ├── themeSlice.js         # Theme state
│   │       └── cartSlice.js          # Shopping cart state
│   │
│   ├── services/                      # API integration layer
│   │   ├── axiosInstance.js          # Configured Axios client
│   │   ├── httpEndpoint.js           # API endpoint constants
│   │   └── httpMethods.js            # HTTP request abstractions
│   │
│   ├── hooks/                         # Custom React hooks
│   │   ├── useApi.js                 # API state management hook
│   │   └── useSEO.js                 # SEO management hook
│   │
│   ├── utils/                         # Utility functions
│   │   ├── auth.js                   # Authentication utilities
│   │   ├── seo.js                    # SEO helper functions
│   │   └── web-vitals.js             # Performance monitoring
│   │
│   └── config/                        # Application configuration
│       └── index.js                   # Centralized config
│
│
├── package.json                       # Dependencies & scripts
├── webpack.config.js                  # Webpack configuration
├── postcss.config.js                  # PostCSS configuration
├── README.md                          # Quick start guide
└── REDUX_GUIDE.md                     # Redux documentation

```

### Structural Design Principles

1. **Feature-Based Organization**: Components grouped by feature/page
2. **Separation of Concerns**: Clear boundaries between UI, state, and data
3. **Single Responsibility**: Each file has one clear purpose
4. **Scalability**: Easy to extend with new features
5. **Discoverability**: Intuitive structure for new developers

---

## Core Architecture Principles

### 1. SOLID Principles

#### Single Responsibility Principle

```jsx
// ❌ BAD: Component doing too much
function UserProfile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  // Fetching, validation, rendering all in one component
}

// ✅ GOOD: Separated concerns
function UserProfile() {
  const { data: user } = useApi(fetchUser);
  return <UserProfileView user={user} />;
}
```

#### Open/Closed Principle

```jsx
// ✅ Extensible without modification
const Layout = ({ children, type }) => {
  const LayoutComponent = layoutMap[type] || DefaultLayout;
  return <LayoutComponent>{children}</LayoutComponent>;
};
```

### 2. DRY (Don't Repeat Yourself)

```jsx
// ❌ BAD: Repeated logic
function ComponentA() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // ... fetch logic
}

// ✅ GOOD: Custom hook
function ComponentA() {
  const { data, loading, error } = useApi(apiFunction);
}
```

### 3. Clean Code Standards

- **Meaningful Names**: Variables and functions clearly express intent
- **Small Functions**: Each function does one thing well
- **No Magic Numbers**: Use named constants
- **Consistent Formatting**: Automated with Prettier
- **Comments**: Explain "why", not "what"

---

## Installation & Setup

### Prerequisites

```bash
Node.js: >= 16.x LTS
npm: >= 8.x
```

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Environment Setup

Create `.env` file in root:

```env
NODE_ENV=development
REACT_APP_API_URL=https://api.example.com
REACT_APP_ANALYTICS_ID=your_analytics_id
```

### Step 3: Development Server

```bash
npm run dev
# or
npm start
```

Server runs on `http://localhost:5173`

### Step 4: Production Build

```bash
npm run build
```

Output: `dist/` directory with optimized assets

### Folder Permissions (if needed)

```bash
chmod -R 755 Project/
```

---

## Configuration System

### Centralized Configuration (`src/config/index.js`)

```javascript
export const APP_CONFIG = {
  NAME: 'My React App',
};

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  CONTACT: '/contact',
};

export const API_CONFIG = {
  BASE_URL: 'https://api.example.com',
  VITALS_ENDPOINT: 'https://vitals.vercel-analytics.com/v1/vitals',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

export const SEO_CONFIG = {
  DEFAULT_TITLE: 'My React App',
  DEFAULT_DESCRIPTION: 'A professional React application',
  DEFAULT_KEYWORDS: ['react', 'webpack', 'tailwind'],
  SITE_URL: typeof window !== 'undefined' ? window.location.origin : '',
};

export const PERFORMANCE_BUDGETS = {
  LCP: 2500, // Largest Contentful Paint
  FCP: 1800, // First Contentful Paint
  CLS: 0.1, // Cumulative Layout Shift
  INP: 200, // Interaction to Next Paint
  TTFB: 800, // Time to First Byte
};

export const TOAST_CONFIG = {
  POSITION: 'top-center',
  DURATION: 3000,
};
```

### Usage Example

```jsx
import { API_CONFIG, ROUTES, SEO_CONFIG } from '../config';

// Using in components
<Link to={ROUTES.HOME}>Home</Link>;

// Using in services
axios.get(`${API_CONFIG.BASE_URL}/users`);

// Using in SEO
<meta name='description' content={SEO_CONFIG.DEFAULT_DESCRIPTION} />;
```

### Configuration Benefits

1. **Single Source of Truth**: All settings in one place
2. **Easy Maintenance**: Update once, reflect everywhere
3. **Type Safety**: Can be extended with TypeScript
4. **Environment Aware**: Different configs for dev/prod

---

## Routing Architecture

### Router Configuration (`src/router/router.jsx`)

```jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Services from '../pages/Services';
import ReduxDemo from '../pages/ReduxDemo';
import { ROUTES } from '../config';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.SERVICES} element={<Services />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
        <Route path='/redux-demo' element={<ReduxDemo />} />
      </Route>
    </>,
  ),
);

export default router;
```

### Root Component Integration (`src/App.jsx`)

```jsx
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import ErrorBoundary from './components/ErrorBoundary';
import router from './router/router';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
```

### Advanced Routing Patterns

#### Lazy Loading

```jsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));

<Route
  path='/dashboard'
  element={
    <Suspense fallback={<LoadingSpinner />}>
      <Dashboard />
    </Suspense>
  }
/>;
```

#### Protected Routes

```jsx
function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? children : <Navigate to='/login' />;
}

<Route
  path='/dashboard'
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>;
```

#### Role-Based Routing

```jsx
function RoleBasedRoute({ children, allowedRoles }) {
  const user = useSelector(selectUser);
  const hasAccess = allowedRoles.includes(user?.role);
  return hasAccess ? children : <Navigate to='/unauthorized' />;
}
```

### Routing Best Practices

1. **Centralized Routes**: All routes in one configuration file
2. **Named Routes**: Use constants instead of hardcoded strings
3. **Nested Layouts**: Share layouts across route groups
4. **Code Splitting**: Lazy load heavy pages
5. **Error Pages**: 404, 500, and fallback routes

---

## State Management (Redux Toolkit)

### Store Configuration (`src/store/store.js`)

```javascript
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import cartReducer from './slices/cartSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    cart: cartReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
```

### Authentication Slice (`src/store/slices/authSlice.js`)

```javascript
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;

      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.user));
    },
  },
});

export const { loginSuccess, logout, setLoading, updateUser } =
  authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectToken = (state) => state.auth.token;
export const selectAuthLoading = (state) => state.auth.loading;
```

### Theme Slice (`src/store/slices/themeSlice.js`)

```javascript
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: localStorage.getItem('theme') || 'light',
  primaryColor: '#3B82F6',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.mode);

      if (state.mode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },

    setTheme: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem('theme', action.payload);

      if (action.payload === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },

    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
    },
  },
});

export const { toggleTheme, setTheme, setPrimaryColor } = themeSlice.actions;
export default themeSlice.reducer;

export const selectThemeMode = (state) => state.theme.mode;
export const selectPrimaryColor = (state) => state.theme.primaryColor;
```

### Cart Slice (`src/store/slices/cartSlice.js`)

```javascript
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);

      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    },

    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find((item) => item.id === productId);
      if (item) {
        item.quantity += 1;
        state.totalItems += 1;
        state.totalPrice += item.price;
      }
    },

    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find((item) => item.id === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalItems -= 1;
        state.totalPrice -= item.price;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectTotalItems = (state) => state.cart.totalItems;
export const selectTotalPrice = (state) => state.cart.totalPrice;
```

### Using Redux in Components

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logout, selectUser } from '../store/slices/authSlice';
import { addToCart, selectTotalItems } from '../store/slices/cartSlice';
import { toggleTheme, selectThemeMode } from '../store/slices/themeSlice';

function MyComponent() {
  const dispatch = useDispatch();

  // Reading state
  const user = useSelector(selectUser);
  const cartTotal = useSelector(selectTotalItems);
  const themeMode = useSelector(selectThemeMode);

  // Dispatching actions
  const handleLogin = (userData) => {
    dispatch(loginSuccess(userData));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div>
      {user && <p>Welcome, {user.name}</p>}
      <button onClick={handleThemeToggle}>
        Switch to {themeMode === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      <span>Cart: {cartTotal} items</span>
    </div>
  );
}
```

### Redux Best Practices

1. **Feature-Based Slices**: One slice per feature (auth, cart, theme)
2. **Normalized State**: Avoid deeply nested structures
3. **Memoized Selectors**: Use `createSelector` for derived data
4. **Immutable Updates**: Redux Toolkit handles this automatically
5. **DevTools Integration**: Debug state changes in development

---

## API Integration Layer

### Axios Instance (`src/services/axiosInstance.js`)

```javascript
import axios from 'axios';
import { API_CONFIG } from '../config';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Attach authentication token
    const token = Cookies.get('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Set locale for i18n
    const locale = localStorage.getItem('locale') || 'en';
    config.headers['Accept-Language'] = locale;

    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  },
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized (Token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Clear auth data
      Cookies.remove('auth_token');
      localStorage.removeItem('user');

      // Redirect to login
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error('Access Forbidden:', error.response.data);
    }

    // Handle 5xx Server Errors
    if (error.response?.status >= 500) {
      console.error('Server Error:', error.response.data);
    }

    // Handle Network Errors
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
```

### HTTP Methods Layer (`src/services/httpMethods.js`)

```javascript
import axiosInstance from './axiosInstance';

export const httpMethods = {
  get: async (url, config = {}) => {
    try {
      const response = await axiosInstance.get(url, config);
      return { data: response, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  post: async (url, data, config = {}) => {
    try {
      const response = await axiosInstance.post(url, data, config);
      return { data: response, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  put: async (url, data, config = {}) => {
    try {
      const response = await axiosInstance.put(url, data, config);
      return { data: response, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  patch: async (url, data, config = {}) => {
    try {
      const response = await axiosInstance.patch(url, data, config);
      return { data: response, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  delete: async (url, config = {}) => {
    try {
      const response = await axiosInstance.delete(url, config);
      return { data: response, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
};

export default httpMethods;
```

### API Endpoints (`src/services/httpEndpoint.js`)

```javascript
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
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
```

### Usage Example

```jsx
import { httpMethods } from '../services/httpMethods';
import { API_ENDPOINTS } from '../services/httpEndpoint';

// Login Example
async function login(credentials) {
  const { data, error } = await httpMethods.post(
    API_ENDPOINTS.AUTH.LOGIN,
    credentials,
  );

  if (error) {
    console.error('Login failed:', error.message);
    return;
  }

}

// Fetch User Profile
async function getUserProfile(userId) {
  const { data, error } = await httpMethods.get(
    API_ENDPOINTS.USERS.BY_ID(userId),
  );

  if (error) {
    console.error('Failed to fetch profile:', error.message);
    return;
  }

  return data;
}
```

### API Architecture Benefits

1. **Centralized Configuration**: All API logic in one place
2. **Automatic Token Management**: Interceptors handle authentication
3. **Consistent Error Handling**: Standardized error responses
4. **Type-Safe Endpoints**: Named constants prevent typos
5. **Easy Testing**: Mock `httpMethods` for unit tests

---

## Custom Hooks System

### useApi Hook (`src/hooks/useApi.js`)

```javascript
import { useState, useCallback } from 'react';

export const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction(...args);

        if (result.error) {
          setError(result.error);
          return { data: null, error: result.error };
        }

        setData(result.data);
        return { data: result.data, error: null };
      } catch (err) {
        setError(err);
        return { data: null, error: err };
      } finally {
        setLoading(false);
      }
    },
    [apiFunction],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, error, loading, execute, reset };
};
```

### useSEO Hook (`src/hooks/useSEO.js`)

```javascript
import { useEffect } from 'react';
import { generateMetadata, updateMetaTags } from '../utils/seo';

export const useSEO = ({
  title,
  description,
  keywords = [],
  image = '',
  type = 'website',
  locale = 'en',
}) => {
  useEffect(() => {
    const metadata = generateMetadata({
      title,
      description,
      keywords,
      image,
      type,
      locale,
    });

    updateMetaTags(metadata);
  }, [title, description, keywords, image, type, locale]);
};
```

### Using Custom Hooks

```jsx
import { useApi } from '../hooks/useApi';
import { useSEO } from '../hooks/useSEO';
import { httpMethods } from '../services/httpMethods';
import { API_ENDPOINTS } from '../services/httpEndpoint';

function UserProfile({ userId }) {
  // SEO Management
  useSEO({
    title: 'User Profile',
    description: 'View user profile and activity',
    keywords: ['user', 'profile', 'dashboard'],
  });

  // API Integration
  const { data, loading, error, execute } = useApi(httpMethods.get);

  useEffect(() => {
    execute(API_ENDPOINTS.USERS.BY_ID(userId));
  }, [userId, execute]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>{data?.name}</h1>
      <p>{data?.email}</p>
    </div>
  );
}
```

### Custom Hooks Best Practices

1. **Single Responsibility**: Each hook does one thing
2. **Reusability**: Generic enough to use across components
3. **Cleanup**: Always cleanup effects and subscriptions
4. **Dependencies**: Correct dependency arrays
5. **Naming**: Prefix with `use` (React convention)

---

## SEO Architecture

### SEO Utilities (`src/utils/seo.js`)

```javascript
import { SEO_CONFIG } from '../config';

export const generateMetadata = ({
  title,
  description,
  keywords = [],
  url = '',
  image = '',
  type = 'website',
  locale = 'en',
  author = '',
}) => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const fullUrl =
    url || (typeof window !== 'undefined' ? window.location.href : baseUrl);
  const siteName = SEO_CONFIG.DEFAULT_TITLE;

  return {
    title: title ? `${title} | ${siteName}` : siteName,
    description,
    keywords: keywords.join(', '),
    canonical: fullUrl,
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName,
      images: image ? [{ url: image }] : [],
      locale,
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [],
    },
  };
};

export const generateStructuredData = (type, data) => {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  return JSON.stringify({ ...baseData, ...data });
};

export const updateMetaTags = (metadata) => {
  if (typeof document === 'undefined') return;

  document.title = metadata.title;

  const metaTags = [
    { name: 'description', content: metadata.description },
    { name: 'keywords', content: metadata.keywords },
    { property: 'og:title', content: metadata.openGraph.title },
    { property: 'og:description', content: metadata.openGraph.description },
    { property: 'og:url', content: metadata.openGraph.url },
    { property: 'og:site_name', content: metadata.openGraph.siteName },
    { property: 'og:locale', content: metadata.openGraph.locale },
    { property: 'og:type', content: metadata.openGraph.type },
    { name: 'twitter:card', content: metadata.twitter.card },
    { name: 'twitter:title', content: metadata.twitter.title },
    { name: 'twitter:description', content: metadata.twitter.description },
  ];

  if (metadata.openGraph.images.length > 0) {
    metaTags.push({
      property: 'og:image',
      content: metadata.openGraph.images[0].url,
    });
  }

  if (metadata.twitter.images.length > 0) {
    metaTags.push({
      name: 'twitter:image',
      content: metadata.twitter.images[0],
    });
  }

  metaTags.forEach(({ name, property, content }) => {
    if (!content) return;

    const selector = name
      ? `meta[name="${name}"]`
      : `meta[property="${property}"]`;
    let element = document.querySelector(selector);

    if (!element) {
      element = document.createElement('meta');
      if (name) element.setAttribute('name', name);
      if (property) element.setAttribute('property', property);
      document.head.appendChild(element);
    }

    element.setAttribute('content', content);
  });

  // Canonical Link
  const canonicalLink =
    document.querySelector('link[rel="canonical"]') ||
    document.createElement('link');
  canonicalLink.setAttribute('rel', 'canonical');
  canonicalLink.setAttribute('href', metadata.canonical);
  if (!document.querySelector('link[rel="canonical"]')) {
    document.head.appendChild(canonicalLink);
  }
};

export const createBreadcrumbStructuredData = (breadcrumbs) => {
  const itemListElement = breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url,
  }));

  return generateStructuredData('BreadcrumbList', { itemListElement });
};
```

### Using SEO in Pages

```jsx
import React, { memo } from 'react';
import { useSEO } from '../hooks/useSEO';

const Home = memo(() => {
  useSEO({
    title: 'Home',
    description: 'Welcome to our React application',
    keywords: ['react', 'webpack', 'tailwind', 'router'],
    image: 'https://example.com/og-image.jpg',
    type: 'website',
    locale: 'en',
  });

  return <div>Home Content</div>;
});

export default Home;
```

### Structured Data Example

```jsx
import { generateStructuredData } from '../utils/seo';

// Organization Schema
const orgSchema = generateStructuredData('Organization', {
  name: 'My Company',
  url: 'https://example.com',
  logo: 'https://example.com/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-123-456-7890',
    contactType: 'Customer Service',
  },
});

// Inject into head
<script type='application/ld+json'>{orgSchema}</script>;
```

### SEO Best Practices

1. **Dynamic Metadata**: Update per page
2. **Open Graph**: Social media previews
3. **Twitter Cards**: Enhanced Twitter sharing
4. **Structured Data**: Rich search results (JSON-LD)
5. **Canonical URLs**: Avoid duplicate content
6. **Semantic HTML**: Use proper heading hierarchy

---

## Performance Monitoring

### Web Vitals System (`src/utils/web-vitals.js`)

```javascript
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';
import { API_CONFIG } from '../config';

const vitalsUrl = API_CONFIG.VITALS_ENDPOINT;

const getConnectionSpeed = () => {
  if (typeof navigator !== 'undefined' && 'connection' in navigator) {
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    return connection?.effectiveType || 'unknown';
  }
  return 'unknown';
};

const sendToAnalytics = (metric) => {
  const body = JSON.stringify({
    id: metric.id,
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    navigationType: metric.navigationType,
    connectionSpeed: getConnectionSpeed(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    timestamp: Date.now(),
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, body);
  } else {
    fetch(vitalsUrl, {
      body,
      method: 'POST',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(console.error);
  }
};

const logToConsole = (metric) => {
  const thresholds = {
    CLS: { good: 0.1, needsImprovement: 0.25 },
    FCP: { good: 1800, needsImprovement: 3000 },
    INP: { good: 200, needsImprovement: 500 },
    LCP: { good: 2500, needsImprovement: 4000 },
    TTFB: { good: 800, needsImprovement: 1800 },
  };

  const threshold = thresholds[metric.name];
  let status = '🔴 Poor';

  if (metric.value <= threshold.good) {
    status = '🟢 Good';
  } else if (metric.value <= threshold.needsImprovement) {
    status = '🟡 Needs Improvement';
  }

  
};

const handleMetric = (metric) => {
  logToConsole(metric);

  if (process.env.NODE_ENV === 'production') {
    sendToAnalytics(metric);
  }
};

export const reportWebVitals = () => {
  onCLS(handleMetric);
  onFCP(handleMetric);
  onINP(handleMetric);
  onLCP(handleMetric);
  onTTFB(handleMetric);
};

export const detectLongTasks = () => {
  if (typeof PerformanceObserver === 'undefined') return;

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          console.warn(
            `⚠️ Long Task detected: ${entry.duration.toFixed(2)}ms`,
            {
              startTime: entry.startTime,
              duration: entry.duration,
              name: entry.name,
            },
          );
        }
      }
    });

    observer.observe({ entryTypes: ['longtask'] });
  } catch (error) {
    console.error('Long task detection not supported:', error);
  }
};

export const checkPerformanceBudget = () => {
  const PERFORMANCE_BUDGETS = {
    LCP: 2500,
    FCP: 1800,
    CLS: 0.1,
    INP: 200,
    TTFB: 800,
  };

  const metrics = {};

  const checkBudget = () => {
    Object.entries(PERFORMANCE_BUDGETS).forEach(([metric, budget]) => {
      if (metrics[metric] && metrics[metric] > budget) {
        console.warn(
          `⚠️ Performance Budget Exceeded: ${metric} = ${metrics[metric]} (budget: ${budget})`,
        );
      }
    });
  };

  onLCP((metric) => {
    metrics.LCP = metric.value;
    checkBudget();
  });

  onFCP((metric) => {
    metrics.FCP = metric.value;
    checkBudget();
  });

  onCLS((metric) => {
    metrics.CLS = metric.value;
    checkBudget();
  });

  onINP((metric) => {
    metrics.INP = metric.value;
    checkBudget();
  });

  onTTFB((metric) => {
    metrics.TTFB = metric.value;
    checkBudget();
  });
};
```

### Integration in Entry Point (`src/index.jsx`)

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  reportWebVitals,
  detectLongTasks,
  checkPerformanceBudget,
} from './utils/web-vitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Performance Monitoring (Development Only)
if (process.env.NODE_ENV !== 'production') {
  reportWebVitals();
  detectLongTasks();
  checkPerformanceBudget();
}
```

### Core Web Vitals Explained

| Metric   | Name                      | Good    | Needs Improvement | Poor     | Description          |
| -------- | ------------------------- | ------- | ----------------- | -------- | -------------------- |
| **LCP**  | Largest Contentful Paint  | ≤ 2.5s  | ≤ 4.0s            | > 4.0s   | Loading performance  |
| **FCP**  | First Contentful Paint    | ≤ 1.8s  | ≤ 3.0s            | > 3.0s   | Initial render speed |
| **CLS**  | Cumulative Layout Shift   | ≤ 0.1   | ≤ 0.25            | > 0.25   | Visual stability     |
| **INP**  | Interaction to Next Paint | ≤ 200ms | ≤ 500ms           | > 500ms  | Responsiveness       |
| **TTFB** | Time to First Byte        | ≤ 800ms | ≤ 1800ms          | > 1800ms | Server response time |

### Performance Monitoring Benefits

1. **Real User Monitoring (RUM)**: Track actual user experiences
2. **Performance Budgets**: Automatic alerts when budgets exceeded
3. **Long Task Detection**: Identify blocking JavaScript
4. **Analytics Integration**: Send metrics to analytics platform
5. **Development Feedback**: Console logs in dev mode

---

## Authentication System

### Authentication Utilities (`src/utils/auth.js`)

```javascript
import Cookies from 'js-cookie';

export const authUtils = {
  setToken: (token, remember = false) => {
    const options = remember ? { expires: 7 } : {};
    Cookies.set('auth_token', token, options);
  },

  getToken: () => {
    return Cookies.get('auth_token');
  },

  removeToken: () => {
    Cookies.remove('auth_token');
  },

  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  removeUser: () => {
    localStorage.removeItem('user');
  },

  isAuthenticated: () => {
    return !!Cookies.get('auth_token');
  },

  logout: () => {
    Cookies.remove('auth_token');
    localStorage.removeItem('user');
  },
};
```

### Login Implementation Example

```jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../store/slices/authSlice';
import { authUtils } from '../utils/auth';
import { httpMethods } from '../services/httpMethods';
import { API_ENDPOINTS } from '../services/httpEndpoint';
import toast from 'react-hot-toast';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await httpMethods.post(API_ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    });

    if (error) {
      toast.error(error.message || 'Login failed');
      setLoading(false);
      return;
    }

    // Store token and user data
    authUtils.setToken(data.token, remember);
    authUtils.setUser(data.user);

    // Update Redux state
    dispatch(loginSuccess(data));

    toast.success('Login successful!');
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
        required
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
        required
      />
      <label>
        <input
          type='checkbox'
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
        Remember me
      </label>
      <button type='submit' disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

### Logout Implementation

```jsx
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import { authUtils } from '../utils/auth';
import toast from 'react-hot-toast';

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear cookies and localStorage
    authUtils.logout();

    // Update Redux state
    dispatch(logout());

    toast.success('Logged out successfully');
    navigate('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```

### Protected Route Pattern

```jsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/slices/authSlice';

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return children;
}

// Usage in router
<Route
  path='/dashboard'
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>;
```

### Authentication Best Practices

1. **HTTP-Only Cookies**: Store tokens securely (prevents XSS)
2. **Token Expiration**: Implement refresh token mechanism
3. **Secure Storage**: Never store sensitive data in localStorage
4. **HTTPS Only**: Always use HTTPS in production
5. **CSRF Protection**: Include CSRF tokens for state-changing requests

---

## Error Handling

### Error Boundary Component (`src/components/ErrorBoundary.jsx`)

```jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);

    // Send error to logging service
    if (process.env.NODE_ENV === 'production') {
      // logErrorToService(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
          <div className='max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center'>
            <h1 className='text-2xl font-bold text-red-600 mb-4'>
              Something went wrong
            </h1>
            <p className='text-gray-600 mb-4'>
              We apologize for the inconvenience.
            </p>
            <button
              onClick={() => window.location.reload()}
              className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition'
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

### API Error Handling

```jsx
import toast from 'react-hot-toast';

// In component
const { data, error, loading, execute } = useApi(httpMethods.get);

useEffect(() => {
  execute(API_ENDPOINTS.USERS.LIST);
}, [execute]);

useEffect(() => {
  if (error) {
    toast.error(error.message || 'Something went wrong');
  }
}, [error]);

if (loading) return <Spinner />;
if (error) return <ErrorMessage message={error.message} />;
```

### Custom Error Messages Component

```jsx
function ErrorMessage({ message, retry }) {
  return (
    <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
      <div className='flex items-center'>
        <AlertCircle className='h-5 w-5 text-red-600 mr-2' />
        <p className='text-red-800'>{message}</p>
      </div>
      {retry && (
        <button
          onClick={retry}
          className='mt-2 text-red-600 hover:text-red-800'
        >
          Try Again
        </button>
      )}
    </div>
  );
}
```

### Error Handling Best Practices

1. **Global Error Boundary**: Catch React component errors
2. **API Error Normalization**: Consistent error structure
3. **User-Friendly Messages**: Clear, actionable error messages
4. **Logging**: Send errors to monitoring service (Sentry, LogRocket)
5. **Graceful Degradation**: Fallback UI when errors occur

---

## Component Architecture

### Layout Component (`src/components/Layout.jsx`)

```jsx
import React, { memo } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { APP_CONFIG, ROUTES } from '../config';

const Layout = memo(() => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <nav className='bg-blue-600 text-white shadow-lg'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center space-x-8'>
              <h1 className='text-xl font-bold'>{APP_CONFIG.NAME}</h1>
              <div className='flex space-x-4'>
                <Link
                  to={ROUTES.HOME}
                  className='hover:bg-blue-700 px-3 py-2 rounded transition'
                >
                  Home
                </Link>
                <Link
                  to={ROUTES.ABOUT}
                  className='hover:bg-blue-700 px-3 py-2 rounded transition'
                >
                  About
                </Link>
                <Link
                  to={ROUTES.SERVICES}
                  className='hover:bg-blue-700 px-3 py-2 rounded transition'
                >
                  Services
                </Link>
                <Link
                  to={ROUTES.CONTACT}
                  className='hover:bg-blue-700 px-3 py-2 rounded transition'
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className='container mx-auto px-4 py-8'>
        <Outlet />
      </main>
    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout;
```

### Page Component Pattern

```jsx
import React, { memo } from 'react';
import { useSEO } from '../hooks/useSEO';
import HomeContent from '../components/home/HomeContent';

const Home = memo(() => {
  useSEO({
    title: 'Home',
    description: 'Welcome to our React application',
    keywords: ['react', 'webpack', 'tailwind', 'router'],
  });

  return <HomeContent />;
});

Home.displayName = 'Home';

export default Home;
```

### Component Design Principles

1. **Presentation vs Container**: Separate UI from logic
2. **Single Responsibility**: One component, one purpose
3. **Composition**: Build complex UIs from simple components
4. **Props Validation**: Use PropTypes or TypeScript
5. **Memoization**: Use `React.memo` for expensive renders

### Component Patterns

#### Compound Components

```jsx
function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </TabsContext.Provider>
  );
}

Tabs.List = TabsList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

// Usage
<Tabs>
  <Tabs.List>
    <Tabs.Tab>Tab 1</Tabs.Tab>
    <Tabs.Tab>Tab 2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panels>
    <Tabs.Panel>Content 1</Tabs.Panel>
    <Tabs.Panel>Content 2</Tabs.Panel>
  </Tabs.Panels>
</Tabs>;
```

#### Render Props

```jsx
function DataFetcher({ url, children }) {
  const { data, loading, error } = useApi(() => httpMethods.get(url));
  return children({ data, loading, error });
}

// Usage
<DataFetcher url='/api/users'>
  {({ data, loading, error }) =>
    loading ? <Spinner /> : <UserList users={data} />
  }
</DataFetcher>;
```

---

## Styling System

### Tailwind CSS Configuration (`postcss.config.js`)

```javascript
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

### Global Styles (`src/index.css`)

```css
@import 'tailwindcss';

/* Custom Global Styles */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family:
    source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}
```

### Tailwind Utility Classes

```jsx
// Responsive Design
<div className="container mx-auto px-4 sm:px-6 lg:px-8">

// Flexbox Layout
<div className="flex items-center justify-between">

// Grid Layout
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Colors & Background
<button className="bg-blue-600 hover:bg-blue-700 text-white">

// Spacing
<div className="p-4 m-2 space-y-4">

// Typography
<h1 className="text-2xl font-bold text-gray-900">

// Shadows
<div className="shadow-md hover:shadow-lg transition">

// Borders
<div className="border border-gray-200 rounded-lg">
```

### Component Styling Best Practices

1. **Utility-First**: Use Tailwind utilities instead of custom CSS
2. **Responsive Design**: Mobile-first approach (`sm:`, `md:`, `lg:`)
3. **Dark Mode**: Use `dark:` variant for dark theme
4. **Consistent Spacing**: Use Tailwind's spacing scale
5. **Custom Components**: Extract repeated patterns

---

## Build & Deployment

### Webpack Configuration (`webpack.config.js`)

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
    port: 5173,
    hot: true,
    open: true,
  },
};
```

### Production Build Optimization

```javascript
// webpack.config.js (production mode)
module.exports = {
  mode: 'production',
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
        },
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
```

### Package Scripts

```json
{
  "scripts": {
    "start": "webpack serve --mode development --open",
    "dev": "webpack serve --mode development",
    "build": "webpack --mode production",
    "build:analyze": "webpack --mode production --analyze",
    "serve": "serve -s dist"
  }
}
```

### Deployment Checklist

- [ ] Environment variables configured
- [ ] API endpoints point to production
- [ ] Build optimizations enabled
- [ ] Source maps disabled (or separate)
- [ ] Bundle size analyzed
- [ ] Performance tested (Lighthouse)
- [ ] SEO metadata verified
- [ ] Error tracking enabled (Sentry)
- [ ] Analytics integrated (Google Analytics)

### Deployment Platforms

| Platform                | Configuration                        |
| ----------------------- | ------------------------------------ |
| **Vercel**              | Zero-config, deploy with `vercel`    |
| **Netlify**             | `netlify deploy --prod`              |
| **AWS S3 + CloudFront** | Upload `dist/` to S3 bucket          |
| **GitHub Pages**        | `gh-pages` branch with `dist/`       |
| **Docker**              | Container with nginx serving `dist/` |

---

## Code Quality Standards

### Naming Conventions

| Type                | Convention                    | Example                       |
| ------------------- | ----------------------------- | ----------------------------- |
| Components          | `PascalCase`                  | `UserProfileCard.jsx`         |
| Hooks               | `camelCase` with `use` prefix | `useAuthStatus.js`            |
| Utilities           | `camelCase`                   | `formatCurrency.js`           |
| Redux slices        | `camelCase` + `Slice` suffix  | `authSlice.js`                |
| Constants           | `SCREAMING_SNAKE_CASE`        | `API_BASE_URL`                |
| Component files     | `PascalCase`                  | `UserProfile.jsx`             |
| Non-component files | `camelCase`                   | `axiosInstance.js`            |
| Event handlers      | `handle` prefix               | `handleSubmit`, `handleClick` |

### ESLint Configuration

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "rules": {
    "react/prop-types": "warn",
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "no-unused-vars": "warn"
  }
}
```

---

## Clean Code Principles

> These seven principles apply to all files, all components, and all pull requests.

### 1. Write Code as if Explaining it to Someone Unfamiliar

Variable names, function names, and file names must be self-documenting.

```js
// Bad — meaningless names
let x = y + z;
function calc(itm) {
  let t = 0;
  for (let i = 0; i < itm.length; i++) {
    t += itm[i].p;
  }
  return t;
}

// Good — self-documenting names
let totalPrice = productPrice + shippingCost;
function calculateTotalPrice(cartItems) {
  let totalPrice = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalPrice += cartItems[i].price;
  }
  return totalPrice;
}
```

### 2. Use AI Tools as Reviewers, Not Authors

AI tools can suggest improvements but must not replace developer judgment.

- Always ask: "Does this suggestion follow our architecture rules?"
- Never blindly accept AI-generated code — verify it against the README
- AI suggestions that violate engineering standards must be rejected

### 3. Remove Unnecessary Comments

Write comments only to explain **why**, not what.

```js
// Bad — the code already says this
// Adding 10 to the result
total = total + 10;

// Good — explains a non-obvious business rule
// Adding 10 because the client requires a 10% calculation buffer
total = total + 10;
```

### 4. Follow the DRY Principle

Never repeat the same logic in more than one place.

```js
// Bad — duplicated logic
if (user.age > 18 && user.age < 65) {
  /* ... */
}
if (user.age > 18 && user.age < 65) {
  /* ... */
}

// Good — extracted once, used everywhere
function isWorkingAge(age) {
  return age > 18 && age < 65;
}
if (isWorkingAge(user.age)) {
  /* ... */
}
```

In React: shared logic belongs in `src/hooks/`. Shared calculations belong in `src/utils/`.

### 5. Consistent Code Formatting and Style

All code follows a single consistent style enforced by ESLint (Airbnb) and Prettier.

```js
// Bad — inconsistent conventions
let total_price; // snake_case
let UserData; // PascalCase
function getuser() {}

// Good — consistent camelCase
let totalPrice;
let userData;
function getUser() {}
```

Run `npm run lint` before every commit — zero errors allowed.

### 6. Functions Must Have a Single Responsibility

Every function does exactly one thing.

```js
// Bad — one function doing too much
function calculateCart(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total > 100 ? total * 0.9 : total;
}

// Good — split into focused, reusable functions
function calculateCart(items) {
  const total = getCartTotal(items);
  return applyDiscount(total);
}
function getCartTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
function applyDiscount(total) {
  return total > 100 ? total * 0.9 : total;
}
```

### 7. Organize Files and Folders Properly

Organize by feature, not by file type alone. The folder structure in `README.md` Section 3 is the single source of truth.

```
// Bad — flat, unstructured
project/
├── app.js
├── helpers.js
├── user.js
└── product.js

// Good — feature-based
src/
├── components/
│   ├── home/
│   ├── about/
│   └── layout/
├── pages/
├── hooks/
├── utils/
├── store/slices/
└── services/
```

---

## Performance Optimization

### Code Splitting

```jsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </Suspense>
  );
}
```

### Memoization

```jsx
import { memo, useMemo, useCallback } from 'react';

// Memoize component
const ExpensiveComponent = memo(({ data }) => {
  return <div>{data}</div>;
});

// Memoize computed values
function MyComponent({ items }) {
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);

  return <div>Total: {total}</div>;
}

// Memoize callbacks
function Parent() {
  const handleClick = useCallback(() => {
  
  }, []);

  return <Child onClick={handleClick} />;
}
```

### Image Optimization

```jsx
// Lazy loading images
<img
  src="image.jpg"
  alt="Description"
  loading="lazy"
  width="800"
  height="600"
/>

// Responsive images
<picture>
  <source media="(min-width: 1200px)" srcSet="large.jpg" />
  <source media="(min-width: 768px)" srcSet="medium.jpg" />
  <img src="small.jpg" alt="Responsive image" />
</picture>
```

### Bundle Size Optimization

```bash
# Analyze bundle size
npm run build:analyze

# Identify large dependencies
npx webpack-bundle-analyzer dist/stats.json
```

### Performance Checklist

- [ ] Code splitting implemented
- [ ] Lazy loading for routes
- [ ] Images optimized and lazy loaded
- [ ] `React.memo` for expensive components
- [ ] `useMemo` / `useCallback` where appropriate
- [ ] Virtualization for long lists (react-window)
- [ ] Service Worker for caching (optional)
- [ ] CDN for static assets
- [ ] Compression enabled (gzip/brotli)

---

## Accessibility (WCAG AA)

### Semantic HTML

```jsx
// ✅ GOOD: Semantic elements
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Page Title</h1>
    <p>Content...</p>
  </article>
</main>

<footer>
  <p>&copy; 2026 Company</p>
</footer>

// ❌ BAD: Div soup
<div className="header">
  <div className="nav">
    <div className="link">Home</div>
  </div>
</div>
```

### ARIA Attributes

```jsx
// Button with label
<button aria-label="Close dialog" onClick={closeDialog}>
  <X className="h-4 w-4" />
</button>

// Loading state
<button disabled aria-busy="true">
  Loading...
</button>

// Expandable section
<button
  aria-expanded={isOpen}
  aria-controls="section-content"
  onClick={toggle}
>
  Toggle Section
</button>
<div id="section-content" hidden={!isOpen}>
  Content
</div>
```

### Keyboard Navigation

```jsx
function Dialog({ isOpen, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Focus trap
      closeButtonRef.current?.focus();

      // Escape key handler
      const handleEscape = (e) => {
        if (e.key === 'Escape') onClose();
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div role='dialog' aria-modal='true'>
      <button ref={closeButtonRef} onClick={onClose}>
        Close
      </button>
      {/* Dialog content */}
    </div>
  );
}
```

### Form Accessibility

```jsx
<form>
  <label htmlFor='email'>Email Address</label>
  <input
    id='email'
    type='email'
    aria-required='true'
    aria-invalid={hasError}
    aria-describedby='email-error'
  />
  {hasError && (
    <p id='email-error' role='alert'>
      Please enter a valid email
    </p>
  )}
</form>
```

### Accessibility Checklist

- [ ] Semantic HTML structure
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Alt text for images
- [ ] Keyboard navigable (Tab, Enter, Escape)
- [ ] Focus indicators visible
- [ ] Color contrast ratio ≥ 4.5:1
- [ ] ARIA labels where needed
- [ ] Form labels and error messages
- [ ] Skip navigation links
- [ ] Screen reader tested

---

## Testing Strategy

### Unit Testing (Jest + React Testing Library)

```jsx
// Component test
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  test('renders email and password inputs', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('submits form with user credentials', async () => {
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);

    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
```

### Hook Testing

```javascript
import { renderHook, waitFor } from '@testing-library/react';
import { useApi } from './useApi';

describe('useApi', () => {
  test('handles successful API call', async () => {
    const mockFetch = jest.fn().mockResolvedValue({ data: 'success' });
    const { result } = renderHook(() => useApi(mockFetch));

    result.current.execute();

    await waitFor(() => {
      expect(result.current.data).toBe('success');
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });
});
```

### Integration Testing

```jsx
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../store/store';
import App from '../App';

function renderWithProviders(component) {
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>,
  );
}

test('full app rendering', () => {
  renderWithProviders(<App />);
  expect(screen.getByText(/home/i)).toBeInTheDocument();
});
```

### Testing Best Practices

1. **Test Behavior, Not Implementation**: Focus on what users see
2. **Accessible Queries**: Use `getByRole`, `getByLabelText`
3. **Avoid Testing Details**: Don't test CSS classes or state directly
4. **Mock External Dependencies**: API calls, third-party libraries
5. **Test Edge Cases**: Error states, empty data, loading states

---

## Best Practices

### React Best Practices

1. **Functional Components**: Use functions over classes
2. **Hooks**: Leverage built-in and custom hooks
3. **Keys in Lists**: Stable, unique keys for list items
4. **Avoid Inline Functions**: Extract to useCallback when needed
5. **PropTypes/TypeScript**: Validate component props

### Performance Best Practices

1. **Lazy Load Routes**: Split code by route
2. **Optimize Re-renders**: React.memo, useMemo, useCallback
3. **Virtual Scrolling**: For long lists (react-window)
4. **Image Optimization**: WebP format, lazy loading
5. **Bundle Analysis**: Regularly check bundle size

### Security Best Practices

1. **Sanitize User Input**: Prevent XSS attacks
2. **HTTPS Only**: Production must use HTTPS
3. **Content Security Policy**: Set CSP headers
4. **HTTP-Only Cookies**: Store tokens securely
5. **Dependency Audits**: Run `npm audit` regularly

### SEO Best Practices

1. **Metadata Per Page**: Unique title/description
2. **Semantic HTML**: Proper heading structure
3. **Structured Data**: JSON-LD for rich results
4. **Alt Text**: Descriptive image alt attributes
5. **Sitemap**: Generate and submit to search engines

### Git Best Practices

1. **Commit Messages**: Clear, descriptive messages
2. **Branch Strategy**: feature/, bugfix/, hotfix/
3. **Pull Requests**: Code review before merge
4. **.gitignore**: Exclude node_modules, dist, .env
5. **Semantic Versioning**: Major.Minor.Patch

---

## Internationalization (i18n) - Future Enhancement

### Setup with react-i18next

```bash
npm install react-i18next i18next
```

### Configuration

```javascript
// src/i18n/config.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import fr from './locales/fr.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
```

### Translation Files

```json
// src/i18n/locales/en.json
{
  "welcome": "Welcome",
  "home": "Home",
  "about": "About",
  "contact": "Contact"
}

// src/i18n/locales/fr.json
{
  "welcome": "Bienvenue",
  "home": "Accueil",
  "about": "À propos",
  "contact": "Contact"
}
```

### Usage

```jsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('fr')}>Français</button>
    </div>
  );
}
```

---

## CI/CD Pipeline - Future Enhancement

### GitHub Actions Example

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm test

      - name: Build project
        run: npm run build

      - name: Deploy to production
        if: github.ref == 'refs/heads/main'
        run: npm run deploy
        env:
          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
```

---

## Conclusion

This frontend architecture represents **production-grade engineering standards** with:

- ✅ **Scalable Architecture**: Feature-based organization
- ✅ **Performance Optimized**: Core Web Vitals monitoring
- ✅ **SEO Ready**: Comprehensive metadata and structured data
- ✅ **Accessible**: WCAG AA compliance
- ✅ **Maintainable**: Clean code, SOLID principles
- ✅ **Secure**: Industry-standard authentication
- ✅ **Testable**: Structured for unit and integration testing
- ✅ **Production Ready**: Optimized builds and deployment

### Next Steps for Developers

1. **Clone and Install**: `npm install`
2. **Configure Environment**: Set up `.env` file
3. **Start Development**: `npm run dev`
4. **Read Documentation**: Familiarize with architecture
5. **Start Building**: Add features following established patterns

### Contributing

When contributing to this project:

1. Follow established patterns and conventions
2. Write tests for new features
3. Update documentation as needed
4. Ensure accessibility compliance
5. Run performance checks before PR

---

## Support & Resources

### Documentation

- React: https://react.dev
- Redux Toolkit: https://redux-toolkit.js.org
- React Router: https://reactrouter.com
- Tailwind CSS: https://tailwindcss.com
- Axios: https://axios-http.com

### Performance Tools

- Lighthouse: https://developers.google.com/web/tools/lighthouse
- Web Vitals: https://web.dev/vitals
- Webpack Bundle Analyzer: https://www.npmjs.com/package/webpack-bundle-analyzer

### Accessibility

- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref
- ARIA Practices: https://www.w3.org/WAI/ARIA/apg

---

**Built with ♥ by Principal Frontend Architect**  
**Last Updated:** February 15, 2026  
**Version:** 1.0.0
