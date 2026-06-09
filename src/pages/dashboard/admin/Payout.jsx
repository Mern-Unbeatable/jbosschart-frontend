import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { MoreVertical } from 'lucide-react';
import { gsap } from 'gsap';

const PAGE_SIZE = 7;

const INITIAL_PAYOUTS = [
  {
    id: 1,
    name: 'Kathryn Murphy',
    email: 'deanna.curtis@example.com',
    phone: '(208) 555-0112',
    accountNumber: '4587 2291 6034',
    status: 'Completed',
  },
  {
    id: 2,
    name: 'Savannah Nguyen',
    email: 'jackson.graham@example.com',
    phone: '(405) 555-0128',
    accountNumber: '7312 8845 1096',
    status: 'Pending',
  },
  {
    id: 3,
    name: 'Cameron Williamson',
    email: 'nathan.roberts@example.com',
    phone: '(229) 555-0109',
    accountNumber: '6021 4478 3350',
    status: 'Completed',
  },
  {
    id: 4,
    name: 'Cameron Williamson',
    email: 'nathan.roberts@example.com',
    phone: '(229) 555-0109',
    accountNumber: '9140 2267 5813',
    status: 'Completed',
  },
  {
    id: 5,
    name: 'Cameron Williamson',
    email: 'nathan.roberts@example.com',
    phone: '(229) 555-0109',
    accountNumber: '3874 1105 7629',
    status: 'Completed',
  },
  {
    id: 6,
    name: 'Cameron Williamson',
    email: 'nathan.roberts@example.com',
    phone: '(229) 555-0109',
    accountNumber: '2459 6681 4307',
    status: 'Completed',
  },
  {
    id: 7,
    name: 'Cameron Williamson',
    email: 'nathan.roberts@example.com',
    phone: '(229) 555-0109',
    accountNumber: '5568 9024 1742',
    status: 'Completed',
  },
];

const STATUS_STYLES = {
  Completed: 'bg-[#EEFFF1] text-[#05BC27]',
  Pending: 'bg-[#FFFBEE] text-[#E2AB0B]',
};

function ActionsDropdown({ anchorEl, onClose, onMarkComplete, onMarkPending }) {
  const dropRef = useRef(null);

  useEffect(() => {
    if (!anchorEl || !dropRef.current) return;
    const rect = anchorEl.getBoundingClientRect();
    const el = dropRef.current;
    el.style.top = `${rect.bottom + window.scrollY + 4}px`;
    el.style.left = `${rect.right + window.scrollX - el.offsetWidth}px`;
    gsap.fromTo(
      el,
      { opacity: 0, y: -6 },
      { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' },
    );
    const handleOutside = (e) => {
      if (!el.contains(e.target) && e.target !== anchorEl) onClose();
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [anchorEl, onClose]);

  if (!anchorEl) return null;

  return createPortal(
    <div
      ref={dropRef}
      className='fixed z-50 bg-white rounded-md shadow-lg border border-[#E4E4E4] overflow-hidden w-26 opacity-0'
      style={{ position: 'absolute' }}
    >
      <div className='px-3 py-2 text-sm text-[#9CA3AF] bg-[#F6FBFF]'>
        Checkmark
      </div>
      <button
        type='button'
        aria-label='Mark payout as complete'
        onClick={onMarkComplete}
        className='w-full text-left px-3 py-2 text-sm text-white bg-[#E2AB0B] hover:brightness-95 transition-colors'
      >
        Complete
      </button>
      <button
        type='button'
        aria-label='Mark payout as pending'
        onClick={onMarkPending}
        className='w-full text-left px-3 py-2 text-sm text-[#333333] hover:bg-gray-50 transition-colors'
      >
        Pending
      </button>
    </div>,
    document.body,
  );
}

export default function Payout() {
  const pageRef = useRef(null);
  const actionAnchorRefs = useRef({});

  const [payouts, setPayouts] = useState(INITIAL_PAYOUTS);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const activePayoutId =
    typeof openDropdownId === 'string'
      ? Number(openDropdownId.replace('m-', ''))
      : openDropdownId;

  useEffect(() => {
    if (!pageRef.current) return;
    const revealBlocks = pageRef.current.querySelectorAll('[data-reveal]');
    gsap.fromTo(
      revealBlocks,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.08 },
    );
  }, []);

  const totalPages = Math.max(1, Math.ceil(payouts.length / PAGE_SIZE));
  const pageStart =
    payouts.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const pageEnd = Math.min(currentPage * PAGE_SIZE, payouts.length);

  const visiblePayouts = useMemo(
    () => payouts.slice(pageStart - 1, pageEnd),
    [payouts, pageStart, pageEnd],
  );

  const handlePrev = useCallback(() => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  }, [totalPages]);

  const handleOpenDropdown = useCallback((id) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  }, []);

  const handleCloseDropdown = useCallback(() => {
    setOpenDropdownId(null);
  }, []);

  const handleStatusChange = useCallback((id, status) => {
    setPayouts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item)),
    );
    setOpenDropdownId(null);
  }, []);

  return (
    <div ref={pageRef} className='flex flex-col gap-8'>
      <div data-reveal>
        <h1
          className='text-3xl sm:text-4xl font-semibold text-[#050609] leading-tight'
          style={{ fontFamily: "'Crimson Pro', serif" }}
        >
          Payouts Requested
        </h1>
        <p className='mt-1 text-sm sm:text-base text-[#464646] leading-6'>
          Overview &amp; management of your platform.
        </p>
      </div>

      <div
        data-reveal
        className='bg-white rounded-xl border border-black/10 overflow-hidden'
      >
        <div className='hidden sm:block overflow-x-auto'>
          <table className='w-full min-w-250'>
            <thead>
              <tr className='bg-[#F6FBFF]'>
                <th className='px-4 py-3 text-left text-base font-medium text-[#050609]'>
                  Name
                </th>
                <th className='px-4 py-3 text-left text-base font-medium text-[#050609]'>
                  Email
                </th>
                <th className='px-4 py-3 text-left text-base font-medium text-[#050609]'>
                  Phone Number
                </th>
                <th className='px-4 py-3 text-left text-base font-medium text-[#050609] whitespace-nowrap'>
                  Account Number
                </th>
                <th className='px-4 py-3 text-left text-base font-medium text-[#050609]'>
                  Status
                </th>
                <th className='w-25 px-4 py-3 text-left text-base font-medium text-[#050609]'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {visiblePayouts.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className='px-4 py-12 text-center text-base text-[#545454]'
                  >
                    No payouts found.
                  </td>
                </tr>
              ) : (
                visiblePayouts.map((row) => (
                  <tr
                    key={row.id}
                    className='border-b border-[#E4E4E4] last:border-b-0'
                  >
                    <td className='px-4 py-4 text-base text-[#0C0C0C]'>
                      {row.name}
                    </td>
                    <td className='px-4 py-4 text-base text-[#0C0C0C] break-all'>
                      {row.email}
                    </td>
                    <td className='px-4 py-4 text-base text-[#373737]'>
                      {row.phone}
                    </td>
                    <td className='px-4 py-4 text-base text-[#0C0C0C] whitespace-nowrap'>
                      {row.accountNumber}
                    </td>
                    <td className='px-4 py-4'>
                      <span
                        className={`inline-flex items-center justify-center px-4 py-0.5 rounded-full text-sm font-medium ${
                          STATUS_STYLES[row.status] ??
                          'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className='w-25 px-4 py-4'>
                      <button
                        type='button'
                        aria-label={`Payout actions for ${row.name}`}
                        ref={(el) => {
                          actionAnchorRefs.current[row.id] = el;
                        }}
                        onClick={() => handleOpenDropdown(row.id)}
                        className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-[#333333]'
                      >
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className='sm:hidden divide-y divide-gray-100'>
          {visiblePayouts.length === 0 ? (
            <p className='py-12 text-center text-base text-[#545454]'>
              No payouts found.
            </p>
          ) : (
            visiblePayouts.map((row) => (
              <div
                key={`m-${row.id}`}
                className='px-4 py-4 flex items-start justify-between gap-3'
              >
                <div className='min-w-0 flex flex-col gap-1.5'>
                  <p className='text-base font-semibold text-[#0C0C0C]'>
                    {row.name}
                  </p>
                  <p className='text-base text-[#0C0C0C] break-all'>
                    {row.email}
                  </p>
                  <p className='text-base text-[#373737]'>{row.phone}</p>
                  <p className='text-base text-[#0C0C0C]'>
                    <span className='font-medium'>Account Number:</span>{' '}
                    {row.accountNumber}
                  </p>
                  <div>
                    <span
                      className={`inline-flex items-center justify-center px-4 py-0.5 rounded-full text-sm font-medium ${
                        STATUS_STYLES[row.status] ?? 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {row.status}
                    </span>
                  </div>
                </div>
                <div className='shrink-0'>
                  <button
                    type='button'
                    aria-label={`Payout actions for ${row.name}`}
                    ref={(el) => {
                      actionAnchorRefs.current[`m-${row.id}`] = el;
                    }}
                    onClick={() => handleOpenDropdown(`m-${row.id}`)}
                    className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-[#333333]'
                  >
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className='flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-between px-5 py-4 gap-3 border-t border-[#F0F0F0]'>
          <p className='text-base font-medium text-[#E2AB0B]'>
            Showing {pageStart} to {pageEnd} of {payouts.length} results
          </p>
          <div className='flex items-center gap-2'>
            <button
              type='button'
              aria-label='Previous page'
              onClick={handlePrev}
              disabled={currentPage === 1}
              className='px-5 py-1.5 rounded-lg border border-[#E2AB0B] text-base text-[#E2AB0B] bg-white hover:bg-[#FCF7E7] disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
            >
              Previous
            </button>
            <button
              type='button'
              aria-label='Next page'
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className='px-5 py-1.5 rounded-lg border border-[#E2AB0B] text-base text-[#E2AB0B] bg-white hover:bg-[#FCF7E7] disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {openDropdownId !== null && (
        <ActionsDropdown
          anchorEl={actionAnchorRefs.current[openDropdownId]}
          onClose={handleCloseDropdown}
          onMarkComplete={() => handleStatusChange(activePayoutId, 'Completed')}
          onMarkPending={() => handleStatusChange(activePayoutId, 'Pending')}
        />
      )}
    </div>
  );
}
