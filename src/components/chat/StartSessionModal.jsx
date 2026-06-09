import React, { memo } from 'react';
import { Phone, Video, MessageSquare, X, AlertCircle } from 'lucide-react';

const PRICE_PER_MINUTE = 2.50;

const StartSessionModal = memo(({ onStart, onClose, walletBalance }) => {
    const canAfford = parseFloat(walletBalance || 0) >= PRICE_PER_MINUTE;
    return (
        <div className='fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4'>
            <div className='bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl'>
                <div className='flex justify-between items-start mb-6'>
                    <h3 className='text-xl font-bold text-gray-900'>Start Paid Session</h3>
                    <button onClick={onClose} className='text-gray-400 hover:text-gray-600'><X size={20} /></button>
                </div>
                {!canAfford && (
                    <div className='flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg mb-4 text-sm text-red-700'>
                        <AlertCircle size={16} />
                        Insufficient balance. Minimum €{PRICE_PER_MINUTE} required.
                    </div>
                )}
                <p className='text-sm text-gray-500 mb-6'>
                    Billed at <strong className='text-gray-800'>€{PRICE_PER_MINUTE}/minute</strong>.
                    Current balance: <strong className='text-gray-800'>€{parseFloat(walletBalance || 0).toFixed(2)}</strong>
                </p>
                <div className='grid grid-cols-3 gap-3'>
                    {[
                        { type: 'CHAT', label: 'Chat', Icon: MessageSquare, color: 'bg-[#333333]' },
                        { type: 'AUDIO', label: 'Audio', Icon: Phone, color: 'bg-[#E2AB0B]' },
                        { type: 'VIDEO', label: 'Video', Icon: Video, color: 'bg-[#6E35AE]' },
                    ].map(({ type, label, Icon, color }) => (
                        <button
                            key={type}
                            disabled={!canAfford}
                            onClick={() => onStart(type)}
                            className={`flex flex-col items-center gap-2 py-4 rounded-xl ${color} text-white font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90`}
                        >
                            <Icon size={20} /> {label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
});

StartSessionModal.displayName = 'StartSessionModal';
export default StartSessionModal;