import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { gsap } from 'gsap';

const TABS = ['All', 'Phone', 'Video', 'Chat'];
const PAGE_SIZE = 7;

const SESSION_ROWS = [
  {
    id: 1,
    consultantName: 'Theresa Webb',
    clientName: 'John Doe',
    type: 'Video',
    duration: '45 mins',
    earnings: '$45.00',
    date: 'Apr 24, 2024',
    status: 'Completed',
  },
  {
    id: 2,
    consultantName: 'Guy Hawkins',
    clientName: 'John Doe',
    type: 'Phone',
    duration: '30 mins',
    earnings: '$30.00',
    date: 'Apr 23, 2024',
    status: 'Completed',
  },
  {
    id: 3,
    consultantName: 'Robert Fox',
    clientName: 'John Doe',
    type: 'Video',
    duration: '60 mins',
    earnings: '$60.00',
    date: 'Apr 22, 2024',
    status: 'Completed',
  },
  {
    id: 4,
    consultantName: 'Bessie Cooper',
    clientName: 'John Doe',
    type: 'Chat',
    duration: '25 mins',
    earnings: '$25.00',
    date: 'Apr 21, 2024',
    status: 'Completed',
  },
  {
    id: 5,
    consultantName: 'Devon Lane',
    clientName: 'John Doe',
    type: 'Video',
    duration: '50 mins',
    earnings: '$50.00',
    date: 'Apr 20, 2024',
    status: 'Completed',
  },
  {
    id: 6,
    consultantName: 'Devon Lane',
    clientName: 'John Doe',
    type: 'Phone',
    duration: '50 mins',
    earnings: '$50.00',
    date: 'Apr 20, 2024',
    status: 'Completed',
  },
  {
    id: 7,
    consultantName: 'Aubrey Green',
    clientName: 'John Doe',
    type: 'Video',
    duration: '40 mins',
    earnings: '$40.00',
    date: 'Apr 19, 2024',
    status: 'Completed',
  },
];

export default function Session() {
  const pageRef = useRef(null);
  const [activeTab, setActiveTab] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const getTypeColor = useCallback((type) => {
    if (type === 'Video') return 'text-[#6E35AE]';
    if (type === 'Phone') return 'text-[#E2AB0B]';
    if (type === 'Chat') return 'text-[#0C0C0C]';
    return 'text-[#0C0C0C]';
  }, []);

  useEffect(() => {
    if (!pageRef.current) return;
    const revealBlocks = pageRef.current.querySelectorAll('[data-reveal]');
    gsap.fromTo(
      revealBlocks,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.08 },
    );
  }, []);

  const filteredRows = useMemo(() => {
    if (activeTab === 'All') return SESSION_ROWS;
    return SESSION_ROWS.filter((row) => row.type === activeTab);
  }, [activeTab]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  const pageStart =
    filteredRows.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const pageEnd = Math.min(currentPage * PAGE_SIZE, filteredRows.length);
  const visibleRows = filteredRows.slice(pageStart - 1, pageEnd);

  const handleTabClick = useCallback((tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  }, [totalPages]);

  return (
    <div ref={pageRef} className='flex flex-col gap-8'>
      <div data-reveal>
        <h1
          className='text-3xl sm:text-4xl font-semibold text-[#050609] leading-tight'
          style={{ fontFamily: "'Crimson Pro', serif" }}
        >
          Sessions
        </h1>
        <p className='mt-1 text-sm sm:text-base text-[#464646] leading-6'>
          Track consultant sessions, duration, and earnings.
        </p>
      </div>

      <div
        data-reveal
        className='grid grid-cols-4 sm:flex sm:flex-wrap items-center gap-2 bg-white border border-[#E8E8E8] rounded-lg px-2 py-2 w-full sm:w-fit'
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            type='button'
            aria-label={`Filter by ${tab}`}
            onClick={() => handleTabClick(tab)}
            className={`w-full sm:w-auto px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium text-center transition-colors ${
              activeTab === tab
                ? 'bg-[#F3F3F5] text-[#545454]'
                : 'text-[#333333] hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div
        data-reveal
        className='bg-white rounded-xl border border-black/10 overflow-hidden'
      >
        <div className='hidden sm:block overflow-x-auto'>
          <table className='w-full min-w-245'>
            <thead>
              <tr className='bg-[#F6FBFF]'>
                <th className='px-4 py-3 text-left text-base font-medium text-[#050609]'>
                  Consultant Name
                </th>
                <th className='px-4 py-3 text-left text-base font-medium text-[#050609]'>
                  Client Name
                </th>
                <th className='px-4 py-3 text-left text-base font-medium text-[#050609]'>
                  Type
                </th>
                <th className='px-4 py-3 text-left text-base font-medium text-[#050609]'>
                  Duration
                </th>
                <th className='px-4 py-3 text-left text-base font-medium text-[#050609]'>
                  Earnings
                </th>
                <th className='px-4 py-3 text-left text-base font-medium text-[#050609]'>
                  Date
                </th>
                <th className='px-4 py-3 text-left text-base font-medium text-[#050609]'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className='px-4 py-12 text-center text-base text-[#545454]'
                  >
                    No sessions found.
                  </td>
                </tr>
              ) : (
                visibleRows.map((row) => (
                  <tr
                    key={row.id}
                    className='border-b border-[#E4E4E4] last:border-b-0'
                  >
                    <td className='px-4 py-4 text-base text-[#0C0C0C]'>
                      {row.consultantName}
                    </td>
                    <td className='px-4 py-4 text-base text-[#0C0C0C]'>
                      {row.clientName}
                    </td>
                    <td
                      className={`px-4 py-4 text-base font-medium ${getTypeColor(row.type)}`}
                    >
                      {row.type}
                    </td>
                    <td className='px-4 py-4 text-base text-[#373737]'>
                      {row.duration}
                    </td>
                    <td className='px-4 py-4 text-base text-[#0C0C0C]'>
                      {row.earnings}
                    </td>
                    <td className='px-4 py-4 text-base text-[#373737]'>
                      {row.date}
                    </td>
                    <td className='px-4 py-4'>
                      <span className='inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium bg-[#EDFFF2] text-[#07BC27]'>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className='sm:hidden divide-y divide-gray-100'>
          {visibleRows.length === 0 ? (
            <p className='py-12 text-center text-base text-[#545454]'>
              No sessions found.
            </p>
          ) : (
            visibleRows.map((row) => (
              <div key={row.id} className='px-4 py-4 flex flex-col gap-1.5'>
                <p className='text-base font-semibold text-[#0C0C0C]'>
                  {row.consultantName}
                </p>
                <p className='text-base text-[#0C0C0C]'>{row.clientName}</p>
                <p
                  className={`text-base font-medium ${getTypeColor(row.type)}`}
                >
                  {row.type}
                </p>
                <p className='text-base text-[#373737]'>{row.duration}</p>
                <p className='text-base text-[#0C0C0C]'>{row.earnings}</p>
                <p className='text-base text-[#373737]'>{row.date}</p>
                <div>
                  <span className='inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium bg-[#EDFFF2] text-[#07BC27]'>
                    {row.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className='flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-between px-5 py-4 gap-3 border-t border-[#F0F0F0]'>
          <p className='text-base font-medium text-[#E2AB0B]'>
            Showing {pageStart} to {pageEnd} of {filteredRows.length} results
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
    </div>
  );
}
