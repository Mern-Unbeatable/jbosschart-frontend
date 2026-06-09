import React, { useState } from 'react';
import { ChevronRight, MessageSquare } from 'lucide-react';
import TicketDetailModal from './TicketDetailModal';

const RECENT_TICKETS = [
  {
    id: 'TK-8829',
    title: 'Issue with Stripe Payout Synchronization',
    meta: 'ID: #TK-8829 • Opened Oct 12, 2023',
    status: 'Open',
  },
  {
    id: 'TK-8712',
    title: 'Request for Profile Badge Verification',
    meta: 'ID: #TK-8712 • Resolved Sep 28, 2023',
    status: 'Resolved',
  },
];

const statusStyles = {
  Open: 'bg-[#f0e8ff] text-[#8b5cf6]',
  Resolved: 'bg-[#ececf6] text-[#6b7280]',
};

const RecentTicketsSection = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenTicket = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTicket(null), 300);
  };

  return (
    <>
      <section className='space-y-4'>
        <h2 className='text-xl font-semibold text-[#2f2f2f] sm:text-2xl'>
          Recent Support Tickets
        </h2>

        <div className='space-y-3'>
          {RECENT_TICKETS.map((ticket) => (
            <button
              key={ticket.id}
              type='button'
              onClick={() => handleOpenTicket(ticket)}
              className='w-full text-left transition-all'
            >
              <div className='flex items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white px-4 py-4 shadow-[0_1px_8px_rgba(15,23,42,0.04)]'>
                <div className='flex min-w-0 items-start gap-3'>
                  <div className='mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f2ecfb] text-[#7a5ab6]'>
                    <MessageSquare size={18} aria-hidden='true' />
                  </div>
                  <div className='min-w-0'>
                    <h3 className='truncate text-base font-semibold text-[#2f2f2f] sm:text-base'>
                      {ticket.title}
                    </h3>
                    <p className='mt-1 text-sm text-gray-400 sm:text-sm'>{ticket.meta}</p>
                  </div>
                </div>

                <div className='flex shrink-0 items-center gap-3'>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusStyles[ticket.status]}`}
                  >
                    {ticket.status}
                  </span>
                  <ChevronRight size={24} className='text-gray-400' aria-hidden='true' />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <TicketDetailModal ticket={selectedTicket} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default RecentTicketsSection;