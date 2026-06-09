import React, { useState, useCallback, memo } from 'react';
import { useApi } from '../../hooks/useApi';
import toast from 'react-hot-toast';
import { httpMethods } from '../../services/httpMethods';
import { API_ENDPOINTS } from '../../services/httpEndpoint';

const ContactContent = memo(() => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen '>
      <h1 className='text-4xl font-bold mb-8'>Contact Us</h1>
      <div className='flex space-x-8'></div>
    </div>
  );
});

ContactContent.displayName = 'ContactContent';

export default ContactContent;
