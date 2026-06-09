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

import { PERFORMANCE_BUDGETS } from '../config';

export const performanceBudget = PERFORMANCE_BUDGETS;

export const checkPerformanceBudget = () => {
  const metrics = {};

  const checkBudget = () => {
    Object.entries(performanceBudget).forEach(([metric, budget]) => {
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
