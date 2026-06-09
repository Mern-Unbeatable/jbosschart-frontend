import React, { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  loginSuccess,
  logoutUser,
  selectUser,
  selectIsAuthenticated,
} from '../store/slices/authSlice';

const DEMO_USER = {
  user: { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  token: 'jwt-token-here-12345',
};

const LoginExample = memo(() => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleLogin = useCallback(
    () => dispatch(loginSuccess(DEMO_USER)),
    [dispatch],
  );
  const handleLogout = useCallback(() => dispatch(logoutUser()), [dispatch]);

  return (
    <div className='p-6 max-w-md mx-auto bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-4'>Redux Auth Example</h2>

      {isAuthenticated ? (
        <div>
          <div className='mb-4 p-4 bg-green-50 rounded'>
            <p className='text-green-800 font-semibold'>Logged In</p>
            <p className='mt-2'>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>Role: {user?.role}</p>
          </div>

          <button
            type='button'
            onClick={handleLogout}
            className='w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <p className='mb-4 text-gray-600'>You are not logged in</p>
          <button
            type='button'
            onClick={handleLogin}
            className='w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
});

LoginExample.displayName = 'LoginExample';

export default LoginExample;
