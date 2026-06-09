import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Video, MessageSquare, Star } from 'lucide-react';
import AudioCallModal from '../pages/consultants/sections/AudioCallModal';
import VideoCallModal from '../pages/consultants/sections/VideoCallModal';
import { usePresence } from '../hooks/usePresence';
import { getStatusStyle, toDisplayStatus } from '../utils/status';



const ConsultantCard = memo(({ consultantsData }) => {
  const navigate = useNavigate();
  const { getStatus } = usePresence();

  const [showAudio, setShowAudio] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState(null);

  const handleCardClick = (consultantId) => {
    navigate(`/consultants/${consultantId}`);
  };

  const handleAudioCall = (e, consultant) => {
    e.stopPropagation();
    setSelectedConsultant({
      ...consultant,
      userId: consultant.userId || consultant.user?.id || consultant.id,
      pricePerMinute: parseFloat(consultant.pricePerMinute || 2.5),
      name: consultant.user?.name || consultant.name,
      image: consultant.user?.avatar || consultant.avatar,
    });
    setShowAudio(true);
  };

  const handleVideoCall = (e, consultant) => {
    e.stopPropagation();
    setSelectedConsultant({
      ...consultant,
      userId: consultant.userId || consultant.user?.id || consultant.id,
      pricePerMinute: parseFloat(consultant.pricePerMinute || 2.5),
      name: consultant.user?.name || consultant.name,
      image: consultant.user?.avatar || consultant.avatar,
    });
    setShowVideo(true);
  };

  const handleChat = (e, consultantId) => {
    e.stopPropagation();
    navigate(`/consultants/${consultantId}/chat`);
  };

  const consultants = consultantsData?.consultants || [];
  if (consultants.length === 0) return null;

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {consultants.map((consultant) => {
          const consultantUserId = consultant.userId || consultant.user?.id;
          const rawStatus = getStatus(consultantUserId, consultant.onlineStatus);
          const displayStatus = toDisplayStatus(rawStatus);

          return (
            <div
              key={consultant.id}
              onClick={() => handleCardClick(consultant.id)}
              className='bg-[#F5F1FD] rounded-2xl overflow-hidden shadow-sm p-4 cursor-pointer transition-transform hover:scale-105 duration-300'
            >

              <div className='relative rounded-xl overflow-hidden'>
                <img
                  src={
                    consultant.user?.avatar ||
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop'
                  }
                  alt={consultant.user?.name || 'Consultant'}
                  className='w-full h-60 object-cover'
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop';
                  }}
                />

                <div
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[12px] font-medium flex items-center gap-1.5 ${getStatusStyle(displayStatus)}`}
                >

                  {displayStatus === 'Online' && (
                    <span className='relative flex h-2 w-2'>
                      <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75' />
                      <span className='relative inline-flex rounded-full h-2 w-2 bg-white' />
                    </span>
                  )}
                  {displayStatus}
                </div>
              </div>

              <div className='px-1 py-4'>
                <div className='flex justify-between items-center mb-1'>
                  <h3 className='text-2xl font-crimson font-medium text-gray-900'>
                    {consultant.user?.name || 'Unknown'}
                  </h3>
                  <div className='flex items-center gap-1 text-[#E2AB0B] font-bold text-lg font-crimson'>
                    <Star size={18} fill='currentColor' />
                    <span>
                      {parseFloat(
                        consultant.rating || consultant.averageRating || 0,
                      ).toFixed(1)}
                    </span>
                  </div>
                </div>

                <p className='text-base text-gray-500 mb-4 font-poppins'>
                  {consultant.specialization?.length > 0
                    ? consultant.specialization[0]
                    : 'Consultant'}
                </p>

                <div className='mb-6'>
                  <span className='text-2xl font-semibold text-gray-900'>
                    €{parseFloat(consultant.pricePerMinute || 2.5).toFixed(2)}
                  </span>
                  <span className='text-gray-800 text-2xl font-semibold ml-1 font-crimson'>
                    per minute
                  </span>
                </div>

                <div className='flex gap-3 pt-4 border-t border-[#DFC2FF]'>
                  <button
                    type='button'
                    onClick={(e) => handleAudioCall(e, consultant)}
                    className='flex-1 h-12 bg-[#D2C0E6] text-[#6E35AE] rounded-lg flex items-center justify-center hover:bg-[#D4C4E5] transition-colors'
                  >
                    <Phone size={20} className='stroke-[1.5]' />
                  </button>
                  <button
                    type='button'
                    onClick={(e) => handleVideoCall(e, consultant)}
                    className='flex-1 h-12 bg-[#D2C0E6] text-[#6E35AE] rounded-lg flex items-center justify-center hover:bg-[#D4C4E5] transition-colors'
                  >
                    <Video size={20} className='stroke-[1.5]' />
                  </button>
                  <button
                    type='button'
                    onClick={(e) => handleChat(e, consultant.id)}
                    className='flex-1 h-12 bg-[#D2C0E6] text-[#6E35AE] rounded-lg flex items-center justify-center hover:bg-[#D4C4E5] transition-colors'
                  >
                    <MessageSquare size={20} className='stroke-[1.5]' />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedConsultant && (
        <>
          <AudioCallModal
            isOpen={showAudio}
            onClose={() => {
              setShowAudio(false);
              setSelectedConsultant(null);
            }}
            consultant={selectedConsultant}
          />
          <VideoCallModal
            isOpen={showVideo}
            onClose={() => {
              setShowVideo(false);
              setSelectedConsultant(null);
            }}
            consultant={selectedConsultant}
          />
        </>
      )}
    </>
  );
});

ConsultantCard.displayName = 'ConsultantCard';
export default ConsultantCard;