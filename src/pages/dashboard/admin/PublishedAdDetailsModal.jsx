import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronDown, Download } from 'lucide-react';
import { gsap } from 'gsap';

const ADS_PAGE_OPTIONS = [
  'Home Page',
  'Consultants Page',
  'Consultants Details Page',
  'Credit Page',
  'Webshop Page',
  'Webshop Details Page',
  'Checkout Page',
  'Donation Page',
  'Community Page',
  'Blog Page',
  'Blog Details Page',
];

const AMOUNT_BY_ID = {
  1: '$369.00',
  2: '$1,200.00',
  3: '$3,418.00',
  4: '$2,500.00',
  5: '$180.00',
  6: '$500.00',
  7: '$750.00',
};

const BUSINESS_NAME_BY_ID = {
  1: 'City Fitness Center',
  2: 'Henry Solutions LLC',
  3: 'Horizon Technology Ltd',
  4: 'Community Market House',
  5: 'Richards Digital Group',
  6: 'McCoy Consulting Group',
  7: 'Warren Ventures',
};

export default function PublishedAdDetailsModal({
  ad,
  onClose,
  onConfirm,
  initialAdsPage,
}) {
  const panelRef = useRef(null);
  const selectorRef = useRef(null);
  const listRef = useRef(null);
  const [isAdsPageOpen, setIsAdsPageOpen] = useState(false);
  const [selectedAdsPage, setSelectedAdsPage] = useState(
    initialAdsPage ?? ad?.pageName ?? 'Home Page',
  );
  const isPublishFlow = typeof onConfirm === 'function';

  useEffect(() => {
    setSelectedAdsPage(initialAdsPage);
  }, [initialAdsPage]);

  useEffect(() => {
    if (!panelRef.current) return;
    document.body.style.overflow = 'hidden';
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 18, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'power2.out' },
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

  useEffect(() => {
    if (!isAdsPageOpen || !listRef.current) return;
    gsap.fromTo(
      listRef.current,
      { opacity: 0, y: -6 },
      { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' },
    );
  }, [isAdsPageOpen]);

  useEffect(() => {
    const handleOutside = (e) => {
      if (
        listRef.current &&
        !listRef.current.contains(e.target) &&
        selectorRef.current &&
        !selectorRef.current.contains(e.target)
      ) {
        setIsAdsPageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleSelectAdsPage = useCallback((option) => {
    setSelectedAdsPage(option);
    setIsAdsPageOpen(false);
  }, []);

  const handleConfirm = useCallback(() => {
    if (!onConfirm) return;
    onConfirm(selectedAdsPage);
  }, [onConfirm, selectedAdsPage]);

  if (!ad) return null;

  const amount = AMOUNT_BY_ID[ad.id] ?? '$369.00';
  const businessName = BUSINESS_NAME_BY_ID[ad.id] ?? 'City Fitness Center';
  const transactionId = `DON${String(ad.id).padStart(5, '0')}`;

  return createPortal(
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 animate-modal-overlay'
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className='bg-white border border-[#E7F1F1] rounded-[10px] w-full max-w-175 max-h-[90vh] overflow-y-auto animate-modal-panel'
      >
        <div className='flex items-center justify-between px-5 pt-5 pb-4'>
          <h2 className='text-3xl font-semibold text-[#212121]'>Ads Details</h2>
          <button
            type='button'
            aria-label='Close publish modal'
            onClick={onClose}
            className='w-9 h-9 flex items-center justify-center rounded-full bg-[#D9D9D9] hover:bg-gray-300 transition-colors shrink-0'
          >
            <X size={18} className='text-[#333]' />
          </button>
        </div>

        <div className='flex flex-col gap-4 px-5'>
          <div className='flex flex-col gap-1'>
            <p className='text-sm font-medium text-[#4A5565]'>Full Name</p>
            <p className='text-lg text-[#0A0A0A]'>{ad.name}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-sm font-medium text-[#4A5565]'>Email</p>
            <p className='text-base text-[#0A0A0A]'>{ad.email}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-sm font-medium text-[#4A5565]'>Phone</p>
            <p className='text-base text-[#0A0A0A]'>{ad.phone}</p>
          </div>

          <div className='flex flex-col gap-1.5'>
            <p className='text-sm font-medium text-[#4A5565]'>Donor Type</p>
            <span
              style={{ background: '#030213' }}
              className='inline-flex items-center text-white text-xs font-medium px-2.25 py-0.75 rounded-lg w-fit'
            >
              Business
            </span>
          </div>

          <div className='flex flex-col gap-1'>
            <p className='text-sm font-medium text-[#4A5565]'>Business Name</p>
            <p className='text-lg text-[#0A0A0A]'>{businessName}</p>
          </div>

          <div className='flex flex-col gap-1.5'>
            <p className='text-sm font-medium text-[#4A5565]'>Type</p>
            <span
              style={{ background: '#030213' }}
              className='inline-flex items-center text-white text-xs font-medium px-2.25 py-0.75 rounded-lg w-fit capitalize'
            >
              {ad.businessType}
            </span>
          </div>

          <div className='flex flex-col gap-1'>
            <p className='text-sm font-medium text-[#4A5565]'>Description</p>
            <p className='text-sm text-[#0A0A0A]'>
              Innovative technology solutions for modern businesses
            </p>
          </div>

          <div className='flex flex-col gap-1'>
            <p className='text-sm font-medium text-[#4A5565]'>Website</p>
            <a
              href='https://example-business5.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-base text-[#155DFC] hover:underline break-all'
            >
              https://example-business5.com
            </a>
          </div>

          <div className='flex flex-col gap-1'>
            <p className='text-sm font-medium text-[#4A5565]'>Amount</p>
            <p className='text-4xl leading-9 text-[#0A0A0A]'>{amount}</p>
          </div>

          <div className='flex flex-col gap-1'>
            <p className='text-sm font-medium text-[#4A5565]'>Date</p>
            <p className='text-base text-[#0A0A0A]'>{`${ad.date}, 11:31:32 AM`}</p>
          </div>

          <div className='flex flex-col gap-1'>
            <p className='text-sm font-medium text-[#4A5565]'>Transaction ID</p>
            <p className='text-sm text-[#0A0A0A] font-mono'>{transactionId}</p>
          </div>

          {isPublishFlow ? (
            <div className='flex flex-col gap-2'>
              <p className='text-sm font-normal text-[#151515]'>Ads Page</p>
              <div className='relative'>
                <button
                  ref={selectorRef}
                  type='button'
                  aria-label='Select ads page'
                  onClick={() => setIsAdsPageOpen((prev) => !prev)}
                  className='w-full border border-black/40 rounded-lg px-4 py-3.5 text-left text-sm text-[#171717] flex items-center justify-between gap-4'
                >
                  <span>{selectedAdsPage}</span>
                  <ChevronDown
                    size={18}
                    className={`text-[#545454] transition-transform ${
                      isAdsPageOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isAdsPageOpen && (
                  <div
                    ref={listRef}
                    className='absolute left-0 top-full mt-2 w-full bg-white rounded-md shadow-lg border border-[#E4E4E4] overflow-hidden z-10 opacity-0'
                  >
                    <div className='max-h-56 overflow-y-auto'>
                      {ADS_PAGE_OPTIONS.map((option) => (
                        <button
                          key={option}
                          type='button'
                          aria-label={`Select ${option}`}
                          onClick={() => handleSelectAdsPage(option)}
                          className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                            option === selectedAdsPage
                              ? 'bg-[#E2AB0B] text-white'
                              : 'text-[#333] hover:bg-[#FCF7E7]'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-1'>
              <p className='text-sm font-medium text-[#4A5565]'>Page Name</p>
              <p className='text-base text-[#0A0A0A]'>{ad.pageName || '—'}</p>
            </div>
          )}

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

          <div className='pb-5'>
            {isPublishFlow ? (
              <button
                type='button'
                aria-label='Confirm published ad'
                onClick={handleConfirm}
                className='px-6 py-3 rounded bg-[#E2AB0B] text-white text-base font-medium hover:brightness-95 transition-all'
                style={{ fontFamily: "'Crimson Pro', serif" }}
              >
                Confirm
              </button>
            ) : (
              <button
                type='button'
                aria-label='Close ad details'
                onClick={onClose}
                className='px-6 py-3 rounded bg-[#E2AB0B] text-white text-base font-medium hover:brightness-95 transition-all'
                style={{ fontFamily: "'Crimson Pro', serif" }}
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
