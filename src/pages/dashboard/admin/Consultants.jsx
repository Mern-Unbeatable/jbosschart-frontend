import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  MoreVertical,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Languages,
  Award,
  Clock,
} from 'lucide-react';
import { gsap } from 'gsap';

const INITIAL_CONSULTANTS = [
  {
    id: 1,
    name: 'Eleanor Pena',
    title: 'Professional Consultant',
    email: 'eleanor@pixelexpertise.com',
    phone: '+1 0335-000-7132',
    address: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
    category: 'Psychic & Medium',
    status: 'Approved',
    avatar:
      'https://ui-avatars.com/api/?name=Eleanor+Pena&background=E2AB0B&color=fff&size=80',
    about:
      'Hello! I am Eleanor, a professional consultant with extensive experience in helping individuals navigate their personal and professional journeys. My approach combines empathy, expertise, and practical strategies to support my clients in achieving their goals.',
    experience: { years: '3 Years', role: 'Professional consulting' },
    languages: ['Bangla', 'English', 'Dutch'],
    location: { place: 'Hawaii, USA', note: 'Available for remote sessions' },
    expertise: [
      'Consultant',
      'Relation Articles',
      'Career Guide',
      'Personal Growth',
      'Emotional Support',
    ],
    availability: [
      { days: 'Monday - Friday', hours: '8:00 AM - 3:00 PM' },
      { days: 'Saturday', hours: '10:00 AM - 2:00 PM' },
    ],
  },
  {
    id: 2,
    name: 'Esther Howard',
    title: 'Tarot Specialist',
    email: 'esther@gmail.com',
    phone: '+880 1934-567890',
    address: '450 Maple Ave, Portland, Oregon 97201',
    category: 'Tarot Reader',
    status: 'Pending',
    avatar:
      'https://ui-avatars.com/api/?name=Esther+Howard&background=6366f1&color=fff&size=80',
    about:
      'Experienced Tarot reader with over 5 years of practice, specializing in life guidance and spiritual clarity.',
    experience: { years: '5 Years', role: 'Tarot & spiritual guidance' },
    languages: ['English', 'Spanish'],
    location: { place: 'Portland, USA', note: 'In-person and remote' },
    expertise: ['Tarot', 'Spiritual Guidance', 'Life Coaching'],
    availability: [
      { days: 'Tuesday - Thursday', hours: '9:00 AM - 5:00 PM' },
      { days: 'Sunday', hours: '12:00 PM - 4:00 PM' },
    ],
  },
  {
    id: 3,
    name: 'Annette Black',
    title: 'Tarot Reader & Healer',
    email: 'annette@gmail.com',
    phone: '+880 1934-567890',
    address: '23 Oak Street, Austin, Texas 78701',
    category: 'Tarot Reader',
    status: 'Suspended',
    avatar:
      'https://ui-avatars.com/api/?name=Annette+Black&background=ef4444&color=fff&size=80',
    about:
      'Certified tarot reader and energy healer dedicated to bringing clarity and healing to clients.',
    experience: { years: '2 Years', role: 'Energy healing & tarot' },
    languages: ['English', 'French'],
    location: { place: 'Austin, USA', note: 'Remote only' },
    expertise: ['Tarot', 'Energy Healing'],
    availability: [{ days: 'Monday - Wednesday', hours: '10:00 AM - 4:00 PM' }],
  },
  {
    id: 4,
    name: 'Jenny Wilson',
    title: 'Psychic Advisor',
    email: 'jenny@gmail.com',
    phone: '+880 1934-567890',
    address: '88 Pine Road, Seattle, Washington 98101',
    category: 'Tarot Reader',
    status: 'Approved',
    avatar:
      'https://ui-avatars.com/api/?name=Jenny+Wilson&background=10b981&color=fff&size=80',
    about:
      'Intuitive psychic advisor helping clients gain clarity in relationships, career, and life purpose.',
    experience: { years: '7 Years', role: 'Psychic readings & guidance' },
    languages: ['English', 'Dutch'],
    location: { place: 'Seattle, USA', note: 'Available for remote sessions' },
    expertise: ['Psychic Readings', 'Relationship Guidance', 'Career Coaching'],
    availability: [
      { days: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
      { days: 'Saturday', hours: '10:00 AM - 3:00 PM' },
    ],
  },
  {
    id: 5,
    name: 'Darlene Robertson',
    title: 'Holistic Consultant',
    email: 'darlene@gmail.com',
    phone: '+880 1934-567890',
    address: '312 Elm Street, Chicago, Illinois 60601',
    category: 'Tarot Reader',
    status: 'Suspended',
    avatar:
      'https://ui-avatars.com/api/?name=Darlene+Robertson&background=f59e0b&color=fff&size=80',
    about:
      'Holistic consultant bridging spiritual insights with practical life solutions.',
    experience: { years: '4 Years', role: 'Holistic life consulting' },
    languages: ['English'],
    location: { place: 'Chicago, USA', note: 'In-person preferred' },
    expertise: ['Holistic Healing', 'Tarot', 'Meditation'],
    availability: [{ days: 'Wednesday - Friday', hours: '11:00 AM - 5:00 PM' }],
  },
  {
    id: 6,
    name: 'Guy Hawkins',
    title: 'Spiritual Life Coach',
    email: 'guy@gmail.com',
    phone: '+880 1934-567890',
    address: '99 Birch Lane, Denver, Colorado 80201',
    category: 'Tarot Reader',
    status: 'Pending',
    avatar:
      'https://ui-avatars.com/api/?name=Guy+Hawkins&background=8b5cf6&color=fff&size=80',
    about:
      'Certified life coach and tarot reader offering practical spiritual support for modern challenges.',
    experience: { years: '6 Years', role: 'Spiritual life coaching' },
    languages: ['English', 'Bangla'],
    location: { place: 'Denver, USA', note: 'Remote sessions available' },
    expertise: ['Life Coaching', 'Tarot', 'Stress Management'],
    availability: [
      { days: 'Monday, Wednesday, Friday', hours: '9:00 AM - 4:00 PM' },
    ],
  },
  {
    id: 7,
    name: 'Robert Fox',
    title: 'Astrology Expert',
    email: 'robert@gmail.com',
    phone: '+880 1934-567890',
    address: '14 Sunset Blvd, Los Angeles, CA 90001',
    category: 'Astrologer',
    status: 'Approved',
    avatar:
      'https://ui-avatars.com/api/?name=Robert+Fox&background=0ea5e9&color=fff&size=80',
    about:
      'Professional astrologer offering in-depth natal chart readings and predictive astrology consultations.',
    experience: { years: '10 Years', role: 'Astrology & chart reading' },
    languages: ['English', 'Spanish', 'Dutch'],
    location: { place: 'Los Angeles, USA', note: 'Remote and in-person' },
    expertise: [
      'Astrology',
      'Natal Charts',
      'Predictive Astrology',
      'Transit Readings',
    ],
    availability: [
      { days: 'Monday - Thursday', hours: '10:00 AM - 7:00 PM' },
      { days: 'Saturday', hours: '9:00 AM - 1:00 PM' },
    ],
  },
];

const PAGE_SIZE = 7;

const STATUS_STYLES = {
  Approved: { badge: 'bg-[#eefff1] text-[#05bc27]' },
  Pending: { badge: 'bg-[#fff8ed] text-[#f59e0b]' },
  Suspended: { badge: 'bg-[#fff1f1] text-[#ef4444]' },
};

const FILTERS = ['All', 'Approved', 'Pending', 'Suspended'];
const ACTION_MENU_WIDTH = 192;
const ACTION_MENU_HEIGHT = 216;
const VIEWPORT_GAP = 12;

function scrollConsultantPageToTop() {
  if (typeof document === 'undefined') return;

  const scrollContainer = document.querySelector('[data-lenis-prevent]');
  if (scrollContainer?.scrollTo) {
    scrollContainer.scrollTo({ top: 0, behavior: 'auto' });
    return;
  }

  window.scrollTo({ top: 0, behavior: 'auto' });
}

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.Pending;
  return (
    <span
      className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${style.badge}`}
    >
      {status}
    </span>
  );
}

function FilterTabs({ active, onChange }) {
  const btnRefs = useRef([]);
  return (
    <div className='bg-white border border-black/10 rounded-xl px-3 py-1.5 flex flex-wrap items-center justify-center sm:justify-start gap-2 w-full sm:w-fit'>
      {FILTERS.map((f, i) => (
        <button
          key={f}
          ref={(el) => (btnRefs.current[i] = el)}
          onClick={() => onChange(f)}
          onMouseEnter={() => {
            if (f !== active)
              gsap.to(btnRefs.current[i], { scale: 1.04, duration: 0.14 });
          }}
          onMouseLeave={() =>
            gsap.to(btnRefs.current[i], { scale: 1, duration: 0.14 })
          }
          className={`flex-1 sm:flex-none text-center px-3 py-1 rounded-md text-base font-normal transition-colors ${
            active === f
              ? 'bg-[#FCF7E7] text-[#E2AB0B]'
              : 'text-[#333] hover:text-[#E2AB0B]'
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

function PagBtn({ children, onClick, disabled }) {
  const ref = useRef(null);
  return (
    <button
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => {
        if (!disabled) gsap.to(ref.current, { scale: 1.05, duration: 0.12 });
      }}
      onMouseLeave={() => gsap.to(ref.current, { scale: 1, duration: 0.12 })}
      className='px-5 py-1.5 rounded-lg border border-[#E2AB0B] text-sm font-medium text-[#E2AB0B] bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FCF7E7] transition-colors'
    >
      {children}
    </button>
  );
}

function ActionsDropdown({ anchorEl, onSeeDetails, onStatusChange, onDelete }) {
  const menuRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (anchorEl) {
      const r = anchorEl.getBoundingClientRect();
      const menuWidth = menuRef.current?.offsetWidth || ACTION_MENU_WIDTH;
      const menuHeight = menuRef.current?.offsetHeight || ACTION_MENU_HEIGHT;
      const shouldOpenAbove =
        r.bottom + menuHeight + VIEWPORT_GAP > window.innerHeight &&
        r.top > menuHeight + VIEWPORT_GAP;
      const nextTop = shouldOpenAbove
        ? Math.max(VIEWPORT_GAP, r.top - menuHeight - 6)
        : Math.min(
            r.bottom + 6,
            window.innerHeight - menuHeight - VIEWPORT_GAP,
          );
      const nextLeft = Math.min(
        Math.max(VIEWPORT_GAP, r.right - menuWidth),
        window.innerWidth - menuWidth - VIEWPORT_GAP,
      );
      setPos({
        top: nextTop,
        left: nextLeft,
      });
    }
    gsap.fromTo(
      menuRef.current,
      {
        opacity: 0,
        y: anchorEl
          ? anchorEl.getBoundingClientRect().bottom > window.innerHeight / 2
            ? 8
            : -8
          : -8,
        scale: 0.95,
      },
      { opacity: 1, y: 0, scale: 1, duration: 0.18, ease: 'power2.out' },
    );
  }, [anchorEl]);

  return createPortal(
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        top: pos.top,
        left: pos.left,
        zIndex: 9999,
      }}
      className='w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden'
    >
      <button
        onClick={onSeeDetails}
        className='w-full text-left px-4 py-3 text-sm font-semibold text-white bg-[#E2AB0B] hover:bg-[#c99508] transition-colors'
      >
        See Details
      </button>
      <div className='px-4 pt-2 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-[0.18em] border-t border-gray-100'>
        Change Status
      </div>
      {['Approved', 'Pending', 'Suspended'].map((s) => (
        <button
          key={s}
          onClick={() => onStatusChange(s)}
          className='w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors'
        >
          {s}
        </button>
      ))}
      <div className='border-t border-gray-100'>
        <button
          onClick={onDelete}
          className='w-full text-left px-4 py-2.5 text-sm text-red-500 font-medium hover:bg-red-50 transition-colors'
        >
          Delete
        </button>
      </div>
    </div>,
    document.body,
  );
}

function DeleteModal({ name, onConfirm, onCancel }) {
  const overlayRef = useRef(null);
  const boxRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.2 },
    );
    gsap.fromTo(
      boxRef.current,
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: 'power2.out' },
    );
  }, []);
  const dismiss = (cb) =>
    gsap.to(boxRef.current, {
      opacity: 0,
      scale: 0.9,
      y: 20,
      duration: 0.18,
      ease: 'power2.in',
      onComplete: cb,
    });

  return (
    <div
      ref={overlayRef}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 animate-modal-overlay'
    >
      <div
        ref={boxRef}
        className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center animate-modal-panel'
      >
        <div className='flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mx-auto mb-4'>
          <span className='text-2xl'>🗑️</span>
        </div>
        <h3 className='text-lg font-semibold text-gray-900 mb-1'>
          Delete Consultant
        </h3>
        <p className='text-base text-gray-500 mb-6'>
          Are you sure you want to delete{' '}
          <span className='font-semibold text-gray-800'>{name}</span>?<br />
          This action cannot be undone.
        </p>
        <div className='flex gap-3'>
          <button
            onClick={() => dismiss(onCancel)}
            className='flex-1 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className='flex-1 py-2.5 rounded-lg bg-red-500 text-sm font-medium text-white hover:bg-red-600 transition-colors'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, title, children }) {
  return (
    <div className='bg-white rounded-xl border border-gray-100 p-4 flex flex-col gap-3 shadow-sm'>
      <div className='flex items-center gap-2'>
        <span className='inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#FCF7E7]'>
          <Icon size={18} className='text-[#E2AB0B]' />
        </span>
        <h3 className='text-base font-semibold text-gray-800'>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function ConsultantDetail({ consultant: c, onBack }) {
  const wrapRef = useRef(null);
  useEffect(() => {
    if (!wrapRef.current) return;
    const cards = wrapRef.current.querySelectorAll('.detail-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, stagger: 0.07, duration: 0.35, ease: 'power2.out' },
    );
  }, [c.id]);

  return (
    <div ref={wrapRef} className='flex flex-col gap-3'>
      <button
        onClick={onBack}
        className='detail-card inline-flex items-center gap-1.5 text-base text-gray-600 hover:text-[#E2AB0B] font-medium transition-colors w-fit group'
      >
        <ArrowLeft
          size={18}
          className='transition-transform group-hover:-translate-x-0.5'
        />
        Back
      </button>

      <div className='detail-card bg-white rounded-2xl border border-gray-100 shadow-sm p-4'>
        <div className='flex flex-col sm:flex-row gap-5 items-start sm:items-center'>
          <img
            src={c.avatar}
            alt={c.name}
            className='w-16 h-16 rounded-full object-cover ring-2 ring-[#E2AB0B]/30 shrink-0'
          />
          <div className='flex-1'>
            <h2 className='text-2xl font-semibold text-gray-900 leading-tight'>
              {c.name}
            </h2>
            <p className='text-base text-gray-500 mt-0.5'>{c.title}</p>
            <div className='mt-3 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-5'>
              <span className='inline-flex items-center gap-2 text-sm text-gray-600'>
                <Mail size={14} className='text-[#E2AB0B] shrink-0' />
                {c.email}
              </span>
              <span className='inline-flex items-center gap-2 text-sm text-gray-600'>
                <Phone size={14} className='text-[#E2AB0B] shrink-0' />
                {c.phone}
              </span>
              <span className='inline-flex items-center gap-2 text-sm text-gray-600'>
                <MapPin size={14} className='text-[#E2AB0B] shrink-0' />
                {c.address}
              </span>
            </div>
          </div>
          <StatusBadge status={c.status} />
        </div>
      </div>

      <div className='detail-card bg-white rounded-2xl border border-gray-100 shadow-sm p-4'>
        <h3 className='text-lg font-semibold text-gray-900 mb-2'>About Me</h3>
        <p className='text-base text-gray-600 leading-relaxed'>{c.about}</p>
      </div>

      <div className='detail-card grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <InfoCard icon={Briefcase} title='Experience'>
          <p className='text-xl font-semibold text-gray-900'>
            {c.experience.years}
          </p>
          <p className='text-sm text-gray-500'>{c.experience.role}</p>
        </InfoCard>
        <InfoCard icon={Languages} title='Languages'>
          <div className='flex flex-wrap gap-2'>
            {c.languages.map((l) => (
              <span
                key={l}
                className='px-3 py-1 text-sm rounded-full border border-gray-200 text-gray-700 bg-gray-50'
              >
                {l}
              </span>
            ))}
          </div>
        </InfoCard>
        <InfoCard icon={MapPin} title='Location'>
          <p className='text-base font-medium text-gray-900'>
            {c.location.place}
          </p>
          <p className='text-sm text-gray-500'>{c.location.note}</p>
        </InfoCard>
      </div>

      <div className='detail-card bg-white rounded-2xl border border-gray-100 shadow-sm p-4'>
        <div className='flex items-center gap-2 mb-3'>
          <span className='inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#FCF7E7]'>
            <Award size={18} className='text-[#E2AB0B]' />
          </span>
          <h3 className='text-base font-semibold text-gray-800'>
            Areas of Expertise
          </h3>
        </div>
        <div className='flex flex-wrap gap-2'>
          {c.expertise.map((tag) => (
            <span
              key={tag}
              className='px-3 py-1 text-sm rounded-full border border-[#E2AB0B]/40 text-[#E2AB0B] bg-[#FCF7E7]'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className='detail-card bg-white rounded-2xl border border-gray-100 shadow-sm p-4'>
        <div className='flex items-center gap-2 mb-3'>
          <span className='inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#FCF7E7]'>
            <Clock size={18} className='text-[#E2AB0B]' />
          </span>
          <h3 className='text-base font-semibold text-gray-800'>
            Availability
          </h3>
        </div>
        <div className='flex flex-col gap-2'>
          {c.availability.map((a, i) => (
            <div
              key={i}
              className='flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3'
            >
              <div className='flex items-center gap-2'>
                <span className='w-2 h-2 rounded-full bg-[#05bc27] shrink-0' />
                <span className='text-base text-gray-700'>{a.days}</span>
              </div>
              <span className='text-sm font-medium text-gray-500'>
                {a.hours}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const AdminConsultants = () => {
  const [consultants, setConsultants] = useState(INITIAL_CONSULTANTS);
  const [filter, setFilter] = useState('All');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [detailConsultant, setDetailConsultant] = useState(null);
  const [page, setPage] = useState(1);
  const btnRefs = useRef({});

  useEffect(() => {
    const h = () => setOpenMenuId(null);
    document.addEventListener('click', h);
    return () => document.removeEventListener('click', h);
  }, []);

  const filtered =
    filter === 'All'
      ? consultants
      : consultants.filter((c) => c.status === filter);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilterChange = (f) => {
    setFilter(f);
    setPage(1);
    setOpenMenuId(null);
    scrollConsultantPageToTop();
  };

  const handleStatusChange = useCallback((id, status) => {
    setConsultants((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c)),
    );
    setOpenMenuId(null);
  }, []);

  const handleDelete = useCallback(() => {
    if (!deleteTarget) return;
    setConsultants((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setDeleteTarget(null);
    setOpenMenuId(null);
  }, [deleteTarget]);

  if (detailConsultant) {
    return (
      <ConsultantDetail
        consultant={detailConsultant}
        onBack={() => setDetailConsultant(null)}
      />
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-1'>
        <h1
          className='text-3xl md:text-4xl font-semibold text-[#050609] leading-tight'
          style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
        >
          Consultant
        </h1>
        <p className='text-base text-[#464646]'>
          Overview &amp; manage your Consultant.
        </p>
      </div>

      <FilterTabs active={filter} onChange={handleFilterChange} />

      <div className='bg-white rounded-2xl border border-black/10 overflow-hidden shadow-sm'>
        {/* Desktop table */}
        <div className='hidden sm:block overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-[#F6FBFF]'>
                {[
                  'Name',
                  'Email',
                  'Phone Number',
                  'Category',
                  'Status',
                  'Actions',
                ].map((h) => (
                  <th
                    key={h}
                    className={`px-5 py-3 text-base font-medium text-gray-800 whitespace-nowrap ${h === 'Actions' ? 'text-center' : 'text-left'}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className='py-16 text-center text-base text-gray-400'
                  >
                    No consultants found.
                  </td>
                </tr>
              ) : (
                paginated.map((c) => (
                  <tr
                    key={c.id}
                    className='border-b border-[#e4e4e4] hover:bg-gray-50/70 transition-colors'
                  >
                    <td className='px-5 py-4'>
                      <div className='flex items-center gap-3'>
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className='w-8 h-8 rounded-full object-cover shrink-0 hidden lg:block'
                        />
                        <span className='text-base font-medium text-[#0c0c0c] whitespace-nowrap'>
                          {c.name}
                        </span>
                      </div>
                    </td>
                    <td className='px-5 py-4 text-base text-[#0c0c0c]'>
                      {c.email}
                    </td>
                    <td className='px-5 py-4 text-base text-[#373737] whitespace-nowrap'>
                      {c.phone}
                    </td>
                    <td className='px-5 py-4 text-base text-[#333]'>
                      {c.category}
                    </td>
                    <td className='px-5 py-4'>
                      <StatusBadge status={c.status} />
                    </td>
                    <td className='px-5 py-4 text-center align-middle'>
                      <button
                        ref={(el) => (btnRefs.current[c.id] = el)}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId((prev) =>
                            prev === c.id ? null : c.id,
                          );
                        }}
                        className='inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors'
                      >
                        <MoreVertical size={18} className='text-gray-500' />
                      </button>
                      {openMenuId === c.id && (
                        <ActionsDropdown
                          anchorEl={btnRefs.current[c.id]}
                          onSeeDetails={() => {
                            setOpenMenuId(null);
                            setDetailConsultant(c);
                          }}
                          onStatusChange={(s) => handleStatusChange(c.id, s)}
                          onDelete={() => {
                            setDeleteTarget({ id: c.id, name: c.name });
                            setOpenMenuId(null);
                          }}
                        />
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        <div className='sm:hidden divide-y divide-gray-100'>
          {paginated.length === 0 ? (
            <p className='py-12 text-center text-base text-gray-400'>
              No consultants found.
            </p>
          ) : (
            paginated.map((c) => (
              <div
                key={c.id}
                className='px-4 py-4 flex items-start justify-between gap-3 hover:bg-gray-50 transition-colors'
              >
                <div className='flex items-start gap-3 min-w-0'>
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className='w-10 h-10 rounded-full object-cover shrink-0 mt-0.5'
                  />
                  <div className='min-w-0'>
                    <p className='text-base font-semibold text-[#0c0c0c] truncate'>
                      {c.name}
                    </p>
                    <p className='text-sm text-gray-500 truncate'>{c.email}</p>
                    <p className='text-sm text-gray-500'>{c.phone}</p>
                    <p className='text-sm text-gray-400 mt-0.5'>{c.category}</p>
                    <div className='mt-1.5'>
                      <StatusBadge status={c.status} />
                    </div>
                  </div>
                </div>
                <div className='shrink-0'>
                  <button
                    ref={(el) => (btnRefs.current[`m-${c.id}`] = el)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId((prev) =>
                        prev === `m-${c.id}` ? null : `m-${c.id}`,
                      );
                    }}
                    className='inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors'
                  >
                    <MoreVertical size={18} className='text-gray-500' />
                  </button>
                  {openMenuId === `m-${c.id}` && (
                    <ActionsDropdown
                      anchorEl={btnRefs.current[`m-${c.id}`]}
                      onSeeDetails={() => {
                        setOpenMenuId(null);
                        setDetailConsultant(c);
                      }}
                      onStatusChange={(s) => handleStatusChange(c.id, s)}
                      onDelete={() => {
                        setDeleteTarget({ id: c.id, name: c.name });
                        setOpenMenuId(null);
                      }}
                    />
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className='shrink-0 flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-between px-5 py-3 gap-3 border-t border-gray-100'>
          <p className='text-base text-[#E2AB0B]'>
            Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}{' '}
            results
          </p>
          <div className='flex items-center gap-2'>
            <PagBtn onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
              Previous
            </PagBtn>
            <PagBtn
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages}
            >
              Next
            </PagBtn>
          </div>
        </div>
      </div>

      {deleteTarget && (
        <DeleteModal
          name={deleteTarget.name}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default AdminConsultants;
