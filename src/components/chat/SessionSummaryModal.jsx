import React, { memo } from 'react';
import { Check } from 'lucide-react';

const PRICE_PER_MINUTE = 2.50;

const SessionSummaryModal = memo(({ summary, onClose }) => {
    if (!summary) return null;
    return (
        <div className='fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4'>
            <div className='bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl'>
                <div className='flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mx-auto mb-4'>
                    <Check size={24} className='text-green-500' />
                </div>
                <h3 className='text-xl font-bold text-gray-900 text-center mb-6'>Session Ended</h3>
                <div className='space-y-3 mb-6'>
                    <div className='flex justify-between text-sm'>
                        <span className='text-gray-500'>Session Type</span>
                        <span className='font-semibold text-gray-800'>{summary.sessionType}</span>
                    </div>
                    <div className='flex justify-between text-sm'>
                        <span className='text-gray-500'>Duration</span>
                        <span className='font-semibold text-gray-800'>{summary.totalMinutes || 0} min</span>
                    </div>
                    <div className='flex justify-between text-sm'>
                        <span className='text-gray-500'>Rate</span>
                        <span className='font-semibold text-gray-800'>€{PRICE_PER_MINUTE}/min</span>
                    </div>
                    <div className='border-t pt-3 flex justify-between'>
                        <span className='font-bold text-gray-800'>Total Charged</span>
                        <span className='font-bold text-[#6E35AE] text-lg'>€{parseFloat(summary.totalCost || 0).toFixed(2)}</span>
                    </div>
                </div>
                <p className='text-xs text-gray-400 text-center mb-4'>
                    A transcript has been sent to your email.
                </p>
                <button
                    onClick={onClose}
                    className='w-full bg-[#6E35AE] hover:bg-[#5A2A8A] text-white py-3 rounded-xl font-semibold transition-colors'
                >
                    Close
                </button>
            </div>
        </div>
    );
});

SessionSummaryModal.displayName = 'SessionSummaryModal';
export default SessionSummaryModal;