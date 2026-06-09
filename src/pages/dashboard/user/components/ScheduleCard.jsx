import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  CalendarDays,
  Clock3,
  MessageSquare,
  Phone,
  Video,
} from 'lucide-react';

const ScheduleCard = ({ doctor, date, time, status = 'upcoming' }) => {
  const { t } = useTranslation();
  const isComplete = status === 'complete';
  const statusLabel = isComplete ? t('dashboard.user.scheduleCard.statusComplete') : t('dashboard.user.scheduleCard.statusUpcoming');

  return (
    <article className='relative flex min-h-52 flex-col rounded-[10px] border border-gray-100 bg-[#f1ebf7] p-3.5'>
      <span
        className={`absolute right-3 top-3 rounded-full px-3 py-1 text-sm font-medium leading-none ${
          isComplete
            ? 'bg-[#b8ebc2] text-[#3a9f4d]'
            : 'bg-[#fcf7e7] text-[#e2ab0b]'
        }`}
      >
        {statusLabel}
      </span>

      <div className='flex size-8 items-center justify-center rounded-full bg-[#d2c0e6] text-sm font-semibold text-[#6e35ae]'>
        SJ
      </div>

      <h3 className='mt-3 text-lg font-semibold leading-[1.35] text-[#333333]'>
        {doctor}
      </h3>

      <div className='mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 text-base leading-5 text-[#333333]'>
        <span className='inline-flex items-center gap-1'>
          <CalendarDays size={14} aria-hidden='true' />
          {date}
        </span>
        <span className='inline-flex items-center gap-1'>
          <Clock3 size={14} aria-hidden='true' />
          {time}
        </span>
      </div>

      <div className='mt-auto pt-3'>
        <div className='grid grid-cols-3 gap-2'>
          <button
            type='button'
            className='flex h-8 items-center justify-center rounded bg-[#d2c0e6] text-[#6e35ae] transition-colors hover:bg-[#c8b1df]'
            aria-label={t('dashboard.user.scheduleCard.callDoctor')}
          >
            <Phone size={16} aria-hidden='true' />
          </button>
          <button
            type='button'
            className='flex h-8 items-center justify-center rounded bg-[#d2c0e6] text-[#6e35ae] transition-colors hover:bg-[#c8b1df]'
            aria-label={t('dashboard.user.scheduleCard.startVideoCall')}
          >
            <Video size={16} aria-hidden='true' />
          </button>
          <button
            type='button'
            className='flex h-8 items-center justify-center rounded bg-[#d2c0e6] text-[#6e35ae] transition-colors hover:bg-[#c8b1df]'
            aria-label={t('dashboard.user.scheduleCard.openChat')}
          >
            <MessageSquare size={16} aria-hidden='true' />
          </button>
        </div>

        <button
          type='button'
          className='mt-2 rounded bg-[#b10000] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#8d0000]'
        >
          {t('dashboard.user.scheduleCard.cancel')}
        </button>
      </div>
    </article>
  );
};

export default ScheduleCard;
