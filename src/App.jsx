import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/ErrorBoundary';
import router from './router/router';
import { TOAST_CONFIG } from './config';
import store from './features/store';
import GlobalCallHandler from './components/GlobalCallHandler';
import { IncomingCallNotification } from './components/IncomingCallNotification';
function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <RouterProvider router={router} />
        <GlobalCallHandler />
        <IncomingCallNotification />
        <Toaster
          position={TOAST_CONFIG.POSITION}
          toastOptions={{ duration: TOAST_CONFIG.DURATION }}
        />
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
