import React, { useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { MoreVertical } from 'lucide-react';
import { gsap } from 'gsap';
import { ROUTES } from '../../../config';
import PublishedAdDetailsModal from './PublishedAdDetailsModal';

const ACTION_MENU_WIDTH = 144;
const ACTION_MENU_HEIGHT = 96;
const VIEWPORT_GAP = 12;

const BUSINESS_TYPE_STYLES = {
  Online: 'text-[#6E35AE]',
  Local: 'text-[#E2AB0B]',
};

const INITIAL_ADS = [
  {
    id: 1,
    name: 'Bessie Cooper',
    email: 'alma.lawson@example.com',
    phone: '(209) 555-0104',
    businessType: 'Online',
    pageName: 'Home Screen',
    date: '4/28/2026',
  },
  {
    id: 2,
    name: 'Courtney Henry',
    email: 'felicia.reid@example.com',
    phone: '(252) 555-0126',
    businessType: 'Local',
    pageName: 'Webshop Page',
    date: '4/28/2026',
  },
  {
    id: 3,
    name: 'Albert Flores',
    email: 'michelle.rivera@example.com',
    phone: '(808) 555-0111',
    businessType: 'Online',
    pageName: 'Blog Details Page',
    date: '4/28/2026',
  },
  {
    id: 4,
    name: 'Dianne Russell',
    email: 'debra.holt@example.com',
    phone: '(316) 555-0116',
    businessType: 'Local',
    pageName: 'Community Page',
    date: '4/28/2026',
  },
  {
    id: 5,
    name: 'Ronald Richards',
    email: 'kenzi.lawson@example.com',
    phone: '(406) 555-0120',
    businessType: 'Online',
    pageName: 'Credit Page',
    date: '4/28/2026',
  },
  {
    id: 6,
    name: 'Arlene McCoy',
    email: 'jessica.hanson@example.com',
    phone: '(208) 555-0112',
    businessType: 'Local',
    pageName: 'Community Page',
    date: '4/28/2026',
  },
  {
    id: 7,
    name: 'Wade Warren',
    email: 'alma.obrien@example.com',
    phone: '(907) 555-0101',
    businessType: 'Online',
    pageName: 'Consultants Page',
    date: '4/28/2026',
  },
];

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

  if (!anchorEl) return null;

  return createPortal(
    <div
      ref={dropRef}
      className='bg-white rounded-xl shadow-lg border border-[#E4E4E4] overflow-hidden w-36'
      style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 9999 }}
    >
      <button
        type='button'
        aria-label='See ad details'
        onClick={onSeeDetails}
        className='w-full text-left px-4 py-2.5 text-sm font-medium text-white bg-[#E2AB0B] hover:brightness-95 transition-colors'
      >
        See Details
      </button>
      <button
        type='button'
        aria-label='Delete this ad'
        onClick={onDelete}
        className='w-full text-left px-4 py-2.5 text-sm text-[#333] hover:bg-gray-50 transition-colors'
      >
        Delete
      </button>
    </div>,
    document.body,
  );
}

export default function AdsManagement() {
  const navigate = useNavigate();
  const [ads, setAds] = useState(INITIAL_ADS);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [publishAd, setPublishAd] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const pageRef = useRef(null);
  const anchorRefs = useRef({});

  const totalResults = ads.length;
  const pageSize = 7;
  const totalPages = Math.ceil(totalResults / pageSize);
  const pageStart = totalResults === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const pageEnd = Math.min(currentPage * pageSize, totalResults);
  const visibleAds = ads.slice(pageStart - 1, pageEnd);
  const activeAdId =
    typeof openDropdownId === 'string'
      ? Number(openDropdownId.replace('m-', ''))
      : openDropdownId;

  useEffect(() => {
    if (!pageRef.current) return;
    const items = pageRef.current.querySelectorAll('[data-reveal]');
    gsap.fromTo(
      items,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.08 },
    );
  }, []);

  const handleOpenDropdown = useCallback((id) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  }, []);

  const handleCloseDropdown = useCallback(() => {
    setOpenDropdownId(null);
  }, []);

  const handlePublish = useCallback(
    (id) => {
      const selectedAd = ads.find((ad) => ad.id === id);
      if (!selectedAd) return;
      setPublishAd(selectedAd);
      handleCloseDropdown();
    },
    [ads, handleCloseDropdown],
  );

  const handleClosePublishModal = useCallback(() => {
    setPublishAd(null);
  }, []);

  const handleDelete = useCallback(
    (id) => {
      setAds((prev) => prev.filter((ad) => ad.id !== id));
      handleCloseDropdown();
    },
    [handleCloseDropdown],
  );

  const handlePrev = useCallback(() => {
    setCurrentPage((p) => Math.max(1, p - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage((p) => Math.min(totalPages, p + 1));
  }, [totalPages]);

  return (
    <div ref={pageRef} className='flex flex-col gap-8'>
      {/* Header */}
      <div
        data-reveal
        className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'
      >
        <div className='flex flex-col gap-2 min-w-0'>
          <h1
            className='text-3xl sm:text-4xl font-semibold text-[#050609] leading-tight'
            style={{ fontFamily: "'Crimson Pro', serif" }}
          >
            Adds Management
          </h1>
          <p className='text-sm sm:text-base text-[#464646] leading-6'>
            Donor Advertisement Management Dashboard
          </p>
        </div>
        <button
          type='button'
          aria-label='Publish new ad'
          onClick={() => navigate(ROUTES.ADMIN_ADS_PUBLISHED)}
          className='flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded text-white text-base font-medium bg-[#E2AB0B] hover:brightness-95 transition-all'
          style={{ fontFamily: "'Crimson Pro', serif" }}
        >
          Published New Ads
        </button>
      </div>

      {/* Table */}
      <div
        data-reveal
        className='bg-white rounded-xl border border-black/10 overflow-hidden'
      >
        <div className='hidden sm:block overflow-x-auto'>
          {/* Table header */}
          <div className='flex items-center px-4 bg-[#F6FBFF]'>
            <div className='flex-1 px-2.5 py-3'>
              <span className='text-base text-black leading-6'>Name</span>
            </div>
            <div className='flex-1 px-2.5 py-3'>
              <span className='text-base text-black leading-6'>Email</span>
            </div>
            <div className='flex-1 px-2.5 py-3'>
              <span className='text-base text-black leading-6'>
                Phone Number
              </span>
            </div>
            <div className='flex-1 px-2.5 py-3'>
              <span className='text-base text-black leading-6'>
                Business Type
              </span>
            </div>
            <div className='flex-1 px-2.5 py-3'>
              <span className='text-base text-black leading-6'>Page Name</span>
            </div>
            <div className='flex-1 px-2.5 py-3'>
              <span className='text-base text-black leading-6'>
                Uploaded Date
              </span>
            </div>
            <div className='w-20 px-2.5 py-3'>
              <span className='text-base text-black leading-6'>Actions</span>
            </div>
          </div>

          {/* Table body */}
          <div className='flex flex-col'>
            {visibleAds.length === 0 ? (
              <p className='px-4 py-12 text-center text-base text-[#8A8A8A]'>
                No ads found.
              </p>
            ) : (
              visibleAds.map((ad) => (
                <div
                  key={ad.id}
                  className='flex items-center px-4 border-b border-[#E4E4E4] last:border-b-0'
                >
                  <div className='flex-1 px-2.5 py-4'>
                    <p className='text-base text-[#0C0C0C] leading-6'>
                      {ad.name}
                    </p>
                  </div>
                  <div className='flex-1 px-2.5 py-4'>
                    <p className='text-base text-[#0C0C0C] leading-6 break-all'>
                      {ad.email}
                    </p>
                  </div>
                  <div className='flex-1 px-2.5 py-4'>
                    <p className='text-base text-[#0C0C0C] leading-6'>
                      {ad.phone}
                    </p>
                  </div>
                  <div className='flex-1 px-2.5 py-4'>
                    <p
                      className={`text-base leading-6 font-medium ${BUSINESS_TYPE_STYLES[ad.businessType] ?? 'text-[#0C0C0C]'}`}
                    >
                      {ad.businessType}
                    </p>
                  </div>
                  <div className='flex-1 px-2.5 py-4'>
                    <p className='text-base text-[#242424] leading-6'>
                      {ad.pageName}
                    </p>
                  </div>
                  <div className='flex-1 px-2.5 py-4'>
                    <p className='text-base text-[#0C0C0C] leading-6'>
                      {ad.date}
                    </p>
                  </div>
                  <div className='w-20 flex items-center justify-center px-2.5 py-4'>
                    <button
                      type='button'
                      aria-label={`Actions for ${ad.name}`}
                      ref={(el) => {
                        anchorRefs.current[ad.id] = el;
                      }}
                      onClick={() => handleOpenDropdown(ad.id)}
                      className='flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors'
                    >
                      <MoreVertical size={20} className='text-[#333]' />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className='sm:hidden divide-y divide-gray-100'>
          {visibleAds.length === 0 ? (
            <p className='py-12 text-center text-base text-[#8A8A8A]'>
              No ads found.
            </p>
          ) : (
            visibleAds.map((ad) => (
              <div
                key={`m-${ad.id}`}
                className='px-4 py-4 flex items-start justify-between gap-3 hover:bg-gray-50 transition-colors'
              >
                <div className='min-w-0'>
                  <p className='text-base font-semibold text-[#0C0C0C]'>
                    {ad.name}
                  </p>
                  <p className='text-base text-[#0C0C0C] break-all'>
                    {ad.email}
                  </p>
                  <p className='text-base text-[#0C0C0C]'>{ad.phone}</p>
                  <p
                    className={`text-base mt-0.5 ${
                      BUSINESS_TYPE_STYLES[ad.businessType] ?? 'text-[#0C0C0C]'
                    }`}
                  >
                    {ad.businessType}
                  </p>
                  <p className='text-base text-[#242424]'>{ad.pageName}</p>
                  <p className='text-base text-[#0C0C0C]'>{ad.date}</p>
                </div>
                <div className='shrink-0'>
                  <button
                    type='button'
                    aria-label={`Actions for ${ad.name}`}
                    ref={(el) => {
                      anchorRefs.current[`m-${ad.id}`] = el;
                    }}
                    onClick={() => handleOpenDropdown(`m-${ad.id}`)}
                    className='flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors'
                  >
                    <MoreVertical size={20} className='text-[#333]' />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination footer */}
        <div className='flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-between px-5 py-4 gap-3 border-t border-[#F0F0F0]'>
          <p className='text-base text-[#E2AB0B]'>
            Showing {pageStart} to {pageEnd} of {totalResults} results
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

      {/* Actions dropdown (portal) */}
      {openDropdownId !== null && (
        <ActionsDropdown
          anchorEl={anchorRefs.current[openDropdownId]}
          onClose={handleCloseDropdown}
          onSeeDetails={() => handlePublish(activeAdId)}
          onDelete={() => handleDelete(activeAdId)}
        />
      )}

      {publishAd && (
        <PublishedAdDetailsModal
          ad={publishAd}
          onClose={handleClosePublishModal}
        />
      )}
    </div>
  );
}
