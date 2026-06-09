
import React, { memo, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Phone, Video, MessageSquare } from 'lucide-react';
import CommonAdsSection from '../../components/CommonAdsSection';

import { useGetConsultantByIdQuery } from '../../features/api/consultantApi';
import toast from 'react-hot-toast';
import RealTimeChat from './RealTimeChat';

const UserChatPage = memo(() => {

  const { id: consultantId } = useParams();
  const navigate = useNavigate();

  const [conversationReady, setConversationReady] = useState(false);
  const [otherUserInfo, setOtherUserInfo] = useState(null);

  const {
    data: consultantData,
    isLoading: consultantLoading,
    error: consultantError
  } = useGetConsultantByIdQuery(consultantId, {
    skip: !consultantId
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);




  // Add this useEffect in UserChatPage to ensure RealTimeChat gets the consultant ID correctly

  useEffect(() => {
    if (consultantData && consultantId) {
      const consultant = consultantData?.consultant || consultantData?.data?.consultant || consultantData;

      if (consultant) {
        const consultantUser = consultant.user || {
          id: consultant.userId || consultantId,
          name: consultant.name,
          avatar: consultant.avatar,
          role: 'CONSULTANT'
        };

        setOtherUserInfo(consultantUser);
        setConversationReady(true);

        // Log for debugging
        console.log('Consultant user info loaded:', consultantUser);
      }
    }
  }, [consultantData, consultantId]);
  // Handle loading state
  if (consultantLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#6E35AE] mx-auto mb-4' />
          <p className='text-gray-500'>Loading consultant information...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (consultantError || (!consultantLoading && !consultantData)) {
    return (
      <div className='min-h-screen bg-gray-50'>
        <div className='container mx-auto px-4 lg:px-6 pt-6 pb-12'>
          <div className='h-[70vh] flex flex-col items-center justify-center text-center'>
            <div className='w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4'>
              <svg className='w-10 h-10 text-red-500' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className='text-2xl font-semibold text-gray-800 mb-2'>Consultant Not Found</h2>
            <p className='text-gray-500 mb-6 max-w-md'>
              The consultant you're looking for doesn't exist or has been removed from our platform.
            </p>
            <button
              onClick={() => navigate('/consultants')}
              className='px-6 py-2.5 bg-[#6E35AE] text-white rounded-lg hover:bg-[#5A2A8A] transition-colors'
            >
              Browse Other Consultants
            </button>
          </div>
        </div>
      </div>
    );
  }

  const consultant = consultantData?.consultant || consultantData?.data?.consultant || consultantData;

  if (!consultant) {
    return null;
  }

  const consultantName = consultant.user?.name || consultant.name || 'Consultant';
  const consultantAvatar = consultant.user?.avatar || consultant.avatar;
  const consultantSpecializations = consultant.specialization || consultant.specializations || [];
  const isOnline = consultant.onlineStatus === 'ONLINE' || consultant.user?.onlineStatus === 'ONLINE';
  const pricePerMinute = consultant.pricePerMinute || 2.50;

  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='container mx-auto px-4 lg:px-6 pt-6 pb-12'>
        {/* Back button and consultant info */}
        <div className='mb-6'>
          <button
            onClick={() => navigate(`/consultants/${consultantId}`)}
            className='flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors group'
          >
            <ArrowLeft size={18} className='group-hover:-translate-x-1 transition-transform' />
            Back to Profile
          </button>

          {/* Consultant info header - shows who you're chatting with */}
          <div className='bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow'>
            <div className='relative'>
              <div className='w-14 h-14 rounded-full bg-gradient-to-br from-[#6E35AE] to-[#D1C4E9] flex items-center justify-center overflow-hidden'>
                {consultantAvatar ? (
                  <img
                    src={consultantAvatar}
                    alt={consultantName}
                    className='w-full h-full object-cover'
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = consultantName.charAt(0).toUpperCase();
                    }}
                  />
                ) : (
                  <span className='text-white text-xl font-bold'>
                    {consultantName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              {isOnline && (
                <span className='absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full' />
              )}
            </div>

            <div className='flex-1'>
              <h2 className='font-semibold text-gray-900 text-lg'>
                {consultantName}
              </h2>
              <p className='text-sm text-gray-500'>
                {consultantSpecializations.slice(0, 2).join(' • ') || 'Professional Consultant'}
              </p>
            </div>

            <div className='flex gap-2'>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${isOnline
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-500'
                }`}>
                {isOnline ? '● Online' : 'Offline'}
              </span>
              <span className='px-2.5 py-1 rounded-full text-xs font-medium bg-[#6E35AE]/10 text-[#6E35AE]'>
                €{pricePerMinute}/min
              </span>
            </div>
          </div>
        </div>

        {/* ── Chat Area ─────────────────────────────────────────── */}
        <div className='bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm' style={{ height: 'calc(70vh - 120px)', minHeight: '500px' }}>
          {conversationReady && otherUserInfo ? (
            <RealTimeChat
              className='h-full'
              showSidebar={false}
              initialOtherUserId={otherUserInfo.id}
              otherUserName={consultantName}
              otherUserAvatar={consultantAvatar}
            />
          ) : (
            <div className='h-full flex items-center justify-center text-gray-400'>
              <div className='text-center'>
                <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <MessageSquare size={32} className='text-gray-400' />
                </div>
                <p className='text-gray-500'>Initializing chat session...</p>
                <p className='text-sm text-gray-400 mt-2'>Please wait a moment</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Ads Section ──────────────────────────────────────────────── */}
      <div className='pb-12'>
        <CommonAdsSection
          containerClassName='container mx-auto px-4 lg:px-6'
        />
      </div>
    </div>
  );
});

UserChatPage.displayName = 'UserChatPage';
export default UserChatPage;