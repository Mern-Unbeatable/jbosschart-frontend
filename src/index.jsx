import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './i18n/config'; // Initialize i18next
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

if (process.env.NODE_ENV !== 'production') {
  reportWebVitals();
  detectLongTasks();
  checkPerformanceBudget();
}
