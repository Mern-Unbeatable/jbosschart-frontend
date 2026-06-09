import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { MoreVertical } from 'lucide-react';
import { gsap } from 'gsap';

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 6;

const FILTERS = ['Active', 'Suspended'];

const ACTION_MENU_WIDTH = 160;
const ACTION_MENU_HEIGHT = 120;
const VIEWPORT_GAP = 12;

const STATUS_STYLES = {
  Active: { badge: 'bg-[#eefff1] text-[#05bc27]' },
  Suspended: { badge: 'bg-[#fff1f1] text-[#ef4444]' },
};

const INITIAL_USERS = [
  {
    id: 1,
    name: 'Eleanor Pena',
    email: 'aliza@gmail.com',
    phone: '+880 1712-345678',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Esther Howard',
    email: 'liyana@gmail.com',
    phone: '+880 1934-567890',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Annette Black',
    email: 'liyana@gmail.com',
    phone: '+880 1934-567890',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Jenny Wilson',
    email: 'liyana@gmail.com',
    phone: '+880 1934-567890',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Darlene Robertson',
    email: 'liyana@gmail.com',
    phone: '+880 1934-567890',
    status: 'Active',
  },
  {
    id: 6,
    name: 'Guy Hawkins',
    email: 'liyana@gmail.com',
    phone: '+880 1934-567890',
    status: 'Active',
  },
  {
    id: 7,
    name: 'Robert Fox',
    email: 'robert@gmail.com',
    phone: '+880 1934-567890',
    status: 'Suspended',
  },
  {
    id: 8,
    name: 'Cameron Williamson',
    email: 'cameron@gmail.com',
    phone: '+880 1934-567890',
    status: 'Active',
  },
  {
    id: 9,
    name: 'Brooklyn Simmons',
    email: 'brook@gmail.com',
    phone: '+880 1934-567890',
    status: 'Suspended',
  },
  {
    id: 10,
    name: 'Kristin Watson',
    email: 'kristin@gmail.com',
    phone: '+880 1934-567890',
    status: 'Active',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.Active;
  return (
    <span
      className={`inline-flex items-center px-4 py-0.5 rounded-full text-base font-normal ${style.badge}`}
    >
      {status}
    </span>
  );
}

function FilterTabs({ active, onChange }) {
  const btnRefs = useRef([]);
  return (
    <div className='bg-white border border-gray-100 rounded-xl px-3 py-1.5 flex items-center justify-center sm:justify-start gap-2 w-full sm:w-fit'>
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
          className={`flex-1 sm:flex-none text-center px-4 py-1 rounded-md text-base font-normal transition-colors ${
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

function ActionsDropdown({ anchorEl, onStatusChange, onDelete }) {
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
      setPos({ top: nextTop, left: nextLeft });
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
      className='w-40 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden'
    >
      <div className='px-4 pt-2 pb-1 text-xs font-bold text-gray-400 uppercase tracking-widest'>
        Status
      </div>
      {['Active', 'Suspended'].map((s) => (
        <button
          key={s}
          onClick={() => onStatusChange(s)}
          className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors'
        >
          {s}
        </button>
      ))}
      <div className='border-t border-gray-100'>
        <button
          onClick={onDelete}
          className='w-full text-left px-4 py-2 text-sm text-red-500 font-medium hover:bg-red-50 transition-colors'
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
          <MoreVertical size={24} className='text-red-500' />
        </div>
        <h3 className='text-lg font-semibold text-gray-900 mb-1'>
          Delete User
        </h3>
        <p className='text-base text-gray-500 mb-6'>
          Are you sure you want to delete{' '}
          <span className='font-semibold text-gray-800'>{name}</span>?
          <br />
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

// ─── Main Component ───────────────────────────────────────────────────────────

const AdminUsers = () => {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [filter, setFilter] = useState('Active');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [page, setPage] = useState(1);

  const btnRefs = useRef({});

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = () => setOpenMenuId(null);
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const filtered = users.filter((u) => u.status === filter);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilterChange = (f) => {
    setFilter(f);
    setPage(1);
  };

  const handleStatusChange = useCallback((id, status) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));
    setOpenMenuId(null);
  }, []);

  const handleDelete = useCallback(() => {
    if (!deleteTarget) return;
    setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
    setDeleteTarget(null);
    setOpenMenuId(null);
  }, [deleteTarget]);

  return (
    <div className='flex flex-col gap-6'>
      {/* Page header */}
      <div className='flex flex-col gap-2'>
        <h1
          className='text-3xl md:text-4xl font-semibold text-[#050609] leading-tight'
          style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
        >
          User
        </h1>
        <p className='text-base text-[#464646]'>
          Overview &amp; manage your User.
        </p>
      </div>

      {/* Filter tabs */}
      <FilterTabs active={filter} onChange={handleFilterChange} />

      {/* Table card */}
      <div className='bg-white rounded-2xl border border-black/10 overflow-hidden shadow-sm'>
        {/* Desktop table */}
        <div className='hidden sm:block overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-[#F6FBFF]'>
                {[
                  '#',
                  'Name',
                  'Email',
                  'Phone Number',
                  'Status',
                  'Actions',
                ].map((h) => (
                  <th
                    key={h}
                    className={`px-5 py-3.5 text-base font-medium text-gray-800 whitespace-nowrap ${
                      h === 'Actions' ? 'text-center' : 'text-left'
                    }`}
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
                    No users found.
                  </td>
                </tr>
              ) : (
                paginated.map((u, idx) => (
                  <tr
                    key={u.id}
                    className='border-b border-[#e4e4e4] hover:bg-gray-50/70 transition-colors'
                  >
                    <td className='px-5 py-4 text-base text-gray-400'>
                      {(page - 1) * PAGE_SIZE + idx + 1}
                    </td>
                    <td className='px-5 py-4 text-base font-medium text-[#0c0c0c]'>
                      {u.name}
                    </td>
                    <td className='px-5 py-4 text-base text-[#0c0c0c]'>
                      {u.email}
                    </td>
                    <td className='px-5 py-4 text-base text-[#373737] whitespace-nowrap'>
                      {u.phone}
                    </td>
                    <td className='px-5 py-4'>
                      <StatusBadge status={u.status} />
                    </td>
                    <td className='px-5 py-4 text-center align-middle'>
                      <button
                        ref={(el) => (btnRefs.current[u.id] = el)}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId((prev) =>
                            prev === u.id ? null : u.id,
                          );
                        }}
                        className='inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors'
                        aria-label='Open actions menu'
                      >
                        <MoreVertical size={18} className='text-gray-500' />
                      </button>
                      {openMenuId === u.id && (
                        <ActionsDropdown
                          anchorEl={btnRefs.current[u.id]}
                          onStatusChange={(s) => handleStatusChange(u.id, s)}
                          onDelete={() => {
                            setDeleteTarget({ id: u.id, name: u.name });
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
              No users found.
            </p>
          ) : (
            paginated.map((u) => (
              <div
                key={u.id}
                className='px-4 py-4 flex items-start justify-between gap-3 hover:bg-gray-50 transition-colors'
              >
                <div className='min-w-0'>
                  <p className='text-base font-semibold text-[#0c0c0c] truncate'>
                    {u.name}
                  </p>
                  <p className='text-sm text-gray-500 truncate'>{u.email}</p>
                  <p className='text-sm text-gray-500 mt-0.5'>{u.phone}</p>
                  <div className='mt-2'>
                    <StatusBadge status={u.status} />
                  </div>
                </div>
                <div className='shrink-0'>
                  <button
                    ref={(el) => (btnRefs.current[`m-${u.id}`] = el)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId((prev) =>
                        prev === `m-${u.id}` ? null : `m-${u.id}`,
                      );
                    }}
                    className='inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors'
                    aria-label='Open actions menu'
                  >
                    <MoreVertical size={18} className='text-gray-500' />
                  </button>
                  {openMenuId === `m-${u.id}` && (
                    <ActionsDropdown
                      anchorEl={btnRefs.current[`m-${u.id}`]}
                      onStatusChange={(s) => handleStatusChange(u.id, s)}
                      onDelete={() => {
                        setDeleteTarget({ id: u.id, name: u.name });
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
        <div className='flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-between px-5 py-4 gap-3 border-t border-gray-100'>
          <p className='text-base text-[#E2AB0B]'>
            Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}
            {'\u2013'}
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

      {/* Delete confirmation modal */}
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

export default AdminUsers;
