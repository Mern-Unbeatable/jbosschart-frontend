import React, { memo, useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

const Toast = memo(({ message, type = 'success', isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  const Icon = type === 'success' ? CheckCircle : AlertCircle;

  return (
    <div className={`fixed bottom-6 right-6 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-[60] animate-in fade-in slide-in-from-bottom-4`}>
      <Icon size={20} />
      <p className='font-medium'>{message}</p>
      <button
        onClick={onClose}
        className='ml-2 hover:opacity-80 transition-opacity'
      >
        <X size={18} />
      </button>
    </div>
  );
});

Toast.displayName = 'Toast';

export default Toast;
