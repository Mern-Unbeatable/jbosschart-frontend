import React, { memo, useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  User,
  ImagePlus,
  CalendarClock,
  Plus,
  Clock3,
  Trash2,
} from 'lucide-react';

const INITIAL_PROFILE = {
  name: 'John Industries',
  email: 'admin@johnindustries.com',
  phone: '+1 (555) 000-1122',
  about: 'Hello i am suima, I am a professional consultant...',
  expertise:
    'Consultant, Relation Advice, Career Guide, Personal Growth, Emotional Support',
  experience: '5 years experience',
  language: 'English, Dutch',
  location: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
  availabilityWindow: '9:00 AM - 3:00 PM',
};

const INITIAL_SLOTS = [
  {
    id: 1,
    day: 'Sunday',
    from: '09:00',
    to: '21:00',
  },
];

const INPUT_CLASS =
  'w-full h-12 rounded-lg border border-gray-100 px-4 text-sm text-[#1d1d1d] placeholder:text-[#989da1] focus:outline-none focus:ring-2 focus:ring-[#e2ab0b]';

const TEXTAREA_CLASS =
  'w-full rounded-lg border border-gray-100 px-4 py-3 text-sm text-[#1d1d1d] placeholder:text-[#989da1] focus:outline-none focus:ring-2 focus:ring-[#e2ab0b]';

const ConsultantProfile = memo(() => {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [passwordForm, setPasswordForm] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [slots, setSlots] = useState(INITIAL_SLOTS);

  const handleProfileChange = useCallback((field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handlePasswordChange = useCallback((field, value) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleAddTimeSlot = useCallback(() => {
    setSlots((prev) => [
      ...prev,
      { id: Date.now(), day: 'Sunday', from: '09:00', to: '21:00' },
    ]);
    toast.success('New time slot added.');
  }, []);

  const handleRemoveTimeSlot = useCallback((id) => {
    setSlots((prev) => prev.filter((slot) => slot.id !== id));
  }, []);

  const handleSlotChange = useCallback((id, field, value) => {
    setSlots((prev) =>
      prev.map((slot) => (slot.id === id ? { ...slot, [field]: value } : slot)),
    );
  }, []);

  const handleUpdateProfile = useCallback(() => {
    toast.success('Profile updated successfully.');
  }, []);

  const handleChangePassword = useCallback(() => {
    toast.success('Password updated successfully.');
    setPasswordForm({ newPassword: '', confirmPassword: '' });
  }, []);

  return (
    <section className='space-y-6'>
      <div className='space-y-2'>
        <h1 className='dashboard-page-title'>My Profile</h1>
        <p className='dashboard-page-subtitle'>
          Manage your account and store preferences.
        </p>
      </div>

      <div className='rounded-[20px] border border-gray-100 bg-white px-6 py-8 lg:px-10 lg:py-12'>
        <div className='space-y-8'>
          <div className='flex items-center gap-4'>
            <div className='flex size-22.25 items-center justify-center rounded-full bg-[#e9eaeb]'>
              <User size={54} className='text-[#8a8a8a]' />
            </div>
            <div>
              <h2 className='text-2xl font-semibold text-[#0c0c0c]'>Suima</h2>
              <p className='text-base text-[#464646]'>suimlt61799@gmail.com</p>
            </div>
          </div>

          <div className='space-y-6'>
            <h3 className='text-xl font-medium text-[#4c515b]'>
              Account Information
            </h3>

            <div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
              <div className='space-y-3'>
                <label
                  htmlFor='profile-name'
                  className='block text-base text-[#464646]'
                >
                  Name
                </label>
                <input
                  id='profile-name'
                  type='text'
                  value={profile.name}
                  onChange={(event) =>
                    handleProfileChange('name', event.target.value)
                  }
                  className={INPUT_CLASS}
                />
              </div>

              <div className='space-y-3'>
                <label
                  htmlFor='profile-email'
                  className='block text-base text-[#464646]'
                >
                  Email
                </label>
                <input
                  id='profile-email'
                  type='email'
                  value={profile.email}
                  onChange={(event) =>
                    handleProfileChange('email', event.target.value)
                  }
                  className={INPUT_CLASS}
                />
              </div>
            </div>

            <div className='space-y-3'>
              <label
                htmlFor='profile-phone'
                className='block text-base text-[#464646]'
              >
                Phone Number
              </label>
              <input
                id='profile-phone'
                type='text'
                value={profile.phone}
                onChange={(event) =>
                  handleProfileChange('phone', event.target.value)
                }
                className={INPUT_CLASS}
              />
            </div>

            <div className='space-y-3'>
              <label
                htmlFor='profile-about'
                className='block text-base text-[#464646]'
              >
                About Me
              </label>
              <textarea
                id='profile-about'
                rows={5}
                value={profile.about}
                onChange={(event) =>
                  handleProfileChange('about', event.target.value)
                }
                className={TEXTAREA_CLASS}
              />
            </div>

            <div className='space-y-2'>
              <p className='text-base text-black'>Upload Image</p>
              <button
                type='button'
                className='flex h-57 w-full items-center justify-center rounded-lg border border-gray-100 text-[#8a8a8a] transition-colors duration-200 hover:bg-[#f7f7f7]'
              >
                <ImagePlus size={62} />
              </button>
            </div>

            <div className='space-y-3'>
              <label
                htmlFor='profile-expertise'
                className='block text-base text-[#464646]'
              >
                Areas Of Expertise
              </label>
              <textarea
                id='profile-expertise'
                rows={5}
                value={profile.expertise}
                onChange={(event) =>
                  handleProfileChange('expertise', event.target.value)
                }
                className={TEXTAREA_CLASS}
              />
            </div>

            <div className='grid grid-cols-1 gap-5 lg:grid-cols-3'>
              <div className='space-y-3'>
                <label
                  htmlFor='profile-experience'
                  className='block text-base text-[#464646]'
                >
                  Experience
                </label>
                <input
                  id='profile-experience'
                  type='text'
                  value={profile.experience}
                  onChange={(event) =>
                    handleProfileChange('experience', event.target.value)
                  }
                  className={INPUT_CLASS}
                />
              </div>

              <div className='space-y-3'>
                <label
                  htmlFor='profile-language'
                  className='block text-base text-[#464646]'
                >
                  Language
                </label>
                <input
                  id='profile-language'
                  type='text'
                  value={profile.language}
                  onChange={(event) =>
                    handleProfileChange('language', event.target.value)
                  }
                  className={INPUT_CLASS}
                />
              </div>

              <div className='space-y-3'>
                <label
                  htmlFor='profile-location'
                  className='block text-base text-[#464646]'
                >
                  Location
                </label>
                <input
                  id='profile-location'
                  type='text'
                  value={profile.location}
                  onChange={(event) =>
                    handleProfileChange('location', event.target.value)
                  }
                  className={INPUT_CLASS}
                />
              </div>
            </div>

            <div className='space-y-4'>
              <div className='flex items-center justify-between gap-3'>
                <div className='flex items-center gap-2 text-sm font-medium text-[#4a5565]'>
                  <CalendarClock size={14} />
                  <span>Availability</span>
                </div>

                <button
                  type='button'
                  onClick={handleAddTimeSlot}
                  className='inline-flex h-8 items-center gap-1.5 rounded-md bg-[#6e35ae] px-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#5f2f98]'
                >
                  <Plus size={12} />
                  Add Time Slot
                </button>
              </div>

              <div className='space-y-3'>
                {slots.map((slot) => (
                  <div
                    key={slot.id}
                    className='flex flex-col gap-3 lg:flex-row lg:items-center'
                  >
                    <div className='lg:min-w-0 lg:flex-1'>
                      <input
                        type='text'
                        value={slot.day}
                        onChange={(event) =>
                          handleSlotChange(slot.id, 'day', event.target.value)
                        }
                        className='h-10 w-full rounded-lg border border-[#b9b9b9] px-3 text-sm text-[#1d1d1d] focus:outline-none focus:ring-2 focus:ring-[#e2ab0b]'
                      />
                    </div>

                    <div className='relative  lg:w-38 lg:shrink-0'>
                      <input
                        type='time'
                        value={slot.from}
                        onChange={(event) =>
                          handleSlotChange(slot.id, 'from', event.target.value)
                        }
                        step='900'
                        className='h-10  w-full rounded-lg border border-[#b9b9b9] px-3 text-sm text-[#1d1d1d] focus:outline-none focus:ring-2 focus:ring-[#e2ab0b]'
                      />
                    </div>

                    <span className='hidden text-sm text-[#616874] lg:block'>
                      -
                    </span>

                    <div className='relative lg:w-38 lg:shrink-0'>
                      <input
                        type='time'
                        value={slot.to}
                        onChange={(event) =>
                          handleSlotChange(slot.id, 'to', event.target.value)
                        }
                        step='900'
                        className='h-10 w-full rounded-lg border border-[#b9b9b9] px-3 text-sm text-[#1d1d1d] focus:outline-none focus:ring-2 focus:ring-[#e2ab0b]'
                      />
                    </div>

                    <button
                      type='button'
                      onClick={() => handleRemoveTimeSlot(slot.id)}
                      className='mx-auto p-0.5 text-[#ef4444] transition-colors duration-200 hover:text-[#dc2626] lg:mx-0 lg:ml-2 lg:shrink-0'
                      aria-label='Remove time slot'
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='flex justify-end pt-1'>
            <button
              type='button'
              onClick={handleUpdateProfile}
              className='h-8 rounded bg-[#E2AB0B] px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#ce9c0a]'
            >
              Update Profile
            </button>
          </div>

          <div className='space-y-6'>
            <h3 className='text-xl font-medium text-[#4c515b]'>
              Change Password
            </h3>

            <div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
              <div className='space-y-3'>
                <label
                  htmlFor='new-password'
                  className='block text-base text-[#464646]'
                >
                  New Password
                </label>
                <input
                  id='new-password'
                  type='password'
                  value={passwordForm.newPassword}
                  onChange={(event) =>
                    handlePasswordChange('newPassword', event.target.value)
                  }
                  placeholder='..........'
                  className={INPUT_CLASS}
                />
              </div>

              <div className='space-y-3'>
                <label
                  htmlFor='confirm-password'
                  className='block text-base text-[#464646]'
                >
                  Confirm New Password
                </label>
                <input
                  id='confirm-password'
                  type='password'
                  value={passwordForm.confirmPassword}
                  onChange={(event) =>
                    handlePasswordChange('confirmPassword', event.target.value)
                  }
                  placeholder='.........'
                  className={INPUT_CLASS}
                />
              </div>
            </div>
          </div>

          <div className='flex justify-end'>
            <button
              type='button'
              onClick={handleChangePassword}
              className='h-8 rounded bg-[#E2AB0B] px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#ce9c0a]'
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

ConsultantProfile.displayName = 'ConsultantProfile';

export default ConsultantProfile;
