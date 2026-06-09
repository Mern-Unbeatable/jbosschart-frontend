import React, { memo, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

const BookScheduleModal = memo(({ isOpen, onClose, consultant }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 4)); // May 2025

  const timeSlots = [
    '09:30 PM - 10:00 PM',
    '10:30 PM - 11:00 PM',
    '11:30 PM - 12:00 AM',
    '01:00 AM - 1:30 AM',
    '01:30 AM - 1:40 AM',
    '01:40 AM - 2:00 AM',
    '02:00 AM - 2:30 AM',
    '02:00 AM - 2:30 AM',
    '02:00 AM - 2:30 AM',
  ];

  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const monthName = currentMonth.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  const renderCalendar = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className='text-gray-300 text-center py-2'>
          {new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            -i,
          ).getDate()}
        </div>,
      );
    }

    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate === day;
      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(day)}
          className={`py-2 rounded-lg font-semibold transition-all ${
            isSelected
              ? 'bg-yellow-400 text-gray-900'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {day}
        </button>,
      );
    }

    // Add empty cells for days after month ends
    const totalCells = days.length;
    for (let i = 1; totalCells + i <= 35; i++) {
      days.push(
        <div key={`after-${i}`} className='text-gray-300 text-center py-2'>
          {i}
        </div>,
      );
    }

    return days;
  };

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      toast.success(
        `Booking confirmed for ${consultant.name} on May ${selectedDate}, 2025 at ${selectedTime}`,
        { position: 'top-center' },
      );
      setTimeout(() => {
        onClose();
        setSelectedDate(null);
        setSelectedTime(null);
      }, 1500);
    } else {
      toast.error('Please select both a date and time', {
        position: 'top-center',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-modal-overlay'>
      <div className='bg-white rounded-2xl p-8 w-full max-w-2xl shadow-2xl animate-modal-panel'>
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
        >
          <X size={24} />
        </button>

        <h2 className='text-2xl font-bold text-gray-800 mb-8'>
          Book A Schedule
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Calendar Section */}
          <div>
            <h3 className='text-lg font-bold text-gray-800 mb-4'>
              Available Date
            </h3>

            {/* Month Navigation */}
            <div className='flex items-center justify-between mb-6'>
              <button
                onClick={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() - 1,
                    ),
                  )
                }
                className='p-2 hover:bg-gray-100 rounded'
              >
                <ChevronLeft size={20} className='text-gray-600' />
              </button>
              <h4 className='text-lg font-semibold text-gray-800'>
                {monthName}
              </h4>
              <button
                onClick={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() + 1,
                    ),
                  )
                }
                className='p-2 hover:bg-gray-100 rounded'
              >
                <ChevronRight size={20} className='text-gray-600' />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className='bg-gray-50 p-4 rounded-lg'>
              {/* Day Headers */}
              <div className='grid grid-cols-7 gap-2 mb-2'>
                {['SUN', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA'].map((day) => (
                  <div
                    key={day}
                    className='text-center text-xs font-bold text-gray-500 py-2'
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Days Grid */}
              <div className='grid grid-cols-7 gap-2'>{renderCalendar()}</div>
            </div>
          </div>

          {/* Time Slots Section */}
          <div>
            <h3 className='text-lg font-bold text-gray-800 mb-4'>
              AvailableTime
            </h3>

            <div className='space-y-2 max-h-96 overflow-y-auto'>
              {timeSlots.map((time, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedTime(time)}
                  className={`w-full px-4 py-3 rounded-lg font-medium text-center transition-all ${
                    selectedTime === time
                      ? 'bg-yellow-300 text-gray-900 border-2 border-yellow-400'
                      : 'bg-yellow-50 text-gray-800 border-2 border-yellow-200 hover:border-yellow-300'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Book Schedule Button */}
        <button
          onClick={handleBooking}
          className='w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg mt-8 text-lg transition-all'
        >
          Book Schedule
        </button>
      </div>
    </div>
  );
});

BookScheduleModal.displayName = 'BookScheduleModal';

export default BookScheduleModal;
