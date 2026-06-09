import React, { memo } from 'react';
import { PhoneOff } from 'lucide-react';

const EndSessionConfirmModal = memo(({ onConfirm, onCancel, isEnding }) => (
    <div className='fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4'>
        <div className='bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl'>
            <div className='flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mx-auto mb-4'>
                <PhoneOff size={24} className='text-red-500' />
            </div>
            <h3 className='text-lg font-bold text-gray-900 text-center mb-2'>End Session?</h3>
            <p className='text-sm text-gray-500 text-center mb-6'>
                This will end the current billing session. A transcript will be sent to your email.
            </p>
            <div className='flex gap-3'>
                <button
                    onClick={onCancel}
                    className='flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors'
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    disabled={isEnding}
                    className='flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold text-sm transition-colors'
                >
                    {isEnding ? 'Ending...' : 'End Session'}
                </button>
            </div>
        </div>
    </div>
));

EndSessionConfirmModal.displayName = 'EndSessionConfirmModal';
export default EndSessionConfirmModal;