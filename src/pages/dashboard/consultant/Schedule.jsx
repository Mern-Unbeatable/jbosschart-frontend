import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  ChevronLeft,
  ChevronRight,
  User,
  Clock,
  Calendar,
  XCircle,
  X,
} from 'lucide-react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Sessions keyed by "YYYY-MM-DD"
const SESSIONS_BY_DATE = {
  '2026-04-26': [
    {
      name: 'Sharah',
      fullName: 'Sharah Williams',
      time: '9:40-10:30',
      modalTime: '9:40 AM – 10:30 AM',
      color: 'text-[#9d6fea]',
    },
  ],
  '2026-04-27': [
    {
      name: 'Marcus',
      fullName: 'Marcus Johnson',
      time: '7:20-9:40',
      modalTime: '7:20 AM – 9:40 AM',
      color: 'text-[#6e35ae]',
    },
    {
      name: 'Sarah',
      fullName: 'Sarah Chen',
      time: '10:00-11:30',
      modalTime: '10:00 AM – 11:30 AM',
      color: 'text-[#9d6fea]',
    },
    {
      name: 'Alex',
      fullName: 'Alex Rodriguez',
      time: '2:00-3:30',
      modalTime: '2:00 PM – 3:30 PM',
      color: 'text-[#6e35ae]',
    },
    {
      name: 'Emily',
      fullName: 'Emily Thompson',
      time: '4:00-5:15',
      modalTime: '4:00 PM – 5:15 PM',
      color: 'text-[#9d6fea]',
    },
  ],
  '2026-04-28': [
    {
      name: 'Sharah',
      fullName: 'Sharah Williams',
      time: '9:40-10:30',
      modalTime: '9:40 AM – 10:30 AM',
      color: 'text-[#9d6fea]',
    },
  ],
};

function formatModalDate(dateKey) {
  const [, month, day] = dateKey.split('-').map(Number);
  return `${MONTH_NAMES[month - 1]} ${day}`;
}

const BOOKED_SESSIONS = [
  { id: 1, name: 'Elena Vasquez', date: 'April 23', time: '10:23 AM  .30m' },
  { id: 2, name: 'Elena Vasquez', date: 'April 23', time: '10:23 AM  .30m' },
  { id: 3, name: 'Elena Vasquez', date: 'April 23', time: '10:23 AM  .30m' },
  { id: 4, name: 'Elena Vasquez', date: 'April 23', time: '10:23 AM  .30m' },
  { id: 5, name: 'Elena Vasquez', date: 'April 23', time: '10:23 AM  .30m' },
  { id: 6, name: 'Elena Vasquez', date: 'April 23', time: '10:23 AM  .30m' },
];

const MODAL_CLOSE_ANIMATION_MS = 280;

function getCalendarWeeks(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];

  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

const ConsultantSchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const weeks = getCalendarWeeks(year, month);

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const [modalDateKey, setModalDateKey] = useState(null);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const closeTimerRef = useRef(null);

  const closeModal = useCallback(() => {
    setIsModalClosing(true);
    closeTimerRef.current = setTimeout(() => {
      setModalDateKey(null);
      setIsModalClosing(false);
    }, MODAL_CLOSE_ANIMATION_MS);
  }, []);

  // Cleanup timer on unmount
  useEffect(
    () => () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    },
    [],
  );

  // ESC + body overflow lock
  useEffect(() => {
    if (!modalDateKey) return;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalDateKey, closeModal]);

  const getDateKey = (day) => {
    if (!day) return null;
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  return (
    <section className='space-y-10'>
      {/* Header */}
      <div className='flex flex-col gap-2'>
        <h1 className='dashboard-page-title'>Schedule</h1>
        <p className='dashboard-page-subtitle'>5 upcoming sessions</p>
      </div>

      {/* Calendar */}
      <div className='flex flex-col gap-6'>
        {/* Month navigation */}
        <div className='flex items-center gap-3'>
          <button
            type='button'
            onClick={handlePrevMonth}
            aria-label='Previous month'
            className='flex items-center justify-center text-[#050609] transition-colors duration-200 hover:text-[#9d6fea]'
          >
            <ChevronLeft size={20} aria-hidden='true' />
          </button>
          <p className='text-2xl font-medium text-[#050609]'>
            {MONTH_NAMES[month]} {year}
          </p>
          <button
            type='button'
            onClick={handleNextMonth}
            aria-label='Next month'
            className='flex items-center justify-center text-[#050609] transition-colors duration-200 hover:text-[#9d6fea]'
          >
            <ChevronRight size={20} aria-hidden='true' />
          </button>
        </div>

        {/* Calendar grid */}
        <div className='w-full overflow-hidden rounded-xl border border-gray-100 bg-white'>
          <table className='w-full table-fixed'>
            <thead>
              <tr className='bg-[#f6fbff]'>
                {DAYS.map((day, i) => (
                  <th
                    key={day}
                    scope='col'
                    className={`w-[14.2857%] py-3 text-left font-medium ${
                      i === 0
                        ? 'pl-4 pr-2 sm:pl-6 sm:pr-3'
                        : i === 6
                          ? 'pl-2 pr-4 sm:pl-3 sm:pr-6'
                          : 'px-2 sm:px-3'
                    }`}
                  >
                    <span className='text-sm text-black sm:hidden'>
                      {day[0]}
                    </span>
                    <span className='hidden text-base text-black sm:inline'>
                      {day}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, wi) => (
                <tr key={wi}>
                  {week.map((day, di) => {
                    const dateKey = getDateKey(day);
                    const sessions = dateKey ? SESSIONS_BY_DATE[dateKey] : null;

                    return (
                      <td
                        key={di}
                        className={`overflow-hidden border-t border-[#e4e4e4] align-top py-2 sm:py-6 ${
                          di === 0
                            ? 'pl-4 pr-2 sm:pl-6 sm:pr-3'
                            : di === 6
                              ? 'pl-2 pr-4 sm:pl-3 sm:pr-6'
                              : 'px-2 sm:px-3'
                        }`}
                      >
                        {day && (
                          <p className='mb-1 text-sm text-[#373737] sm:mb-2 sm:text-base'>
                            {day}
                          </p>
                        )}

                        {/* Mobile: dot tap-to-open */}
                        {sessions && (
                          <button
                            type='button'
                            onClick={() => setModalDateKey(dateKey)}
                            className='flex items-start sm:hidden'
                            aria-label={`Sessions on day ${day}`}
                          >
                            <span className='h-2 w-2 rounded-full bg-[#9d6fea]' />
                          </button>
                        )}

                        {/* Desktop: full session card */}
                        {sessions && (
                          <div className='hidden flex-col gap-1.5 sm:flex'>
                            <div className='flex flex-col gap-1 overflow-hidden rounded bg-[#f5f1fd] p-1.5'>
                              <div className='flex min-w-0 items-center gap-1.5'>
                                <User
                                  size={12}
                                  className={`shrink-0 ${sessions[0].color}`}
                                  aria-hidden='true'
                                />
                                <span
                                  className={`min-w-0 truncate text-sm leading-4 ${sessions[0].color}`}
                                >
                                  {sessions[0].name}
                                </span>
                              </div>
                              <div className='flex min-w-0 items-center gap-1.5'>
                                <Clock
                                  size={12}
                                  className={`shrink-0 ${sessions[0].color}`}
                                  aria-hidden='true'
                                />
                                <span
                                  className={`min-w-0 truncate text-sm leading-4 ${sessions[0].color}`}
                                >
                                  {sessions[0].time}
                                </span>
                              </div>
                            </div>
                            <button
                              type='button'
                              onClick={() => setModalDateKey(dateKey)}
                              className='text-left text-sm text-[#e2ab0b] underline transition-colors duration-200 hover:text-[#ce9c0a]'
                            >
                              See More
                            </button>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booked Sessions */}
      <section className='flex flex-col gap-8'>
        <h2 className='text-2xl font-medium text-[#050609]'>Booked Sessions</h2>

        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
          {BOOKED_SESSIONS.map((session) => (
            <article
              key={session.id}
              className='flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-6'
            >
              {/* Client header */}
              <div className='flex items-center gap-2.5'>
                <div className='flex size-16 shrink-0 items-center justify-center rounded-full bg-[#d9d9d9] text-[#464646]'>
                  <User size={32} aria-hidden='true' />
                </div>
                <p className='text-xl font-medium text-[#050609]'>
                  {session.name}
                </p>
              </div>

              {/* Divider */}
              <hr className='border-gray-100' />

              {/* Date / time */}
              <div className='flex items-center gap-14'>
                <div className='flex items-center gap-2'>
                  <Calendar
                    size={20}
                    className='text-[#545454]'
                    aria-hidden='true'
                  />
                  <span className='text-base text-[#0c0c0c]'>
                    {session.date}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock
                    size={20}
                    className='text-[#545454]'
                    aria-hidden='true'
                  />
                  <span className='text-base text-[#0c0c0c]'>
                    {session.time}
                  </span>
                </div>
              </div>

              {/* Cancel */}
              <button
                type='button'
                className='flex w-full items-center justify-center gap-2 rounded bg-[#fce7e7] px-6 py-3 text-base text-[#ce0a0a] transition-colors duration-200 hover:bg-red-100'
              >
                <XCircle size={20} aria-hidden='true' />
                Cancel
              </button>
            </article>
          ))}
        </div>
      </section>
      {/* Sessions Modal */}
      {modalDateKey &&
        createPortal(
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 ${
              isModalClosing
                ? 'animate-modal-overlay-out pointer-events-none'
                : 'animate-modal-overlay'
            }`}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
            role='dialog'
            aria-modal='true'
            aria-label={`Sessions on ${formatModalDate(modalDateKey)}`}
          >
            <div
              className={`w-full max-w-110 rounded-2xl bg-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] ${
                isModalClosing
                  ? 'animate-modal-panel-out'
                  : 'animate-modal-panel'
              }`}
            >
              {/* Modal header */}
              <div className='flex items-center justify-between border-b border-gray-100 px-5 py-4'>
                <h3 className='text-[17px] font-semibold text-[#101828]'>
                  Sessions on {formatModalDate(modalDateKey)}
                </h3>
                <button
                  type='button'
                  onClick={closeModal}
                  aria-label='Close modal'
                  className='flex size-7 items-center justify-center rounded-lg text-[#545454] transition-colors duration-200 hover:bg-gray-100 hover:text-[#101828]'
                >
                  <X size={16} aria-hidden='true' />
                </button>
              </div>

              {/* Session list */}
              <div className='flex flex-col gap-1 px-5 pb-5 pt-3'>
                {(SESSIONS_BY_DATE[modalDateKey] ?? []).map((session, i) => (
                  <div
                    key={i}
                    className='flex items-center gap-3 rounded-[14px] bg-[#f6f6f6] p-3'
                  >
                    <div className='flex size-9 shrink-0 items-center justify-center rounded-full bg-[#d9d9d9] text-[#464646]'>
                      <User size={16} aria-hidden='true' />
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-sm font-semibold text-[#101828]'>
                        {session.fullName}
                      </span>
                      <span className='text-sm font-medium text-[#6a7282]'>
                        {session.modalTime}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
};

export default ConsultantSchedule;
