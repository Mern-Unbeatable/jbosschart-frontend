# Production-Grade React Application

> **For every developer and AI assistant working on this project:** Read this file completely before writing, reviewing, or modifying any code. All rules below are non-negotiable engineering standards.

**Architecture Level:** Principal Frontend Architect (10+ years experience)
**Version:** 1.0.0 | **Last Updated:** March 2026
**Also read:** [frontend-architecture.md](./frontend-architecture.md) | [REDUX_GUIDE.md](./REDUX_GUIDE.md)

---

## Mission

Act as a **Principal Frontend Architect** (10+ years experience). Deliver production-grade, scalable, secure, and high-performance frontend applications. Generate only clean, structured, maintainable, and professional code. All engineering standards defined in this document are non-negotiable.

> **Before providing any code:** list potential mistakes and confirm which rules from this document apply.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Project Structure](#3-project-structure)
4. [Quick Start](#4-quick-start)
5. [Engineering Rules — Non-Negotiable](#5-engineering-rules--non-negotiable)
6. [Code Quality Standards](#6-code-quality-standards)
   - [6.1 Clean Code Principles](#61-clean-code-principles-applied-to-this-project) (6 principles — folder structure covered in Section 3)
7. [UI/UX Standards](#7-uiux-standards)
8. [Performance Requirements](#8-performance-requirements)
9. [Accessibility Standards](#9-accessibility-standards)
10. [SEO Architecture](#10-seo-architecture)
11. [Internationalization (i18n)](#11-internationalization-i18n)
12. [State Management](#12-state-management)
13. [API Integration](#13-api-integration)
14. [Error Handling](#14-error-handling)
15. [Testing Strategy](#15-testing-strategy)
16. [Performance Monitoring](#16-performance-monitoring)
17. [Routing Architecture](#17-routing-architecture)
18. [Folder Conventions & Naming](#18-folder-conventions--naming)
19. [Environment & Configuration](#19-environment--configuration)
20. [Build & Deployment](#20-build--deployment)
21. [Known Issues & Gaps (Must Fix)](#21-known-issues--gaps-must-fix)

---

## 1. Project Overview

This is an **enterprise-grade, production-ready React frontend application** built as a scalable boilerplate. It is designed to serve as the foundation for high-performance web products with strong SEO, full accessibility, multi-language support, and clean architecture.

### Core Objectives

- Lighthouse score > 95 on both mobile and desktop
- WCAG AA accessibility compliance
- Multi-language support (English + French)
- Scalable, modular, feature-based architecture
- Zero unnecessary complexity
- CI/CD-ready production builds

---

## 2. Technology Stack

> **Rule:** Use only LTS and stable package versions. Never introduce unstable, deprecated, or bug-prone dependencies without explicit discussion.

### Runtime Dependencies

| Package            | Version  | Purpose                                 |
| ------------------ | -------- | --------------------------------------- |
| `react`            | ^18.2.0  | UI framework with concurrent features   |
| `react-dom`        | ^18.2.0  | DOM renderer                            |
| `react-router-dom` | ^7.13.0  | Declarative, type-safe routing          |
| `@reduxjs/toolkit` | ^2.11.2  | Predictable global state management     |
| `react-redux`      | ^9.2.0   | React bindings for Redux                |
| `axios`            | ^1.13.4  | HTTP client with interceptor support    |
| `js-cookie`        | ^3.0.5   | Secure cookie management                |
| `lucide-react`     | ^0.563.0 | Icon library (no emoji allowed)         |
| `react-hot-toast`  | ^2.6.0   | Toast notifications (no browser alerts) |
| `web-vitals`       | ^5.1.0   | Core Web Vitals monitoring              |
| `react-i18next`    | ^14.x    | Internationalization framework          |
| `i18next`          | ^23.x    | i18n core engine                        |

### Dev Dependencies

| Package                                | Purpose                            |
| -------------------------------------- | ---------------------------------- |
| `webpack` ^5                           | Advanced bundler with tree-shaking |
| `babel-loader`                         | JSX/ES2022+ transpilation          |
| `tailwindcss` / `@tailwindcss/postcss` | Utility-first CSS                  |
| `postcss`                              | CSS transformation pipeline        |
| `jest`                                 | Unit test runner                   |
| `@testing-library/react`               | Component integration testing      |
| `@testing-library/jest-dom`            | DOM assertion matchers             |
| `eslint` + `eslint-config-airbnb`      | Code linting (Airbnb standard)     |
| `prettier`                             | Automated code formatting          |

### Prohibited Dependencies

- **No deprecated packages** (e.g., `react-scripts`, `enzyme`, `moment.js`)
- **No unstable alpha/beta versions**
- **No packages with known security vulnerabilities**
- **Do not add lodash** — use native ES2022+ methods

---

## 3. Project Structure

```
Project/
├── public/
│   └── index.html                    # HTML entry — meta tags, preload hints
│
├── src/
│   ├── index.jsx                     # App bootstrap, web-vitals init
│   ├── index.css                     # Global styles (Tailwind @layer)
│   ├── App.jsx                       # Root: Provider > ErrorBoundary > Router
│   │
│   ├── components/                   # Reusable UI components
│   │   ├── ErrorBoundary.jsx         # Global error handler with fallback UI
│   │   ├── Layout.jsx                # Main layout wrapper (nav + outlet)
│   │   ├── ThemeToggle.jsx           # Dark/light theme switcher
│   │   ├── CartExample.jsx           # Cart demo (Redux integration)
│   │   ├── LoginExample.jsx          # Auth demo (Redux integration)
│   │   │
│   │   ├── home/                     # Home page feature components
│   │   │   └── HomeContent.jsx
│   │   ├── about/                    # About page feature components
│   │   │   └── AboutContent.jsx
│   │   ├── contact/                  # Contact page feature components
│   │   │   └── ContactContent.jsx
│   │   ├── services/                 # Services page feature components
│   │   │   └── ServicesContent.jsx
│   │   │
│   │   └── layout/                   # Role-based layout shells
│   │       ├── admin/                # Admin dashboard layout
│   │       ├── auth/                 # Unauthenticated layout
│   │       └── user/                 # Authenticated user layout
│   │
│   ├── pages/                        # Route-level page components (thin wrappers)
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Services.jsx
│   │   └── ReduxDemo.jsx
│   │
│   ├── router/
│   │   └── router.jsx                # Centralized route definitions
│   │
│   ├── store/                        # Redux state management
│   │   ├── store.js                  # Configured Redux store
│   │   └── slices/
│   │       ├── authSlice.js          # Auth state (login/logout/user)
│   │       ├── themeSlice.js         # Theme state (dark/light)
│   │       └── cartSlice.js          # Cart state (items/total)
│   │
│   ├── services/                     # API integration layer
│   │   ├── axiosInstance.js          # Axios with interceptors + auth headers
│   │   ├── httpEndpoint.js           # Centralized API endpoint constants
│   │   └── httpMethods.js            # Abstracted HTTP CRUD methods
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useApi.js                 # Data fetching with loading/error state
│   │   └── useSEO.js                 # Dynamic meta tag management
│   │
│   ├── i18n/
│   │   └── locales/
│   │       ├── en.json               # English translations
│   │       └── fr.json               # French translations
│   │
│   ├── utils/                        # Pure utility functions
│   │   ├── auth.js                   # Token/cookie auth helpers
│   │   ├── seo.js                    # Structured data + meta generators
│   │   └── web-vitals.js             # RUM + performance monitoring
│   │
│   └── config/
│       └── index.js                  # Env-based app config (API URLs, routes)
│

├── package.json
├── webpack.config.js                 # Webpack 5 with content-hashing + splits
├── postcss.config.js                 # Tailwind CSS pipeline
├── .env.example                      # Environment variable template
├── .eslintrc.js                      # Airbnb ESLint rules
├── .prettierrc                       # Prettier formatting rules
├── README.md                         # This file — read before contributing
├── REDUX_GUIDE.md                    # Redux patterns reference
└── frontend-architecture.md         # Deep architecture documentation
```

### Why Feature-Based? Anti-Pattern vs. This Project

Organizing by feature — not by file type alone — keeps the project navigable as it grows. Never dump unrelated files into a flat folder.

```
// ❌ Flat, unstructured — impossible to navigate at scale
project/
├── app.js
├── helpers.js
├── data.js
├── user.js
└── product.js

// ✅ Feature-based — what this project uses
src/
├── components/
│   ├── home/         # Home feature components
│   ├── about/        # About feature components
│   └── layout/       # Layout-specific components
├── pages/            # Route-level wrappers
├── hooks/            # Shared custom hooks
├── utils/            # Pure utility functions
├── store/slices/     # Feature-based Redux slices
└── services/         # API layer
```

**Rules:**

- Do not place new files in the wrong folder
- Do not create top-level files outside the structure above without discussion
- If you need something for the contact page, it belongs in `components/contact/` — not at the root of `components/`
- Break large files into smaller, single-purpose modules based on functionality

---

## 4. Quick Start

### Prerequisites

```
Node.js >= 18.x LTS
npm >= 9.x
```

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env

# 3. Start development server (auto-selects a free port)
npm start

# 4. Run tests
npm test

# 5. Production build (output: /dist)
npm run build
```

### Environment Variables

```env
# .env.example
NODE_ENV=development
REACT_APP_API_URL=https://api.example.com
REACT_APP_ANALYTICS_ID=your_ga_id
REACT_APP_DEFAULT_LOCALE=en
```

---

## 5. Engineering Rules — Non-Negotiable

> These rules apply to every file, every component, and every pull request. No exceptions.

### Absolute Constraints

- **No Bangla or non-English text** in any code file, variable name, comment, or string
- **No emoji** in UI — use Lucide React icons exclusively
- **No `alert()`, `confirm()`, or `prompt()`** — use `react-hot-toast` for all notifications
- **No validation errors shown as toasts** — show inline form errors; reserve toasts for system events
- **No placeholder logic** — every function must be fully implemented
- **No duplicate logic** — extract shared logic into hooks or utils
- **No magic numbers** — all constants must be named and extracted
- **No inline styles** — use Tailwind utility classes exclusively
- **No TypeScript migration without discussion** — stay in JavaScript until agreed
- **No new dependencies** without team review

### SOLID Principles

```jsx
// Single Responsibility — one component, one job
// ❌ Bad: fetching + validation + rendering in one component
// ✅ Good: useApi() for data, pure component for rendering

// Open/Closed — extend behavior without modifying core
// ❌ Bad: if/else chains inside a component for variants
// ✅ Good: variant map object + composition

// DRY — extract once, reuse everywhere
// ❌ Bad: same fetch pattern in 3 components
// ✅ Good: useApi(endpoint) hook used in all three
```

### Core React Engineering

- Modular, feature-based component architecture — one component, one responsibility
- Reusable, decoupled components with clean prop interfaces
- Proper hooks usage: `useState` (local UI only), `useEffect` (with cleanup), `useMemo`, `useCallback`, `memo`
- Context API only to avoid prop drilling — never for high-frequency state updates
- Efficient DOM management — avoid unnecessary mounts, use keys correctly
- Smart caching strategy — `useApi` hook handles loading/error/data lifecycle
- Clean and type-safe routing — all paths defined as named constants in `config/index.js`
- Scalable folder structure — feature-based, never flat

### Constraints & Deliverables

- Provide only the requested code files — no extra files or folders unless explicitly asked
- Production-ready implementation only — no placeholder logic, no TODO stubs
- No duplicated features or logic
- No missing implementation points — every function must be fully implemented
- No Bangla or non-English text anywhere in code, comments, or strings

---

## 6. Code Quality Standards

### Naming Conventions

| Type           | Convention                  | Example                         |
| -------------- | --------------------------- | ------------------------------- |
| Components     | PascalCase                  | `UserProfileCard.jsx`           |
| Hooks          | camelCase with `use` prefix | `useAuthStatus.js`              |
| Utilities      | camelCase                   | `formatCurrency.js`             |
| Redux slices   | camelCase + `Slice` suffix  | `authSlice.js`                  |
| Constants      | SCREAMING_SNAKE_CASE        | `API_BASE_URL`                  |
| CSS classes    | Tailwind utilities only     | `className="flex items-center"` |
| Event handlers | `handle` prefix             | `handleSubmit`, `handleClick`   |

### Component Structure (Standard Order)

```jsx
import React, { useState, useEffect, useCallback, memo } from 'react';
// 1. Third-party imports
// 2. Internal imports (hooks, utils, components)
// 3. Constants
// 4. Component definition
// 5. PropTypes or JSDoc (if applicable)
// 6. Default export
```

### Hooks Usage Rules

- `useState` — local UI state only (not data that belongs in Redux)
- `useEffect` — side effects with proper cleanup; always declare dependencies
- `useMemo` — memoize expensive computations only (do not over-use)
- `useCallback` — stabilize callbacks passed to memoized children only
- `memo` — wrap pure presentational components that receive stable props
- **No raw `useEffect` for data fetching** — use the `useApi` hook

### Comments Policy

```jsx
// ✅ Explain WHY, not WHAT
// Using requestAnimationFrame to avoid layout thrashing during transition
requestAnimationFrame(() => setVisible(true));

// ❌ Never explain what the code obviously does
// Set visible to true
setVisible(true);
```

---

## 6.1 Clean Code Principles (Applied to This Project)

> These seven principles define how every developer — and every AI tool — must approach writing code in this codebase. They apply to all files, all components, and all pull requests.

### Principle 1: Write Code as if Explaining it to Someone Unfamiliar

Variable names, function names, and file names must be self-documenting. Anyone opening a file for the first time should understand what it does without reading comments.

```js
// ❌ Meaningless names
let x = y + z;
function calc(itm) {
  let t = 0;
  for (let i = 0; i < itm.length; i++) {
    t += itm[i].p;
  }
  return t;
}

// ✅ Self-documenting names
let totalPrice = productPrice + shippingCost;
function calculateTotalPrice(cartItems) {
  let totalPrice = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalPrice += cartItems[i].price;
  }
  return totalPrice;
}
```

### Principle 2: Use AI Tools as Reviewers, Not Authors

AI tools (GitHub Copilot, ChatGPT, Claude) can assist with code review, spotting issues, and suggesting improvements — but they must not replace developer judgment. Every AI suggestion must be evaluated before being accepted.

**In this project:**

- Use GitHub Copilot to catch patterns and suggest completions
- Always ask: "Does this suggestion follow our architecture rules?"
- Never blindly accept AI-generated code — verify it against this README
- AI suggestions that violate Section 5 rules must be rejected

### Principle 3: Remove Unnecessary Comments

Write comments only when they explain **why** something is done — not what it does. Good code is readable without narration.

```js
// ❌ Useless — the code already says this
// Adding 10 to the result
total = total + 10;

// ✅ Useful — explains a business rule that isn't obvious
// Adding 10 because the client requires a 10% calculation buffer
total = total + 10;
```

Avoid commenting every line. If every line needs a comment, the naming is wrong.

### Principle 4: Follow the DRY Principle

Never repeat the same logic in more than one place. If a condition, calculation, or operation appears more than once, extract it into a named function or hook.

```js
// ❌ Same logic duplicated in multiple places
if (user.age > 18 && user.age < 65) {
  /* ... */
}
if (user.age > 18 && user.age < 65) {
  /* ... */
}

// ✅ Extracted once, used everywhere
function isWorkingAge(age) {
  return age > 18 && age < 65;
}
if (isWorkingAge(user.age)) {
  /* ... */
}
```

In React: shared logic belongs in a custom hook under `src/hooks/`. Shared calculations belong in `src/utils/`.

### Principle 5: Consistent Code Formatting and Style

All code in this project follows a single, consistent style enforced by ESLint (Airbnb config) and Prettier. There are no exceptions.

```js
// ❌ Inconsistent naming conventions in the same codebase
let total_price; // snake_case
let UserData; // PascalCase
function getuser() {} // no convention

// ✅ Consistent camelCase throughout (JavaScript standard)
let totalPrice;
let userData;
function getUser() {}
```

**Rules for this project:**

- Variables and functions: `camelCase`
- Components and classes: `PascalCase`
- Constants: `SCREAMING_SNAKE_CASE`
- Files: PascalCase for components, camelCase for everything else
- Run `npm run lint` before every commit — zero errors allowed

### Principle 6: Functions Must Have a Single Responsibility

Every function does exactly one thing. If a function is doing more than one job, split it. Long functions are a signal that refactoring is required.

```js
// ❌ One function doing too much — calculating total AND applying discount
function calculateCart(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total > 100 ? total * 0.9 : total;
}

// ✅ Split into focused, reusable functions
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

In React components: if a component renders more than one distinct section of UI, break it into sub-components. If it does more than one data operation, split into separate hooks.

> **File and folder organization rules are defined in [Section 3: Project Structure](#3-project-structure).** That section is the single source of truth for where files belong.

---

## 7. UI/UX Standards

### Typography (Production Text Sizing)

| Element          | Tailwind Class          | Size    |
| ---------------- | ----------------------- | ------- |
| Paragraph / Body | `text-base`             | 16px    |
| Small / Caption  | `text-sm`               | 14px    |
| H1               | `text-4xl` / `text-5xl` | 36–48px |
| H2               | `text-3xl`              | 30px    |
| H3               | `text-2xl`              | 24px    |
| H4               | `text-xl`               | 20px    |
| Button labels    | `text-sm` / `text-base` | 14–16px |

Responsive modifiers required: `sm:` `md:` `lg:` for all text that changes size across breakpoints.

### Responsive Breakpoints

```
Mobile:  < 640px   (default, no prefix)
Tablet:  640–1023px (sm: / md:)
Desktop: 1024px+   (lg: / xl:)
```

**Every component must be tested at all three breakpoints.** Use `flex`, `grid`, and responsive `gap` utilities. Never use fixed pixel widths on layout containers.

### Design System Rules

- **No AI-generated visual patterns** — designs must look intentional and human-crafted
- Color palette defined in Tailwind config — do not use arbitrary hex values
- Consistent spacing scale: `space-x-4`, `gap-6`, `p-4`, `py-8` etc.
- Transitions: `transition-all duration-200 ease-in-out` for interactive elements
- Focus states: always visible — `focus:outline-none focus:ring-2 focus:ring-primary`
- Dark mode support via Tailwind `dark:` variant (state managed in Redux `themeSlice`)

### Toast Notifications (react-hot-toast)

```jsx
// ✅ Correct usage
toast.success('Profile updated successfully');
toast.error('Failed to save changes. Please try again.');

// ❌ Never use for form field validation
// ❌ Never use alert()
```

---

## 8. Performance Requirements

### Lighthouse Targets

| Metric         | Minimum Target |
| -------------- | -------------- |
| Performance    | 95+            |
| Accessibility  | 95+            |
| Best Practices | 95+            |
| SEO            | 95+            |
| LCP            | < 2.5s         |
| FCP            | < 1.8s         |
| CLS            | < 0.1          |
| TBT            | < 200ms        |
| Speed Index    | < 3.4s         |

### Optimization Rules

- **Code-split all page components** using `React.lazy()` + `Suspense`
- **Lazy load** images with `loading="lazy"` attribute
- **Preload** critical fonts and above-the-fold resources in `index.html`
- **Memoize** selectors — use `useSelector` with `shallowEqual` or memoized selectors
- **Avoid anonymous functions** in JSX render — extract or use `useCallback`
- **Bundle size** — no single JS chunk > 200kb (gzipped)
- **No synchronous operations** in the render path
- Webpack `splitChunks` must separate vendor, app, and shared bundles

```jsx
// ✅ Code splitting — all page components
const Home = React.lazy(() => import('../pages/Home'));
const About = React.lazy(() => import('../pages/About'));
```

---

## 9. Accessibility Standards

> Target: WCAG 2.1 Level AA

### Rules

- Use semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Every image must have a meaningful `alt` attribute (or `alt=""` for decorative images)
- All interactive elements must be keyboard-accessible (Tab, Enter, Space, Escape)
- ARIA attributes only when native HTML semantics are insufficient
- Minimum color contrast ratio: **4.5:1** for normal text, **3:1** for large text
- Forms: every `<input>` must have an associated `<label>`
- Focus management: modals and dialogs must trap focus correctly
- Use `role`, `aria-label`, `aria-describedby` for complex UI widgets

```jsx
// ✅ Accessible button
<button
  type='button'
  aria-label='Close navigation menu'
  onClick={handleClose}
  className='focus:outline-none focus:ring-2 focus:ring-primary'
>
  <X size={20} aria-hidden='true' />
</button>
```

---

## 10. SEO Architecture

### Metadata Requirements

Every page must set:

```jsx
// Via useSEO() hook
useSEO({
  title: 'Page Title | Brand Name',
  description: 'Concise 150–160 char description with primary keyword',
  keywords: 'keyword1, keyword2',
  canonical: 'https://example.com/page',
  ogImage: 'https://example.com/og-image.jpg',
  locale: 'en_US',
});
```

### Structured Data (JSON-LD)

Generated via `src/utils/seo.js` — inject `<script type="application/ld+json">` for:

- `WebSite` schema on home page
- `BreadcrumbList` on inner pages
- `Organization` schema in site-wide head
- `Article` / `Service` schema on content pages

### Open Graph + Twitter Cards

```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />
<meta property="og:url" content="..." />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />
```

### SEO Rules

- URLs must be lowercase, hyphenated, human-readable
- Every page must have a unique `<title>` and `<meta name="description">`
- No orphan pages — every page linked from at least one other location
- Headings follow strict hierarchy: one `H1` per page, logical `H2 > H3` nesting

---

## 11. Internationalization (i18n)

### Setup

Uses `react-i18next` + `i18next`.

```
src/i18n/
└── locales/
    ├── en.json    # English (default)
    └── fr.json    # French
```

### Rules

- **Every user-facing string** must be externalized into translation files
- **No hardcoded English text** in JSX — use the `useTranslation` hook
- Translation keys use dot-notation: `"nav.home"`, `"hero.title"`, `"form.email.label"`
- Both `en.json` and `fr.json` must be in sync — no missing keys in either file
- SEO metadata must also be localized (page title, description, OG tags)

```jsx
import { useTranslation } from 'react-i18next';

function HeroSection() {
  const { t } = useTranslation();
  return <h1 className='text-4xl font-bold'>{t('hero.title')}</h1>;
}
```

---

## 12. State Management

### Redux Toolkit Structure

```
store/
├── store.js           # configureStore() — single source of truth
└── slices/
    ├── authSlice.js   # isAuthenticated, user, token
    ├── themeSlice.js  # mode: 'light' | 'dark'
    └── cartSlice.js   # items[], totalCount, totalPrice
```

### When to Use Redux vs Local State

| Scenario                              | Solution                    |
| ------------------------------------- | --------------------------- |
| Auth state (used across all pages)    | Redux `authSlice`           |
| Dark/light theme                      | Redux `themeSlice`          |
| Cart items (persisted across routes)  | Redux `cartSlice`           |
| Form input state                      | `useState` (local)          |
| Loading/error state for one component | `useState` or `useApi` hook |
| Server data cache                     | `useApi` hook (SWR-style)   |

### Rules

- **No direct state mutation** — Redux Toolkit uses Immer internally
- **Selectors** must be defined in the slice file, not inline in components
- **Async operations** use `createAsyncThunk`
- **No business logic** in components — dispatch actions, handle in slice reducers

---

## 13. API Integration

### Axios Instance (`src/services/axiosInstance.js`)

- Base URL from environment config
- Request interceptor: attaches auth token from cookie
- Response interceptor: handles 401 (auto-logout), 500 (error toast)
- Timeout: 30 seconds default
- No credentials stored in localStorage — use `js-cookie` with `Secure` + `SameSite=Strict`

### HTTP Methods (`src/services/httpMethods.js`)

```js
// All API calls go through these abstractions — never call axios directly in components
export const get = (endpoint, params) =>
  axiosInstance.get(endpoint, { params });
export const post = (endpoint, data) => axiosInstance.post(endpoint, data);
export const put = (endpoint, data) => axiosInstance.put(endpoint, data);
export const del = (endpoint) => axiosInstance.delete(endpoint);
```

### Security Rules

- **Never store JWT tokens in localStorage** — XSS vulnerable
- Cookies must use: `Secure`, `HttpOnly` (server-set), `SameSite=Strict`
- All API responses validated before use
- No API keys in frontend code — use environment variables only
- Input sanitization at form validation layer

---

## 14. Error Handling

### Error Boundary

`src/components/ErrorBoundary.jsx` wraps the entire application. All route-level errors are caught and display a graceful fallback UI — never a blank screen or unhandled exception.

### Rules

- Every `async/await` block must have `try/catch`
- API errors display user-friendly messages via `react-hot-toast`
- `console.error` is acceptable in dev; all errors must be silenced or reported in production
- Error states in `useApi` hook must always render a user-visible error component

---

## 15. Testing Strategy

### Test Locations

```
src/
├── components/__tests__/    # Component unit + integration tests
├── hooks/__tests__/         # Custom hook tests
└── utils/__tests__/         # Utility function unit tests
```

### Tooling

- **Jest** — test runner and assertion library
- **@testing-library/react** — component rendering and interaction
- **@testing-library/jest-dom** — DOM-specific matchers

### Test Coverage Requirements

| Layer                               | Minimum Coverage |
| ----------------------------------- | ---------------- |
| Utility functions (`utils/`)        | 90%              |
| Custom hooks (`hooks/`)             | 80%              |
| UI components                       | 70%              |
| Redux slices (reducers + selectors) | 90%              |

### Test Rules

- Test **behavior**, not implementation details
- Do not test private functions directly — test through public interface
- Mock external APIs — never make real HTTP calls in tests
- Each test file must clean up after itself (`afterEach` cleanup)

```bash
# Run all tests
npm test

# Run with coverage report
npm test -- --coverage
```

---

## 16. Performance Monitoring

`src/utils/web-vitals.js` initializes Real User Monitoring on app load.

### Tracked Metrics

| Metric | Definition                | Target  |
| ------ | ------------------------- | ------- |
| LCP    | Largest Contentful Paint  | < 2.5s  |
| FCP    | First Contentful Paint    | < 1.8s  |
| CLS    | Cumulative Layout Shift   | < 0.1   |
| INP    | Interaction to Next Paint | < 200ms |
| TTFB   | Time to First Byte        | < 800ms |

### Integration

- Metrics reported to Google Analytics (GA4) via `gtag`
- Slow page detection: pages exceeding budget trigger console warnings in dev
- All metric data logged and available in GA4 Event Reports

---

## 17. Routing Architecture

### Route Configuration (`src/router/router.jsx`)

```jsx
// Route structure — extend here only
<Route element={<Layout />}>
  <Route path='/' element={<Home />} />
  <Route path='/about' element={<About />} />
  <Route path='/services' element={<Services />} />
  <Route path='/contact' element={<Contact />} />
</Route>
```

### Route Constants (`src/config/index.js`)

All route paths are defined as constants — never hardcode `/about` strings in components.

```js
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  CONTACT: '/contact',
};
```

### Rules

- `historyApiFallback: true` in webpack dev server (already configured)
- Server must redirect all routes to `index.html` in production (SPA routing)
- Protected routes must check `isAuthenticated` from Redux before rendering
- All page components lazy-loaded for performance (code splitting)

---

## 18. Folder Conventions & Naming

| Rule                    | Detail                                                     |
| ----------------------- | ---------------------------------------------------------- |
| File naming             | PascalCase for components, camelCase for everything else   |
| One component per file  | No multiple exports of components from one file            |
| Feature grouping        | Related components live in `components/[feature]/`         |
| Page components         | Thin wrappers in `pages/` — delegate to feature components |
| No barrel files for now | Direct imports only — avoids circular dependency issues    |
| Test files              | Colocated in `__tests__/` sub-directory alongside source   |

---

## 19. Environment & Configuration

`src/config/index.js` is the single source of truth for all runtime configuration.

```js
// src/config/index.js
export const API_BASE_URL = process.env.REACT_APP_API_URL;
export const ANALYTICS_ID = process.env.REACT_APP_ANALYTICS_ID;
export const DEFAULT_LOCALE = process.env.REACT_APP_DEFAULT_LOCALE || 'en';
```

**Rules:**

- Never access `process.env` directly in components — always import from `config/index.js`
- All environment variables prefixed with `REACT_APP_`
- `.env` is gitignored — `.env.example` documents all required variables

---

## 20. Build & Deployment

### Webpack 5 Config Summary

| Feature                                     | Status                          |
| ------------------------------------------- | ------------------------------- |
| Content hashing (`bundle.[contenthash].js`) | Enabled                         |
| `clean: true` on output                     | Enabled                         |
| `historyApiFallback` for SPA                | Enabled                         |
| Hot Module Replacement (HMR)                | Enabled                         |
| Code splitting (`splitChunks`)              | Must be configured              |
| React.lazy() page splitting                 | Must be implemented             |
| CSS extraction (production)                 | Must use `MiniCssExtractPlugin` |

### Production Build

```bash
npm run build
# Output: /dist — ready for CDN or static hosting
```

### CI/CD Requirements

- All tests must pass before merge to `main`
- Build must succeed without warnings
- Lighthouse CI score check: Performance > 95
- ESLint must pass with zero errors

---

## 21. Known Issues & Gaps (Must Fix)

> These items exist in the project but are partially implemented or missing. Fix before any production deployment.

| Priority  | Issue                                                                 | Action Required                                  |
| --------- | --------------------------------------------------------------------- | ------------------------------------------------ |
| ~~FIXED~~ | ~~`REDUX_GUIDE.md` written in Bangla~~                                | ~~Resolved~~ — rewritten in English              |
| HIGH      | Missing `jest`, `@testing-library/react`, `@testing-library/jest-dom` | Add to `package.json` devDependencies            |
| HIGH      | No `test` script in `package.json`                                    | Add `"test": "jest --watchAll=false"`            |
| HIGH      | Missing `react-i18next` + `i18next`                                   | Add to dependencies; create i18n init file       |
| HIGH      | `src/i18n/locales/` empty — no `en.json` / `fr.json`                  | Create translation files for all strings         |
| MEDIUM    | No ESLint configuration (`.eslintrc.js`)                              | Add Airbnb config + React/hooks plugins          |
| MEDIUM    | No Prettier configuration (`.prettierrc`)                             | Add standard Prettier rules                      |
| MEDIUM    | No `.env.example` file                                                | Create with all required variables documented    |
| MEDIUM    | No CI/CD configuration                                                | Add `.github/workflows/ci.yml`                   |
| MEDIUM    | Page components not lazy-loaded                                       | Wrap all `pages/` imports in `React.lazy()`      |
| LOW       | `webpack.config.js` has no `splitChunks` config                       | Add vendor/app chunk splitting for production    |
| LOW       | `MiniCssExtractPlugin` not used                                       | Extract CSS to separate file in production build |

---

## Contributing

1. Read this README completely
2. Read [frontend-architecture.md](./frontend-architecture.md) for deep architectural patterns
3. Run `npm install` and `npm test` — all tests must pass before starting
4. Follow all rules in [Section 5](#5-engineering-rules--non-negotiable) without exception
5. No Bangla text, no emoji, no alerts, no inline styles
6. Every PR must include tests for new functionality

---

## Final Directive

Build scalable, responsive, optimized, secure, reusable, clean, production-level React applications with modern LTS packages, high performance, excellent UX, strong SEO, full accessibility, and zero unnecessary complexity.

**Before providing any code:** list potential mistakes and confirm the applicable rules from this document.

---

_This document is the authoritative reference for all development on this project. Keep it updated when architecture decisions change.