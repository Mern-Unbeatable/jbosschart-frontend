import React, { useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  MoreVertical,
  Euro,
  Users,
  Building2,
  X,
  Download,
} from 'lucide-react';
import { gsap } from 'gsap';

const PAGE_SIZE = 6;
const ACTION_MENU_WIDTH = 148;
const ACTION_MENU_HEIGHT = 96;
const VIEWPORT_GAP = 12;

const DONOR_TYPE_STYLES = {
  Individual: 'text-[#6E35AE]',
  Business: 'text-[#E2AB0B]',
};

const STAT_CARDS = [
  {
    label: 'Total Donations',
    value: '€11,417.00',
    Icon: Euro,
    gradient: 'linear-gradient(135deg, #05DF72 0%, #00A63E 100%)',
  },
  {
    label: 'Total Donors',
    value: '50',
    Icon: Users,
    gradient: 'linear-gradient(135deg, #51A2FF 0%, #155DFC 100%)',
  },
  {
    label: 'Business Donors',
    value: '35',
    Icon: Building2,
    gradient: 'linear-gradient(135deg, #C27AFF 0%, #9810FA 100%)',
  },
];

const INITIAL_DONORS = [
  {
    id: 1,
    name: 'Bessie Cooper',
    email: 'alma.lawson@example.com',
    phone: '(209) 555-0104',
    type: 'Individual',
    amount: '€250',
    date: '4/28/2026',
    fullDate: '4/28/2026, 10:12:44 AM',
    transactionId: 'DON00001',
    notes:
      'Happy to contribute to this wonderful cause. Keep up the great work!',
  },
  {
    id: 2,
    name: 'Courtney Henry',
    email: 'felicia.reid@example.com',
    phone: '(252) 555-0126',
    type: 'Business',
    amount: '€1,200',
    date: '4/28/2026',
    fullDate: '4/28/2026, 10:45:00 AM',
    transactionId: 'DON00002',
    businessName: 'Henry Solutions LLC',
    donationType: 'Online',
    description:
      'Supporting local community health initiatives and outreach programs.',
    website: 'https://henrysolutions.example.com',
    notes:
      'Proud to support this initiative as part of our corporate social responsibility.',
  },
  {
    id: 3,
    name: 'Albert Flores',
    email: 'michelle.rivera@example.com',
    phone: '(808) 555-0111',
    type: 'Individual',
    amount: '€369',
    date: '4/28/2026',
    fullDate: '4/28/2026, 11:05:20 AM',
    transactionId: 'DON00003',
    notes: 'Wishing the team all the best. This is a great mission.',
  },
  {
    id: 4,
    name: 'Dianne Russell',
    email: 'debra.holt@example.com',
    phone: '(316) 555-0116',
    type: 'Business',
    amount: '€2,500',
    date: '4/28/2026',
    fullDate: '4/28/2026, 11:31:32 AM',
    transactionId: 'DON00004',
    businessName: 'City Fitness Center',
    donationType: 'Online',
    description:
      'Innovative technology solutions for modern businesses and communities.',
    website: 'https://example-business5.com',
    notes: 'We believe in the power of community. Delighted to contribute.',
  },
  {
    id: 5,
    name: 'Ronald Richards',
    email: 'kent.lawson@example.com',
    phone: '(406) 555-0120',
    type: 'Individual',
    amount: '€180',
    date: '4/28/2026',
    fullDate: '4/28/2026, 12:00:00 PM',
    transactionId: 'DON00005',
    notes: 'Small contribution but given with all my heart. God bless.',
  },
  {
    id: 6,
    name: 'Arlene McCoy',
    email: 'jessica.hanson@example.com',
    phone: '(208) 555-0112',
    type: 'Business',
    amount: '€3,418',
    date: '4/28/2026',
    fullDate: '4/28/2026, 12:30:10 PM',
    transactionId: 'DON00006',
    businessName: 'McCoy Consulting Group',
    donationType: 'Offline',
    description:
      'Dedicated to empowering small businesses and entrepreneurs globally.',
    website: 'https://mccoyconsulting.example.com',
    notes:
      'Honored to be part of this initiative. Looking forward to more collaborations.',
  },
  {
    id: 7,
    name: 'Wade Warren',
    email: 'alma.obrien@example.com',
    phone: '(907) 555-0101',
    type: 'Individual',
    amount: '€500',
    date: '4/28/2026',
    fullDate: '4/28/2026, 1:15:55 PM',
    transactionId: 'DON00007',
    notes: 'Thank you for the amazing work you do. Sending love and support!',
  },
];

const TABLE_COLS = [
  { label: 'Name', width: 'flex-1' },
  { label: 'Email', width: 'flex-1' },
  { label: 'Phone Number', width: 'flex-1' },
  { label: 'Donor Type', width: 'flex-1' },
  { label: 'Amount (€)', width: 'flex-1' },
  { label: 'Date', width: 'flex-1' },
  { label: 'Actions', width: 'w-20' },
];

function DonationDetailModal({ donor, onClose }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' },
    );
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      ref={overlayRef}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-modal-overlay'
      onMouseDown={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        ref={panelRef}
        className='bg-white rounded-[10px] border border-[#E7F1F1] w-175 max-w-[95vw] max-h-[90vh] overflow-y-auto animate-modal-panel'
      >
        {/* Header */}
        <div className='flex items-center justify-between px-5 pt-5 pb-4'>
          <h2 className='text-2xl font-semibold text-[#212121]'>Details</h2>
          <button
            type='button'
            onClick={onClose}
            aria-label='Close details'
            className='w-9 h-9 flex items-center justify-center rounded-full bg-[#D9D9D9] hover:bg-gray-300 transition-colors shrink-0'
          >
            <X size={18} className='text-[#333]' />
          </button>
        </div>

        {/* Fields */}
        <div className='flex flex-col gap-4 px-5 pb-5'>
          {/* Full Name */}
          <div className='flex flex-col gap-1'>
            <p className='text-sm font-medium text-[#4A5565]'>Full Name</p>
            <p className='text-lg text-[#0A0A0A]'>{donor.name}</p>
          </div>
          {/* Email */}
          <div className='flex flex-col gap-1'>
            <p className='text-sm font-medium text-[#4A5565]'>Email</p>
            <p className='text-base text-[#0A0A0A]'>{donor.email}</p>
          </div>
          {/* Phone */}
          <div className='flex flex-col gap-1'>
            <p className='text-sm font-medium text-[#4A5565]'>Phone</p>
            <p className='text-base text-[#0A0A0A]'>{donor.phone}</p>
          </div>
          {/* Donor Type */}
          <div className='flex flex-col gap-1.5'>
            <p className='text-sm font-medium text-[#4A5565]'>Donor Type</p>
            <span
              style={{ background: '#030213' }}
              className='inline-flex items-center text-white text-xs font-medium px-2.25 py-0.75 rounded-lg w-fit'
            >
              {donor.type}
            </span>
          </div>
          {/* Business Name */}
          <div className='flex flex-col gap-1'>
            <p className='text-sm font-medium text-[#4A5565]'>Business Name</p>
            <p className='text-lg text-[#0A0A0A]'>
              {donor.businessName || '—'}
            </p>
          </div>
          {/* Donation Type */}
          <div className='flex flex-col gap-1.5'>
            <p className='text-sm font-medium text-[#4A5565]'>Type</p>
            {donor.donationType ? (
              <span
                style={{ background: '#030213' }}
                className='inline-flex items-center text-white text-xs font-medium px-2.25 py-0.75 rounded-lg w-fit capitalize'
              >
                {donor.donationType}
              </span>
            ) : (
              <p className='text-base text-[#0A0A0A]'>—</p>
            )}
          </div>
          {/* Description */}
          <div className='flex flex-col gap-1'>
            <p className='text-sm font-medium text-[#4A5565]'>Description</p>
            <p className='text-sm text-[#0A0A0A]'>{donor.description || '—'}</p>
          </div>
          {/* Website */}
          <div className='flex flex-col gap-1'>
            <p className='text-sm font-medium text-[#4A5565]'>Website</p>
            {donor.website ? (
              <a
                href={donor.website}
                target='_blank'
                rel='noopener noreferrer'
                className='text-base text-[#155DFC] hover:underline break-all'
              >
                {donor.website}
              </a>
            ) : (
              <p className='text-base text-[#0A0A0A]'>—</p>
            )}
          </div>
          {/* Amount */}
          <div className='flex flex-col gap-1'>
            <p className='text-sm font-medium text-[#4A5565]'>Amount</p>
            <p className='text-3xl text-[#0A0A0A]'>{donor.amount}</p>
          </div>
          {/* Date */}
          <div className='flex flex-col gap-1'>
            <p className='text-sm font-medium text-[#4A5565]'>Date</p>
            <p className='text-base text-[#0A0A0A]'>{donor.fullDate}</p>
          </div>
          {/* Transaction ID */}
          <div className='flex flex-col gap-1'>
            <p className='text-sm font-medium text-[#4A5565]'>Transaction ID</p>
            <p className='text-sm text-[#0A0A0A] font-mono'>
              {donor.transactionId}
            </p>
          </div>
          {/* Donation Note */}
          {donor.notes && (
            <div className='flex flex-col gap-1'>
              <p className='text-sm font-medium text-[#4A5565]'>
                Donation Note
              </p>
              <p className='text-sm text-[#0A0A0A]'>{donor.notes}</p>
            </div>
          )}
          {/* Proof image */}
          <div className='relative h-53.25 rounded-2xl overflow-hidden'>
            <img
              src='/images/donation-proof.jpg'
              alt='Donation proof'
              className='absolute inset-0 w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-black/53 rounded-2xl' />
            <button
              type='button'
              aria-label='Download image'
              className='absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-xl backdrop-blur-[2px] hover:bg-white/20 transition-colors'
              style={{ background: 'rgba(255,255,255,0.1)' }}
            >
              <Download size={14} className='text-white' />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function ActionsDropdown({ anchorEl, onClose, onSeeDetails, onDelete }) {
  const dropRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!anchorEl) return;
    const rect = anchorEl.getBoundingClientRect();
    const menuWidth = dropRef.current?.offsetWidth || ACTION_MENU_WIDTH;
    const menuHeight = dropRef.current?.offsetHeight || ACTION_MENU_HEIGHT;
    const shouldOpenAbove =
      rect.bottom + menuHeight + VIEWPORT_GAP > window.innerHeight &&
      rect.top > menuHeight + VIEWPORT_GAP;
    const nextTop = shouldOpenAbove
      ? Math.max(VIEWPORT_GAP, rect.top - menuHeight - 6)
      : Math.min(
          rect.bottom + 6,
          window.innerHeight - menuHeight - VIEWPORT_GAP,
        );
    const nextLeft = Math.min(
      Math.max(VIEWPORT_GAP, rect.right - menuWidth),
      window.innerWidth - menuWidth - VIEWPORT_GAP,
    );
    setPos({ top: nextTop, left: nextLeft });

    const el = dropRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: shouldOpenAbove ? 6 : -6 },
      { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' },
    );
    const handleOutside = (e) => {
      if (!el.contains(e.target) && e.target !== anchorEl) onClose();
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [anchorEl, onClose]);

  return createPortal(
    <div
      ref={dropRef}
      style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 9999 }}
      className='min-w-37 bg-white rounded-lg shadow-lg border border-[#E5E7EB] py-1 overflow-hidden'
    >
      <button
        type='button'
        onClick={onSeeDetails}
        className='w-full text-left px-4 py-2.5 text-sm font-medium bg-[#E2AB0B] text-white hover:bg-[#c99a09] transition-colors'
      >
        See Details
      </button>
      <button
        type='button'
        onClick={onDelete}
        className='w-full text-left px-4 py-2.5 text-sm text-[#333] hover:bg-gray-50 transition-colors'
      >
        Delete
      </button>
    </div>,
    document.body,
  );
}

const AdminDonation = () => {
  const [donors, setDonors] = useState(INITIAL_DONORS);
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState(null);
  const [detailDonor, setDetailDonor] = useState(null);
  const pageRef = useRef(null);
  const anchorRefs = useRef({});

  useEffect(() => {
    if (!pageRef.current) return;
    gsap.fromTo(
      pageRef.current.querySelectorAll('[data-reveal]'),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.07 },
    );
  }, []);

  const totalPages = Math.max(1, Math.ceil(donors.length / PAGE_SIZE));
  const paginated = donors.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const startIdx = donors.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const endIdx = Math.min(page * PAGE_SIZE, donors.length);

  const handleToggle = useCallback((id) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  const handleClose = useCallback(() => setOpenId(null), []);

  const handleSeeDetails = useCallback(
    (id) => {
      setDetailDonor(donors.find((d) => d.id === id) ?? null);
      setOpenId(null);
    },
    [donors],
  );

  const handleCloseDetail = useCallback(() => setDetailDonor(null), []);

  const handleDelete = useCallback(
    (id) => {
      setDonors((prev) => prev.filter((d) => d.id !== id));
      setOpenId(null);
      setPage((p) => {
        const remaining = donors.length - 1;
        const newTotal = Math.max(1, Math.ceil(remaining / PAGE_SIZE));
        return Math.min(p, newTotal);
      });
    },
    [donors.length],
  );

  return (
    <div ref={pageRef} className='flex flex-col gap-8'>
      {/* Page header */}
      <div data-reveal>
        <h1
          className='text-4xl font-semibold text-[#050609]'
          style={{ fontFamily: "'Crimson Pro', serif" }}
        >
          Donations
        </h1>
        <p className='text-base text-[#464646] mt-2'>
          Overview &amp; management of your platform.
        </p>
      </div>

      {/* Stat cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5' data-reveal>
        {STAT_CARDS.map(({ label, value, Icon, gradient }) => (
          <div
            key={label}
            className='bg-white border border-black/10 rounded-2xl p-6 flex items-start justify-between'
          >
            <div className='flex flex-col gap-1'>
              <p className='text-sm text-[#4A5565]'>{label}</p>
              <p className='text-3xl font-normal text-[#0A0A0A] leading-9'>
                {value}
              </p>
            </div>
            <div
              className='w-12 h-12 rounded-xl flex items-center justify-center shrink-0'
              style={{ background: gradient }}
            >
              <Icon size={22} color='#fff' />
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div
        className='bg-white rounded-xl border border-black/10 overflow-hidden'
        data-reveal
      >
        <div className='hidden sm:block overflow-x-auto'>
          {/* Header */}
          <div className='bg-[#F6FBFF] flex items-center px-4'>
            {TABLE_COLS.map((col) => (
              <div
                key={col.label}
                className={`flex items-center px-2.5 py-3 ${col.width}`}
              >
                <p className='text-base text-black font-normal whitespace-nowrap'>
                  {col.label}
                </p>
              </div>
            ))}
          </div>

          {/* Rows */}
          <div className='flex flex-col'>
            {paginated.length === 0 ? (
              <p className='px-4 py-12 text-center text-base text-[#8A8A8A]'>
                No donations found.
              </p>
            ) : (
              paginated.map((donor) => (
                <div
                  key={donor.id}
                  className='flex items-center px-4 border-b border-[#E4E4E4] last:border-b-0'
                >
                  <div className='flex-1 px-2.5 py-4 text-base text-[#0C0C0C]'>
                    {donor.name}
                  </div>
                  <div className='flex-1 px-2.5 py-4 text-base text-[#0C0C0C] break-all'>
                    {donor.email}
                  </div>
                  <div className='flex-1 px-2.5 py-4 text-base text-[#0C0C0C]'>
                    {donor.phone}
                  </div>
                  <div
                    className={`flex-1 px-2.5 py-4 text-base font-normal ${
                      DONOR_TYPE_STYLES[donor.type] ?? 'text-[#0C0C0C]'
                    }`}
                  >
                    {donor.type}
                  </div>
                  <div className='flex-1 px-2.5 py-4 text-base text-[#0C0C0C]'>
                    {donor.amount}
                  </div>
                  <div className='flex-1 px-2.5 py-4 text-base text-[#0C0C0C]'>
                    {donor.date}
                  </div>
                  <div className='w-20 px-2.5 py-4 flex items-center justify-center'>
                    <button
                      type='button'
                      ref={(el) => {
                        anchorRefs.current[donor.id] = el;
                      }}
                      onClick={() => handleToggle(donor.id)}
                      aria-label={`Actions for ${donor.name}`}
                      className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-[#333]'
                    >
                      <MoreVertical size={18} />
                    </button>
                    {openId === donor.id && (
                      <ActionsDropdown
                        anchorEl={anchorRefs.current[donor.id]}
                        onClose={handleClose}
                        onSeeDetails={() => handleSeeDetails(donor.id)}
                        onDelete={() => handleDelete(donor.id)}
                      />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className='sm:hidden divide-y divide-gray-100'>
          {paginated.length === 0 ? (
            <p className='py-12 text-center text-base text-[#8A8A8A]'>
              No donations found.
            </p>
          ) : (
            paginated.map((donor) => (
              <div
                key={`m-${donor.id}`}
                className='px-4 py-4 flex items-start justify-between gap-3 hover:bg-gray-50 transition-colors'
              >
                <div className='min-w-0'>
                  <p className='text-base font-semibold text-[#0C0C0C]'>
                    {donor.name}
                  </p>
                  <p className='text-base text-[#0C0C0C] break-all'>
                    {donor.email}
                  </p>
                  <p className='text-base text-[#0C0C0C]'>{donor.phone}</p>
                  <p
                    className={`text-base mt-0.5 ${
                      DONOR_TYPE_STYLES[donor.type] ?? 'text-[#0C0C0C]'
                    }`}
                  >
                    {donor.type}
                  </p>
                  <p className='text-base text-[#0C0C0C]'>{donor.amount}</p>
                  <p className='text-base text-[#0C0C0C]'>{donor.date}</p>
                </div>
                <div className='shrink-0'>
                  <button
                    type='button'
                    ref={(el) => {
                      anchorRefs.current[`m-${donor.id}`] = el;
                    }}
                    onClick={() => handleToggle(`m-${donor.id}`)}
                    aria-label={`Actions for ${donor.name}`}
                    className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-[#333]'
                  >
                    <MoreVertical size={18} />
                  </button>
                  {openId === `m-${donor.id}` && (
                    <ActionsDropdown
                      anchorEl={anchorRefs.current[`m-${donor.id}`]}
                      onClose={handleClose}
                      onSeeDetails={() => handleSeeDetails(donor.id)}
                      onDelete={() => handleDelete(donor.id)}
                    />
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination footer */}
        <div className='flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-between px-5 py-4 gap-3 border-t border-[#F0F0F0]'>
          <p className='text-base text-[#E2AB0B]'>
            Showing {startIdx} to {endIdx} of {donors.length} results
          </p>
          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className='px-5 py-1.5 rounded-lg border border-[#E2AB0B] text-base text-[#E2AB0B] bg-white hover:bg-[#FCF7E7] disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
            >
              Previous
            </button>
            <button
              type='button'
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className='px-5 py-1.5 rounded-lg border border-[#E2AB0B] text-base text-[#E2AB0B] bg-white hover:bg-[#FCF7E7] disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {detailDonor && (
        <DonationDetailModal donor={detailDonor} onClose={handleCloseDetail} />
      )}
    </div>
  );
};

export default AdminDonation;
