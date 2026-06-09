import React, { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Euro,
  Clock,
  Star,
  Eye,
  X,
  Video,
  Phone,
  MessageSquare,
  User,
} from 'lucide-react';

const MODAL_CLOSE_ANIMATION_MS = 280;

const SESSIONS = [
  {
    id: 1,
    name: 'John Doe',
    email: 'james.h@email.com',
    type: 'Video',
    duration: '45 mins',
    earnings: '45.00',
    date: 'Apr 24, 2024',
    rating: 5,
    status: 'Completed',
    consultantName: 'Dr. Sarah Johnson',
    reviewText:
      'I had a really great consultation experience. The session was very insightful and helpful. The consultant listened carefully, understood my situation, and provided clear guidance that I can actually apply in my life. The conversation felt comfortable and genuine, and I truly appreciate the time and attention given during the session.',
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'james.h@email.com',
    type: 'Phone',
    duration: '30 mins',
    earnings: '30.00',
    date: 'Apr 23, 2024',
    rating: 5,
    status: 'Completed',
    consultantName: 'Dr. Sarah Johnson',
    reviewText:
      'Great phone consultation. The consultant was very professional and attentive throughout the session. I received practical advice that I could apply immediately.',
  },
  {
    id: 3,
    name: 'John Doe',
    email: 'james.h@email.com',
    type: 'Video',
    duration: '60 mins',
    earnings: '60.00',
    date: 'Apr 22, 2024',
    rating: 5,
    status: 'Completed',
    consultantName: 'Dr. Sarah Johnson',
    reviewText:
      'Excellent video session. Very thorough and detailed discussion. The consultant took time to explain everything clearly and made sure all my questions were answered.',
  },
  {
    id: 4,
    name: 'John Doe',
    email: 'james.h@email.com',
    type: 'Chat',
    duration: '25 mins',
    earnings: '25.00',
    date: 'Apr 21, 2024',
    rating: 5,
    status: 'Completed',
    consultantName: 'Dr. Sarah Johnson',
    reviewText:
      'The chat session was very convenient. Quick and to the point with helpful suggestions. Would definitely book again for follow-up questions.',
  },
  {
    id: 5,
    name: 'John Doe',
    email: 'james.h@email.com',
    type: 'Video',
    duration: '50 mins',
    earnings: '50.00',
    date: 'Apr 20, 2024',
    rating: 5,
    status: 'Completed',
    consultantName: 'Dr. Sarah Johnson',
    reviewText:
      'Amazing session. The consultant was well prepared, knowledgeable and supportive. I left the session feeling confident and with a clear action plan.',
  },
  {
    id: 6,
    name: 'John Doe',
    email: 'james.h@email.com',
    type: 'Video',
    duration: '50 mins',
    earnings: '50.00',
    date: 'Apr 20, 2024',
    rating: 5,
    status: 'Completed',
    consultantName: 'Dr. Sarah Johnson',
    reviewText:
      'Wonderful consultation experience. The session was engaging and productive. I highly recommend booking with this consultant for insightful and practical guidance.',
  },
];

const METRICS = [
  {
    icon: Euro,
    iconBg: 'bg-[#e9f9ef]',
    iconColor: 'text-green-500',
    value: '€345',
    label: 'Total Earnings',
    filled: false,
  },
  {
    icon: Clock,
    iconBg: 'bg-[#fff5e5]',
    iconColor: 'text-[#e2ab0b]',
    value: '225m',
    label: 'Total Minutes',
    filled: false,
  },
  {
    icon: Star,
    iconBg: 'bg-[#fcf7e7]',
    iconColor: 'text-[#e2ab0b]',
    value: '4.8',
    label: 'Avg. Rating',
    filled: true,
  },
];

const TYPE_ICONS = {
  Video,
  Phone,
  Chat: MessageSquare,
};

const FILTERS = ['All', 'Phone', 'Video', 'Chat'];

const ConsultantSessionsHistory = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedSession, setSelectedSession] = useState(null);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const closeTimerRef = useRef(null);

  const closeModal = useCallback(() => {
    setIsModalClosing(true);
    closeTimerRef.current = setTimeout(() => {
      setSelectedSession(null);
      setIsModalClosing(false);
    }, MODAL_CLOSE_ANIMATION_MS);
  }, []);

  useEffect(
    () => () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    },
    [],
  );

  useEffect(() => {
    if (!selectedSession) return;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedSession, closeModal]);

  const filtered =
    activeFilter === 'All'
      ? SESSIONS
      : SESSIONS.filter((s) => s.type === activeFilter);

  return (
    <section className='space-y-8'>
      {/* Header */}
      <div className='space-y-2'>
        <h1 className='dashboard-page-title'>Sessions History</h1>
        <p className='dashboard-page-subtitle'>
          Track and review your past consultation sessions.
        </p>
      </div>

      {/* Metric cards */}
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
        {METRICS.map(
          ({ icon: Icon, iconBg, iconColor, value, label, filled }) => (
            <div
              key={label}
              className='flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-6'
            >
              <div
                className={`flex size-10 items-center justify-center rounded-lg ${iconBg}`}
              >
                <Icon
                  size={24}
                  className={iconColor}
                  fill={filled ? 'currentColor' : 'none'}
                  aria-hidden='true'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <span className='text-[28px] font-semibold leading-normal text-[#0c0c0c]'>
                  {value}
                </span>
                <span className='text-sm leading-5 text-[#373737]'>
                  {label}
                </span>
              </div>
            </div>
          ),
        )}
      </div>

      {/* Filter tabs */}
      <div className='rounded-[14px] border border-gray-100 bg-white px-3.5 py-5'>
        <div className='grid w-full grid-cols-4 items-center gap-2 rounded-lg border border-gray-100 p-2 sm:flex sm:w-fit sm:gap-4 sm:px-6 sm:py-3'>
          {FILTERS.map((f) => (
            <button
              key={f}
              type='button'
              onClick={() => setActiveFilter(f)}
              className={`rounded px-2 py-1 text-center text-sm text-[#333333] transition-colors duration-150 sm:px-2.5 sm:text-base ${
                activeFilter === f ? 'bg-[#f0f0f0]' : 'hover:bg-gray-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className='overflow-hidden rounded-xl border border-gray-100 bg-white'>
        <div className='divide-y divide-gray-100 md:hidden'>
          {filtered.length === 0 ? (
            <div className='px-4 py-12 text-center text-base text-[#373737]'>
              No sessions found.
            </div>
          ) : (
            filtered.map((session) => (
              <article key={session.id} className='space-y-3.5 p-4'>
                <div className='flex items-start justify-between gap-3'>
                  <div className='min-w-0'>
                    <p className='truncate text-base text-[#0c0c0c]'>
                      {session.name}
                    </p>
                    <p className='truncate text-sm text-[#373737]'>
                      {session.email}
                    </p>
                  </div>
                  <button
                    type='button'
                    onClick={() => setSelectedSession(session)}
                    aria-label='View session details'
                    className='inline-flex shrink-0 items-center justify-center rounded-md p-1 text-[#333333] transition-colors duration-150 hover:bg-gray-50 hover:text-[#0c0c0c]'
                  >
                    <Eye size={20} aria-hidden='true' />
                  </button>
                </div>

                <div className='grid grid-cols-2 gap-x-4 gap-y-2 text-sm'>
                  <p className='text-[#373737]'>
                    Type: <span className='text-[#0c0c0c]'>{session.type}</span>
                  </p>
                  <p className='text-[#373737]'>
                    Duration:{' '}
                    <span className='text-[#0c0c0c]'>{session.duration}</span>
                  </p>
                  <p className='text-[#373737]'>
                    Earnings:{' '}
                    <span className='text-[#0c0c0c]'>€{session.earnings}</span>
                  </p>
                  <p className='text-[#373737]'>
                    Date: <span className='text-[#0c0c0c]'>{session.date}</span>
                  </p>
                  <div className='flex items-center gap-1.5 text-[#373737]'>
                    <span>Rating:</span>
                    <Star
                      size={16}
                      className='text-[#e2ab0b]'
                      fill='currentColor'
                      aria-hidden='true'
                    />
                    <span className='text-[#0c0c0c]'>{session.rating}</span>
                  </div>
                  <p className='text-[#373737]'>
                    Status:{' '}
                    <span className='rounded-full bg-[#eefff1] px-2 py-0.5 text-xs text-[#05bc27]'>
                      {session.status}
                    </span>
                  </p>
                </div>
              </article>
            ))
          )}
        </div>

        <div className='hidden overflow-x-auto md:block'>
          <table className='w-full min-w-175 border-collapse'>
            <thead>
              <tr className='bg-[#f6fbff]'>
                <th className='px-6 py-3 text-left text-base font-normal text-black'>
                  CLIENT NAME
                </th>
                <th className='px-4 py-3 text-left text-base font-normal text-black'>
                  TYPE
                </th>
                <th className='px-4 py-3 text-left text-base font-normal text-black'>
                  DURATION
                </th>
                <th className='px-4 py-3 text-left text-base font-normal text-black'>
                  Earnings
                </th>
                <th className='px-4 py-3 text-left text-base font-normal text-black'>
                  DATE
                </th>
                <th className='px-4 py-3 text-left text-base font-normal text-black'>
                  Rating
                </th>
                <th className='px-4 py-3 text-left text-base font-normal text-black'>
                  Status
                </th>
                <th className='px-4 py-3 text-center text-base font-normal text-black'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className='py-12 text-center text-base text-[#373737]'
                  >
                    No sessions found.
                  </td>
                </tr>
              ) : (
                filtered.map((session) => (
                  <tr
                    key={session.id}
                    className='border-b border-gray-100 last:border-b-0'
                  >
                    {/* Client */}
                    <td className='px-6 py-6'>
                      <div className='flex flex-col gap-2.5'>
                        <span className='text-base text-[#0c0c0c]'>
                          {session.name}
                        </span>
                        <span className='text-sm leading-5 text-[#373737]'>
                          {session.email}
                        </span>
                      </div>
                    </td>
                    {/* Type */}
                    <td className='px-4 py-6 text-base text-[#0c0c0c]'>
                      {session.type}
                    </td>
                    {/* Duration */}
                    <td className='px-4 py-6 text-base text-[#373737]'>
                      {session.duration}
                    </td>
                    {/* Earnings */}
                    <td className='px-4 py-6 text-base text-black'>
                      <span className='font-bold'>€</span>
                      {session.earnings}
                    </td>
                    {/* Date */}
                    <td className='px-4 py-6 text-base text-[#373737]'>
                      {session.date}
                    </td>
                    {/* Rating */}
                    <td className='px-4 py-6'>
                      <div className='flex items-center gap-2'>
                        <Star
                          size={18}
                          className='text-[#e2ab0b]'
                          fill='currentColor'
                          aria-hidden='true'
                        />
                        <span className='text-base text-[#373737]'>
                          {session.rating}
                        </span>
                      </div>
                    </td>
                    {/* Status */}
                    <td className='px-4 py-6'>
                      <span className='rounded-full bg-[#eefff1] px-4 py-0.5 text-base text-[#05bc27]'>
                        {session.status}
                      </span>
                    </td>
                    {/* Action */}
                    <td className='px-4 py-6 text-center'>
                      <button
                        type='button'
                        onClick={() => setSelectedSession(session)}
                        aria-label='View session details'
                        className='inline-flex items-center justify-center text-[#333333] transition-colors duration-150 hover:text-[#0c0c0c]'
                      >
                        <Eye size={20} aria-hidden='true' />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className='flex flex-col gap-3 border-t border-gray-100 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6'>
          <span className='text-center text-sm text-[#e2ab0b] sm:text-left sm:text-base'>
            Showing 1 to {filtered.length} of {SESSIONS.length} results
          </span>
          <div className='flex justify-center gap-2 sm:justify-end'>
            <button
              type='button'
              className='rounded-xl border border-[#e2ab0b] px-4 py-2 text-sm capitalize text-[#e2ab0b] transition-colors duration-150 hover:bg-[#fcf7e7] sm:text-base'
            >
              Previous
            </button>
            <button
              type='button'
              className='rounded-xl border border-[#e2ab0b] px-4 py-2 text-sm capitalize text-[#e2ab0b] transition-colors duration-150 hover:bg-[#fcf7e7] sm:text-base'
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Session Details Modal */}
      {selectedSession &&
        createPortal(
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 ${
              isModalClosing
                ? 'animate-modal-overlay-out pointer-events-none'
                : 'animate-modal-overlay'
            }`}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
            role='dialog'
            aria-modal='true'
            aria-label='Session Details'
          >
            <div
              className={`max-h-[90vh] w-full max-w-122.75 overflow-y-auto rounded-[10px] border border-[#e7f1f1] bg-white px-4.5 py-5.75 ${
                isModalClosing
                  ? 'animate-modal-panel-out'
                  : 'animate-modal-panel'
              }`}
            >
              {/* Header */}
              <div className='mb-7.5 flex items-center justify-between'>
                <h2 className='text-2xl font-semibold text-[#212121]'>
                  Session Details
                </h2>
                <button
                  type='button'
                  onClick={closeModal}
                  aria-label='Close session details'
                  className='flex size-9 shrink-0 items-center justify-center rounded-full bg-[#d9d9d9] text-[#333333] transition-colors duration-150 hover:bg-gray-300'
                >
                  <X size={18} aria-hidden='true' />
                </button>
              </div>

              {/* Consultant info + Duration */}
              <div className='mb-7.5 flex flex-col gap-2.5'>
                <div className='flex h-20.25 items-center gap-3 rounded-[10px] bg-[#f1ebf7] p-4'>
                  <div className='flex size-12 shrink-0 items-center justify-center rounded-full bg-[#d9d9d9] text-[#464646]'>
                    <User size={22} aria-hidden='true' />
                  </div>
                  <div className='flex flex-col gap-0.5'>
                    <span className='text-lg font-medium text-[#1c1c1c]'>
                      {selectedSession.consultantName}
                    </span>
                    <div className='flex items-center gap-1.5'>
                      {(() => {
                        const TypeIcon =
                          TYPE_ICONS[selectedSession.type] ?? Eye;
                        return (
                          <TypeIcon
                            size={16}
                            className='text-[#1c1c1c]'
                            aria-hidden='true'
                          />
                        );
                      })()}
                      <span className='text-sm text-[#1c1c1c]'>
                        {selectedSession.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Duration card */}
                <div className='flex w-fit flex-col gap-1 rounded-lg bg-[#f1ebf7] px-3 pb-2 pt-3'>
                  <span className='text-center text-sm text-[#1c1c1c]'>
                    Duration
                  </span>
                  <span className='text-center text-base text-[#1c1c1c]'>
                    {selectedSession.duration}
                  </span>
                </div>
              </div>

              {/* Rate */}
              <div className='mb-7.5 flex flex-col gap-2'>
                <span className='text-sm font-medium text-[#1c1a1a]'>Rate</span>
                <div className='flex items-center gap-2'>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={32}
                      className={
                        i < selectedSession.rating
                          ? 'text-[#e2ab0b]'
                          : 'text-gray-300'
                      }
                      fill='currentColor'
                      aria-hidden='true'
                    />
                  ))}
                </div>
              </div>

              {/* Review */}
              <div className='flex flex-col gap-2'>
                <span className='text-xl text-[#151515]'>Review</span>
                <div className='rounded-lg bg-[#f1ebf7] p-2.5'>
                  <p className='text-sm leading-relaxed text-[#2e1649]'>
                    {selectedSession.reviewText}
                  </p>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
};

export default ConsultantSessionsHistory;
