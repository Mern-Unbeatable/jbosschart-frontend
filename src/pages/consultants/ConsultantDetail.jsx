import React, { memo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Phone, Video, MessageSquare, Star, ArrowLeft, MapPin, Award, Globe,
} from 'lucide-react';
import CommonAdsSection from '../../components/CommonAdsSection';
import AudioCallModal from './sections/AudioCallModal';
import VideoCallModal from './sections/VideoCallModal';
import BookScheduleModal from './sections/BookScheduleModal';
import { useGetConsultantByIdQuery } from '../../features/api/consultantApi';
import RealTimeChat from './RealTimeChat';
import { useConsultantStatus } from '../../hooks/usePresence';
import { getStatusBadgeStyle, toDisplayStatus } from '../../utils/status';

const ConsultantDetail = memo(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAudioCall, setShowAudioCall] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showBookSchedule, setShowBookSchedule] = useState(false);

  const { data: consultantData, isLoading } = useGetConsultantByIdQuery(id);
  const consultant =
    consultantData?.data?.consultant ||
    consultantData?.consultant ||
    consultantData?.data ||
    null;

  const consultantUserId = consultant?.userId || consultant?.user?.id;
  const liveStatus = useConsultantStatus(consultantUserId, consultant?.onlineStatus);
  const displayStatus = toDisplayStatus(liveStatus);

  if (isLoading) {
    return (
      <div className='min-h-screen bg-[#FBFDFF] flex items-center justify-center'>
        <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-[#6E35AE]' />
      </div>
    );
  }

  if (!consultant) {
    return (
      <div className='min-h-screen bg-[#FBFDFF] flex items-center justify-center'>
        <p className='text-gray-500'>Consultant not found</p>
      </div>
    );
  }

  const consultantForModal = {
    ...consultant,
    userId: consultant.id,
    consultantId: consultant.id,
    name: consultant.name || consultant.user?.name,
    image: consultant.avatar || consultant.user?.avatar || consultant.image,
    pricePerMinute: parseFloat(consultant.pricePerMinute || 2.50),
  };

  const areas = consultant.specialization || consultant.areas || [];
  const reviews = consultant.reviews || [];

  const handleChatNow = () => {
    const userId = consultantForModal.userId;
    if (!userId) {
      console.error('Consultant userId not found');
      return;
    }
    navigate(`/consultants/${userId}/chat`);
  };

  return (
    <div className='min-h-screen bg-[#FBFDFF]'>
      <div className='container mx-auto pt-14 pb-8 md:pb-20 px-4 lg:px-6'>

        {/* ── Hero Grid ─────────────────────────────────── */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start'>

          {/* Left: Image */}
          <div className='lg:col-span-5'>
            <div className='relative rounded-2xl overflow-hidden aspect-square shadow-sm border border-gray-100'>
              <img
                src={
                  consultantForModal.image ||
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop'
                }
                alt={consultantForModal.name}
                className='w-full h-full object-cover'
                onError={(e) => {
                  e.target.src =
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop';
                }}
              />


              <div className='absolute bottom-6 left-6 text-white z-10'>
                <div
                  className={`flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full w-fit mb-2 ${getStatusBadgeStyle(displayStatus)}`}
                >
                  {displayStatus === 'Available Now' && (
                    <div className='w-2 h-2 bg-white rounded-full animate-pulse' />
                  )}
                  {displayStatus}
                </div>
                <h1 className='text-3xl font-bold'>{consultantForModal.name}</h1>
              </div>
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent' />
            </div>
          </div>

          {/* Right: Info */}
          <div className='lg:col-span-7 flex flex-col h-full justify-center'>
            <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-4'>About Me</h2>
            <p className='text-gray-600 leading-relaxed mb-8 text-base md:text-lg'>
              {consultant.bio || 'Professional consultant ready to help you.'}
            </p>

            <h3 className='text-2xl md:text-3xl font-bold text-gray-800 mb-4'>
              Areas of Expertise
            </h3>
            <div className='flex flex-wrap gap-3 mb-10'>
              {areas.map((area, idx) => (
                <span
                  key={idx}
                  className='px-6 py-2.5 border border-[#00000033] rounded-xl text-base font-medium text-gray-700 bg-white transition-colors'
                >
                  {area}
                </span>
              ))}
            </div>

            {/* Pricing note */}
            <div className='flex items-center gap-2 mb-6 p-3 bg-[#F5F1FD] rounded-xl border border-[#6E35AE]/20'>
              <span className='text-[#6E35AE] font-bold text-lg'>€2.50</span>
              <span className='text-gray-500 text-sm'>
                per minute for Chat, Audio & Video sessions
              </span>
            </div>

            {/* Action buttons */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3'>
              <button
                onClick={() => setShowAudioCall(true)}
                className='bg-[#E2AB0B] text-white py-3.5 rounded-lg flex items-center justify-center gap-2 text-base font-semibold transition-all hover:bg-[#d99a00]'
              >
                <Phone size={20} /> Call Now
              </button>
              <button
                onClick={() => setShowVideoCall(true)}
                className='bg-[#6E35AE] text-white py-3.5 rounded-lg flex items-center justify-center gap-2 text-base font-semibold transition-all hover:bg-[#5A2A8A]'
              >
                <Video size={20} /> Video Call
              </button>
              <button
                type='button'
                onClick={handleChatNow}
                className='bg-[#333333] text-white py-3.5 rounded-lg flex items-center justify-center gap-2 text-base font-semibold transition-all hover:bg-[#1a1a1a]'
              >
                <MessageSquare size={20} /> Chat Now
              </button>
            </div>
            <button
              onClick={() => setShowBookSchedule(true)}
              className='w-full bg-[#05BC27] hover:bg-[#049620] text-white py-4 rounded-lg font-bold text-base transition-all shadow-sm'
            >
              Book A Schedule
            </button>
          </div>
        </div>

        {/* ── Info Grid ──────────────────────────────────── */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-16'>
          {[
            { label: 'Experience', value: `${consultant.experience || '5'}+ Years`, icon: Award },
            { label: 'Languages', value: consultant.language || consultant.languages || 'English', icon: Globe },
            { label: 'Location', value: consultant.location || 'Online Consultant', icon: MapPin },
          ].map((item, i) => (
            <div
              key={i}
              className='border border-[#00000033] rounded-xl p-8 flex items-center gap-4 bg-white'
            >
              <div className='text-gray-400'><item.icon size={24} strokeWidth={1.5} /></div>
              <div>
                <p className='text-base text-gray-400 font-medium'>{item.label}</p>
                <p className='font-semibold text-gray-700 text-xl'>{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Reviews ────────────────────────────────────── */}
        <div className='mb-16'>
          <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-8'>Reviews</h2>
          {reviews.length === 0 ? (
            <p className='text-gray-400'>No reviews yet.</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {reviews.map((rev, i) => (
                <div
                  key={i}
                  className='border border-[#00000033] rounded-2xl p-7 bg-white shadow-sm'
                >
                  <div className='flex justify-between items-center mb-3'>
                    <p className='font-bold text-gray-900 text-lg'>
                      {rev.user?.name || rev.user || 'User'}
                    </p>
                    <div className='flex gap-1'>
                      {[...Array(5)].map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          size={18}
                          fill={starIdx < rev.rating ? '#EAB308' : 'none'}
                          className={
                            starIdx < rev.rating
                              ? 'text-[#EAB308]'
                              : 'text-gray-200'
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className='text-sm text-gray-500 italic'>
                    "{rev.comment || rev.text}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <CommonAdsSection
          wrapperClassName='mt-24'
          containerClassName='px-0'
          boxClassName='w-full h-48 lg:h-72 bg-[#F1F5F9] rounded-3xl border border-dashed border-gray-300 flex items-center justify-center group'
          title='Advertisement Area'
          titleClassName='text-black font-bold text-xl sm:text-2xl tracking-widest uppercase'
        />

        <AudioCallModal
          isOpen={showAudioCall}
          onClose={() => setShowAudioCall(false)}
          consultant={consultantForModal}
        />
        <VideoCallModal
          isOpen={showVideoCall}
          onClose={() => setShowVideoCall(false)}
          consultant={consultantForModal}
        />
        <BookScheduleModal
          isOpen={showBookSchedule}
          onClose={() => setShowBookSchedule(false)}
          consultant={consultantForModal}
        />
      </div>
    </div>
  );
});

ConsultantDetail.displayName = 'ConsultantDetail';
export default ConsultantDetail;

export const ConsultantDetailChat = memo(() => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: consultantData, isLoading } = useGetConsultantByIdQuery(id);
  const consultant =
    consultantData?.data?.consultant ||
    consultantData?.consultant ||
    consultantData?.data ||
    null;
  const consultantUserId = consultant?.userId || consultant?.user?.id;

  if (isLoading) {
    return (
      <div className='min-h-screen bg-[#FBFDFF] flex items-center justify-center'>
        <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-[#6E35AE]' />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#FBFDFF]'>
      <div className='container mx-auto px-4 lg:px-6 pt-6 pb-8'>
        <button
          onClick={() => navigate(`/consultants/${id}`)}
          className='flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors'
        >
          <ArrowLeft size={18} /> Back to Profile
        </button>

        <div style={{ height: 'calc(100vh - 160px)' }}>
          {consultantUserId ? (
            <RealTimeChat
              className='h-full'
              showSidebar={false}
              initialOtherUserId={consultantUserId}
            />
          ) : (
            <div className='flex items-center justify-center h-full text-gray-400'>
              <p>Consultant not found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

ConsultantDetailChat.displayName = 'ConsultantDetailChat';