import React from 'react';
import { useTranslation } from 'react-i18next';
import { User } from 'lucide-react';

const UserProfile = () => {
  const { t } = useTranslation();
  return (
    <section className='space-y-6'>
      <header className='space-y-2'>
        <h1 className='dashboard-page-title'>{t('dashboard.user.profile.title')}</h1>
        <p className='dashboard-page-subtitle'>
          {t('dashboard.user.profile.subtitle')}
        </p>
      </header>

      <div className='space-y-6'>
        <section className='rounded-[20px] border border-gray-100 bg-white px-5 py-8 md:px-10 md:py-12'>
          <div className='space-y-8'>
            <div className='flex items-center gap-4'>
              <div className='flex h-22.25 w-22.25 items-center justify-center rounded-full bg-[#e9eaeb] text-[#616874]'>
                <User size={52} aria-hidden='true' />
              </div>
              <div>
                <p className='text-3xl font-semibold text-[#0c0c0c]'>Suima</p>
                <p className='text-base text-[#464646]'>
                  suimlt61799@gmail.com
                </p>
              </div>
            </div>

            <div className='space-y-6'>
              <h2 className='text-2xl font-medium text-[#4c515b]'>
                {t('dashboard.user.profile.accountInformationTitle')}
              </h2>

              <div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
                <label className='space-y-3'>
                  <span className='block text-base text-[#464646]'>
                    {t('dashboard.user.profile.usernameLabel')}
                  </span>
                  <input
                    type='text'
                    defaultValue='John Industries'
                    className='h-12 w-full rounded-lg border border-gray-100 px-4 text-sm text-[#4c515b] placeholder:text-[#989da1] outline-none transition-colors focus:border-[#e2ab0b]'
                  />
                </label>

                <label className='space-y-3'>
                  <span className='block text-base text-[#464646]'>{t('dashboard.user.profile.emailLabel')}</span>
                  <input
                    type='email'
                    defaultValue='admin@johnindustries.com'
                    className='h-12 w-full rounded-lg border border-gray-100 px-4 text-sm text-[#4c515b] placeholder:text-[#989da1] outline-none transition-colors focus:border-[#e2ab0b]'
                  />
                </label>
              </div>

              <label className='space-y-3 block'>
                <span className='block text-baes text-[#464646]'>
                  {t('dashboard.user.profile.phoneLabel')}
                </span>
                <input
                  type='tel'
                  defaultValue='+1 (555) 000-1122'
                  className='h-12 w-full rounded-lg border border-gray-100 px-4 text-sm text-[#4c515b] placeholder:text-[#989da1] outline-none transition-colors focus:border-[#e2ab0b]'
                />
              </label>
            </div>
          </div>

          <div className='mt-6 flex justify-end'>
            <button
              type='button'
              className='rounded bg-[#E2AB0B] px-6 py-3 text-base text-white transition-colors hover:bg-[#cb9800]'
            >
              {t('dashboard.user.profile.updateProfileButton')}
            </button>
          </div>
        </section>

        <section className='rounded-[20px] border border-gray-100 bg-white px-5 py-8 md:px-10 md:py-12'>
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-[#4c515b]'>
              {t('dashboard.user.profile.changePasswordTitle')}
            </h2>

            <div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
              <label className='space-y-3'>
                <span className='block text-base text-[#464646]'>
                  {t('dashboard.user.profile.newPasswordLabel')}
                </span>
                <input
                  type='password'
                  placeholder='.........'
                  className='h-12 w-full rounded-lg border border-gray-100 px-4 text-sm text-[#4c515b] placeholder:text-[#989da1] outline-none transition-colors focus:border-[#e2ab0b]'
                />
              </label>

              <label className='space-y-3'>
                <span className='block text-base text-[#464646]'>
                  {t('dashboard.user.profile.confirmPasswordLabel')}
                </span>
                <input
                  type='password'
                  placeholder='.........'
                  className='h-12 w-full rounded-lg border border-gray-100 px-4 text-sm text-[#4c515b] placeholder:text-[#989da1] outline-none transition-colors focus:border-[#e2ab0b]'
                />
              </label>
            </div>
          </div>
          <div className='mt-6 flex justify-end'>
            <button
              type='button'
              className='rounded bg-[#E2AB0B] px-6 py-3 text-base text-white transition-colors hover:bg-[#cb9800]'
            >
              {t('dashboard.user.profile.updatePasswordButton')}
            </button>
          </div>
        </section>
      </div>
    </section>
  );
};

export default UserProfile;
