import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/slices/authSlice';
import { Wallet } from 'lucide-react';
import ScheduleCard from './components/ScheduleCard';

const SCHEDULE_ITEMS = [
  {
    id: 1,
    doctor: 'Dr. Sarah Johnson',
    date: '4/27/2026',
    time: '9:00 PM - 9:20 PM',
  },
  {
    id: 2,
    doctor: 'Dr. Sarah Johnson',
    date: '4/27/2026',
    time: '9:00 PM - 9:20 PM',
  },
  {
    id: 3,
    doctor: 'Dr. Sarah Johnson',
    date: '4/27/2026',
    time: '9:00 PM - 9:20 PM',
  },
  {
    id: 4,
    doctor: 'Dr. Sarah Johnson',
    date: '4/27/2026',
    time: '9:00 PM - 9:20 PM',
  },
];

const UserDashboard = () => {
  const { t } = useTranslation();
  const user = useSelector(selectUser);

  return (
    <section className='space-y-8'>
      <header className='space-y-2'>
        <h1 className='dashboard-page-title'>{t('dashboard.user.title')}</h1>
        <p className='dashboard-page-subtitle text-base'>
          {t('dashboard.user.subtitle')}
        </p>
      </header>

      <div className='w-full max-w-2xl rounded-xl bg-white p-6 shadow-[0px_1px_8px_rgba(0,0,0,0.05)] md:p-8'>
        <div className='space-y-6'>
          <div className='flex items-center gap-3'>
            <Wallet size={22} className='text-[#191919]' aria-hidden='true' />
            <h2 className='text-2xl font-semibold text-[#0c0c0c]'>
              {t('dashboard.user.walletBalance.title')}
            </h2>
          </div>

          <div className='rounded-2xl bg-[#f1ebf7] px-6 py-5'>
            <p className='text-xl text-[#4c515b]'>{t('dashboard.user.walletBalance.availableMinutes')}</p>
            <p className='mt-2 text-3xl font-semibold text-[#050609]'>
              {t('dashboard.user.walletBalance.minutesValue')}
            </p>
            <p className='mt-2 text-sm font-medium text-[#8e33ea]'>
              {t('dashboard.user.walletBalance.flatRate')}
            </p>
          </div>

          <button
            type='button'
            className='inline-flex w-full items-center justify-center rounded bg-[#E2AB0B] px-6 py-3 text-base font-medium text-white transition-colors hover:bg-[#cf9a00]'
          >
            {t('dashboard.user.buyCreditsButton')}
          </button>
        </div>
      </div>

      <section className='space-y-4'>
        <h2 className='text-2xl md:text-3xl font-semibold text-[#050609]'>
          {t('dashboard.user.upcomingSchedule')}
        </h2>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
          {SCHEDULE_ITEMS.map((item) => (
            <ScheduleCard
              key={item.id}
              doctor={item.doctor}
              date={item.date}
              time={item.time}
              status='Upcoming'
            />
          ))}
        </div>
      </section>

      <p className='sr-only'>Signed in user: {user?.name || 'User'}</p>
    </section>
  );
};

export default UserDashboard;
