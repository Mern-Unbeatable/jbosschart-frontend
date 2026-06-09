import React, { memo, useState } from 'react';
import { X, Check, Star, Video, Phone } from 'lucide-react';
import { useCreateReviewMutation } from '../../../features/api/reviewApi';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const CallFeedbackModal = memo(({ consultant, seconds, callId, onClose }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { user } = useSelector(state => state.auth);
  const [createReview, { isLoading: isSubmitting }] = useCreateReviewMutation();

  // Calculate actual duration and cost
  const durationMinutes = (seconds || 0) / 60;
  const ratePerMinute = consultant?.pricePerMinute || 2.5;
  const actualCost = (durationMinutes * ratePerMinute).toFixed(2);

  // Display format for duration
  const mins = Math.floor((seconds || 0) / 60);
  const secs = (seconds || 0) % 60;
  const durationDisplay = secs > 0
    ? `${mins} min ${secs} sec`
    : `${mins} min`;

  const formattedDate = new Date().toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  });

  const handleSubmit = async () => {


    try {
      await createReview({
        consultantId: consultant?.id || consultant?.userId,
        callId: callId,
        rating,
        comment: review,
      }).unwrap();
      toast.success('Review submitted!');
      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Review error:', err);
      toast('Review could not be saved', { icon: '⚠️' });
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4'>
      <div className='relative bg-[#333333] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border-t-4 border-green-500'>
        <button
          onClick={handleClose}
          className='absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10'
        >
          <X size={20} />
        </button>

        <div className='p-8 flex flex-col items-center'>
          <div className='w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4'>
            <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white'>
              <Check size={20} strokeWidth={4} />
            </div>
          </div>

          <h2 className='text-white font-bold text-2xl mb-8'>
            Consultation Completed
          </h2>

          <div className='w-full bg-white/10 rounded-xl p-4 flex items-center gap-4 mb-6 border border-white/5'>
            <img
              src={consultant?.image || consultant?.avatar || consultant?.user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'}
              alt=''
              className='w-12 h-12 rounded-full object-cover border border-white/20'
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop';
              }}
            />
            <div className='flex flex-col'>
              <p className='text-white text-lg font-bold'>
                {consultant?.name || consultant?.user?.name || 'Consultant'}
              </p>
              <div className='flex items-center gap-1 text-gray-300 text-base'>
                <Phone size={14} />
                <span>Call Completed</span>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-3 gap-3 w-full mb-6'>
            <div className='bg-white/10 rounded-xl py-3 px-1 text-center border border-white/5'>
              <p className='text-base text-gray-400 mb-1 uppercase font-medium'>Duration</p>
              <p className='text-white font-bold text-lg'>{durationDisplay}</p>
            </div>
            <div className='bg-white/10 rounded-xl py-3 px-1 text-center border border-white/5'>
              <p className='text-base text-gray-400 mb-1 uppercase font-medium'>Cost</p>
              <p className='text-white font-bold text-lg'>€{actualCost}</p>
            </div>
            <div className='bg-white/10 rounded-xl py-3 px-1 text-center border border-white/5'>
              <p className='text-base text-gray-400 mb-1 uppercase font-medium'>Rate/min</p>
              <p className='text-white font-bold text-lg'>€{ratePerMinute.toFixed(2)}</p>
            </div>
          </div>

          <p className='text-base text-gray-400 mb-6 font-medium'>{formattedDate}</p>

          <p className='text-white text-lg font-bold mb-4'>Rate your experience</p>

          <div className='flex justify-center gap-2 mb-4'>
            {[...Array(5)].map((_, i) => (
              <button key={i} onClick={() => setRating(i + 1)}
                className='transition-transform active:scale-90'>
                <Star
                  size={28}
                  fill={i < rating ? '#FFFFFF' : 'none'}
                  className={i < rating ? 'text-white' : 'text-white/30 hover:text-white'}
                />
              </button>
            ))}
          </div>

          <div className='w-full text-left mb-2'>
            <label className='text-white text-lg font-bold block'>Review</label>
          </div>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder='Write here...'
            className='w-full bg-[#444444] border border-white/10 rounded-xl p-4 text-base text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/30 h-32 mb-4 resize-none transition-all'
          />

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className='w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white py-3.5 rounded-xl font-bold text-base transition-all'
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </div>
    </div>
  );
});

CallFeedbackModal.displayName = 'CallFeedbackModal';
export default CallFeedbackModal;