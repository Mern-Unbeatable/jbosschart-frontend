import React, { useState } from 'react';
import toast from 'react-hot-toast';

// ─── Constants ────────────────────────────────────────────────────────────────

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_FORM = {
  fullName: 'Admin User',
  email: 'admin@proconsult.com',
  password: '',
  newPassword: '',
};

// ─── Component ────────────────────────────────────────────────────────────────

const Profile = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const next = {};

    if (!form.fullName.trim()) {
      next.fullName = 'Full name is required';
    }

    if (!form.email.trim()) {
      next.email = 'Email address is required';
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      next.email = 'Enter a valid email address';
    }

    const wantsPasswordChange = form.password.trim() || form.newPassword.trim();

    if (wantsPasswordChange) {
      if (!form.password.trim()) {
        next.password = 'Current password is required to set a new one';
      }
      if (!form.newPassword.trim()) {
        next.newPassword = 'New password is required';
      } else if (form.newPassword.trim().length < 8) {
        next.newPassword = 'Password must be at least 8 characters';
      }
    }

    return next;
  };

  const handleSubmit = () => {
    const next = validate();

    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }

    toast.success('Profile updated successfully');
    setForm((prev) => ({ ...prev, password: '', newPassword: '' }));
    setErrors({});
  };

  return (
    <div className='flex flex-col gap-5'>
      {/* Page header */}
      <div>
        <h1 className='dashboard-page-title'>Admin User</h1>
        <p className='dashboard-page-subtitle mt-1'>
          Super Administrator &bull; Full Access
        </p>
      </div>

      {/* Account Details card */}
      <div className='bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-5'>
        <h2 className='text-lg font-semibold text-gray-900'>Account Details</h2>

        {/* Full Name */}
        <div className='flex flex-col gap-1'>
          <label className='text-base font-medium text-gray-700'>
            Full Name
          </label>
          <input
            type='text'
            placeholder='Admin User'
            value={form.fullName}
            onChange={handleChange('fullName')}
            className='w-full px-4 py-2.5 border border-gray-200 rounded-lg text-base text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400'
          />
          {errors.fullName && (
            <p className='text-xs text-red-500'>{errors.fullName}</p>
          )}
        </div>

        {/* Email Address */}
        <div className='flex flex-col gap-1'>
          <label className='text-base font-medium text-gray-700'>
            Email Address
          </label>
          <input
            type='email'
            placeholder='admin@proconsult.com'
            value={form.email}
            onChange={handleChange('email')}
            className='w-full px-4 py-2.5 border border-gray-200 rounded-lg text-base text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400'
          />
          {errors.email && (
            <p className='text-xs text-red-500'>{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className='flex flex-col gap-1'>
          <label className='text-base font-medium text-gray-700'>
            Password
          </label>
          <input
            type='password'
            placeholder='Enter Your password'
            value={form.password}
            onChange={handleChange('password')}
            autoComplete='current-password'
            className='w-full px-4 py-2.5 border border-gray-200 rounded-lg text-base text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400'
          />
          {errors.password && (
            <p className='text-xs text-red-500'>{errors.password}</p>
          )}
        </div>

        {/* Changes Password */}
        <div className='flex flex-col gap-1'>
          <label className='text-base font-medium text-gray-700'>
            Changes Password
          </label>
          <input
            type='password'
            placeholder='changes your password'
            value={form.newPassword}
            onChange={handleChange('newPassword')}
            autoComplete='new-password'
            className='w-full px-4 py-2.5 border border-gray-200 rounded-lg text-base text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400'
          />
          {errors.newPassword && (
            <p className='text-xs text-red-500'>{errors.newPassword}</p>
          )}
        </div>
      </div>

      {/* Update Profile button — right-aligned, outside the card */}
      <div className='flex justify-end'>
        <button
          type='button'
          onClick={handleSubmit}
          className='px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-base font-semibold rounded-lg transition-colors'
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
