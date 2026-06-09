import React, { useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MoreVertical } from 'lucide-react';
import { gsap } from 'gsap';

const TABS = [
  'All',
  'Pending',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
];

const STATUS_STYLES = {
  Pending: 'bg-[#FFF5E6] text-[#E2AB0B]',
  Delivered: 'bg-[#EDFFF2] text-[#07BC27]',
  Shipped: 'bg-[#E8F5FF] text-[#38B6FF]',
  Processing: 'bg-[#F5EEFF] text-[#9B51E0]',
  Cancelled: 'bg-[#FFF0F0] text-[#EF4444]',
};

const ALL_STATUSES = [
  'Pending',
  'Processing',
  'Delivered',
  'Shipped',
  'Cancelled',
];

const ACTION_MENU_WIDTH = 176;
const ACTION_MENU_HEIGHT = 320;
const VIEWPORT_GAP = 12;

const MOCK_ITEMS = [
  { name: 'Healing Crystal Set', qty: 1, price: '$200.00' },
  { name: 'Healing Crystal Set', qty: 1, price: '$200.00' },
  { name: 'Healing Crystal Set', qty: 1, price: '$200.00' },
];

const INITIAL_ORDERS = [
  {
    id: '#ORD-001',
    customer: 'Darlene Robertson',
    phone: '(239) 555-0108',
    email: 'michelle.rivera@example.com',
    address: '3891 Ranchview Dr. Richardson, California 62639',
    product: 'Healing Crystal Set',
    price: '$150,000',
    date: '2024-03-24',
    status: 'Pending',
    items: MOCK_ITEMS,
    subtotal: '$1000.00',
    delivery: '$150.00',
    total: '$1500.00',
  },
  {
    id: '#ORD-002',
    customer: 'Cameron Williamson',
    phone: '(312) 555-0199',
    email: 'cameron.williamson@example.com',
    address: '2464 Royal Ln. Mesa, New Jersey 45463',
    product: 'Sacred Incense Pack',
    price: '$190,000',
    date: '2024-03-24',
    status: 'Delivered',
    items: MOCK_ITEMS,
    subtotal: '$1000.00',
    delivery: '$150.00',
    total: '$1500.00',
  },
  {
    id: '#ORD-004',
    customer: 'Robert Fox',
    phone: '(480) 555-0103',
    email: 'robert.fox@example.com',
    address: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
    product: 'Tarot Guidance Pack',
    price: '$170,000',
    date: '2024-03-24',
    status: 'Shipped',
    items: MOCK_ITEMS,
    subtotal: '$1000.00',
    delivery: '$150.00',
    total: '$1500.00',
  },
  {
    id: '#ORD-003',
    customer: 'Darlene Robertson',
    phone: '(239) 555-0108',
    email: 'michelle.rivera@example.com',
    address: '3891 Ranchview Dr. Richardson, California 62639',
    product: 'Healing Crystal Set',
    price: '$150,000',
    date: '2024-03-24',
    status: 'Pending',
    items: MOCK_ITEMS,
    subtotal: '$1000.00',
    delivery: '$150.00',
    total: '$1500.00',
  },
  {
    id: '#ORD-005',
    customer: 'Cameron Williamson',
    phone: '(312) 555-0199',
    email: 'cameron.williamson@example.com',
    address: '2464 Royal Ln. Mesa, New Jersey 45463',
    product: 'Healing Crystal Set',
    price: '$190,000',
    date: '2024-03-24',
    status: 'Delivered',
    items: MOCK_ITEMS,
    subtotal: '$1000.00',
    delivery: '$150.00',
    total: '$1500.00',
  },
  {
    id: '#ORD-006',
    customer: 'Robert Fox',
    phone: '(480) 555-0103',
    email: 'robert.fox@example.com',
    address: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
    product: 'Healing Crystal Set',
    price: '$170,000',
    date: '2024-03-24',
    status: 'Processing',
    items: MOCK_ITEMS,
    subtotal: '$1000.00',
    delivery: '$150.00',
    total: '$1500.00',
  },
  {
    id: '#ORD-007',
    customer: 'Jane Cooper',
    phone: '(605) 555-0144',
    email: 'jane.cooper@example.com',
    address: '4140 Parker Rd. Allentown, New Mexico 31134',
    product: 'Meditation Bundle',
    price: '$120,000',
    date: '2024-03-25',
    status: 'Cancelled',
    cancelReason:
      'The order has been cancelled due to a change in customer requirements. If you have any questions or need further assistance, please feel free to contact us.',
    items: MOCK_ITEMS,
    subtotal: '$1000.00',
    delivery: '$150.00',
    total: '$1500.00',
  },
];

const PAGE_SIZE = 6;

function OrderDetailModal({ order, onClose, onStatusChange }) {
  const modalRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.95, y: 16 },
      { opacity: 1, scale: 1, y: 0, duration: 0.22, ease: 'power2.out' },
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

  const handleBackdrop = useCallback(
    (e) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  return createPortal(
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 animate-modal-overlay'
      onClick={handleBackdrop}
    >
      <div
        ref={modalRef}
        className='bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-modal-panel'
      >
        {/* Modal header */}
        <div className='flex items-start justify-between px-6 pt-6 pb-4 border-b border-[#F0F0F0]'>
          <div>
            <h2 className='text-xl font-semibold text-[#050609]'>
              Order Details
            </h2>
            <p className='text-base text-[#545454] mt-0.5'>
              Order ID : {order.id.replace('#', '')}
            </p>
          </div>
          <button
            type='button'
            onClick={onClose}
            aria-label='Close modal'
            className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-[#545454] text-lg'
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className='px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-6'>
          {/* Customer Information */}
          <div>
            <div className='flex items-center gap-2 mb-3'>
              <span className='text-base text-[#545454]'>
                Customer Information
              </span>
            </div>
            <p className='font-semibold text-[#050609] text-base'>
              {order.customer}
            </p>
            <p className='text-base text-[#545454] mt-1'>{order.phone}</p>
            <p className='text-base text-[#545454]'>{order.email}</p>
            <p className='text-base text-[#545454] mt-1'>{order.address}</p>
          </div>

          {/* Order Summary */}
          <div>
            <div className='flex items-center gap-2 mb-3'>
              <span className='text-base text-[#545454]'>Order Summary</span>
            </div>
            <div className='flex flex-col gap-2'>
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className='flex items-center justify-between gap-3 bg-[#F9FAFB] rounded-lg px-3 py-2'
                >
                  <div className='w-10 h-10 rounded-md bg-[#E5E7EB] shrink-0 overflow-hidden'>
                    <div className='w-full h-full bg-linear-to-br from-gray-200 to-gray-300' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-base font-medium text-[#050609] truncate'>
                      {item.name}
                    </p>
                    <p className='text-base text-[#8A8A8A]'>
                      Quantity: {item.qty}
                    </p>
                  </div>
                  <span className='text-base font-semibold text-[#050609] shrink-0'>
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
            <div className='mt-3 flex flex-col gap-1.5 border-t border-[#F0F0F0] pt-3'>
              <div className='flex justify-between text-base text-[#333]'>
                <span>Subtotal</span>
                <span className='font-medium text-[#3DB4CC]'>
                  {order.subtotal}
                </span>
              </div>
              <div className='flex justify-between text-base text-[#333]'>
                <span>Delivery Charge</span>
                <span className='font-medium text-[#3DB4CC]'>
                  {order.delivery}
                </span>
              </div>
              <div className='flex justify-between text-base font-semibold text-[#050609] border-t border-[#F0F0F0] pt-2 mt-1'>
                <span>Total</span>
                <span className='text-[#3DB4CC]'>{order.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cancel Reason */}
        {order.cancelReason && (
          <div className='mx-6 mb-5 rounded-lg bg-[#FFF0F0] border border-[#FFCECE] px-4 py-3'>
            <p className='text-base font-semibold text-[#EF4444] mb-1'>
              Cancel Reason
            </p>
            <p className='text-base text-[#EF4444] leading-relaxed'>
              {order.cancelReason}
            </p>
          </div>
        )}

        {/* Update Order Status */}
        <div className='px-6 pb-6'>
          <p className='text-base font-semibold text-[#050609] mb-3'>
            Update Order Status
          </p>
          <div className='flex flex-wrap gap-2'>
            {ALL_STATUSES.map((s) => (
              <button
                key={s}
                type='button'
                onClick={() => onStatusChange(s)}
                className={`px-4 py-1.5 rounded border text-base font-medium transition-colors ${
                  order.status === s
                    ? 'bg-[#3DB4CC] border-[#3DB4CC] text-white'
                    : 'border-[#D0D0D0] text-[#333] hover:border-[#3DB4CC] hover:text-[#3DB4CC]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function ActionsDropdown({ anchorEl, onClose, onSeeDetails, onStatusChange }) {
  const menuRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!anchorEl) return;
    const r = anchorEl.getBoundingClientRect();
    const menuWidth = menuRef.current?.offsetWidth || ACTION_MENU_WIDTH;
    const menuHeight = menuRef.current?.offsetHeight || ACTION_MENU_HEIGHT;
    const shouldOpenAbove =
      r.bottom + menuHeight + VIEWPORT_GAP > window.innerHeight &&
      r.top > menuHeight + VIEWPORT_GAP;
    const nextTop = shouldOpenAbove
      ? Math.max(VIEWPORT_GAP, r.top - menuHeight - 6)
      : Math.min(r.bottom + 6, window.innerHeight - menuHeight - VIEWPORT_GAP);
    const nextLeft = Math.min(
      Math.max(VIEWPORT_GAP, r.right - menuWidth),
      window.innerWidth - menuWidth - VIEWPORT_GAP,
    );
    setPos({
      top: nextTop,
      left: nextLeft,
    });
    gsap.fromTo(
      menuRef.current,
      { opacity: 0, y: shouldOpenAbove ? 8 : -8, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.18, ease: 'power2.out' },
    );
    const handleOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !anchorEl.contains(e.target)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [anchorEl, onClose]);

  return createPortal(
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        top: pos.top,
        left: pos.left,
        zIndex: 9999,
      }}
      className='w-44 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden'
    >
      <button
        type='button'
        onClick={onSeeDetails}
        className='w-full text-left px-4 py-2.5 text-sm font-semibold text-white bg-[#E2AB0B] hover:bg-[#c99508] transition-colors'
      >
        See Details
      </button>
      <div className='px-4 pt-2 pb-1 text-xs font-bold text-gray-400 uppercase tracking-widest'>
        Status
      </div>
      {ALL_STATUSES.map((s) => (
        <button
          key={s}
          type='button'
          onClick={() => onStatusChange(s)}
          className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors'
        >
          {s}
        </button>
      ))}
    </div>,
    document.body,
  );
}

const AdminOrders = () => {
  const pageRef = useRef(null);
  const anchorRefs = useRef({});

  const [activeTab, setActiveTab] = useState('All');
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState(null);
  const [detailOrder, setDetailOrder] = useState(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const blocks = pageRef.current.querySelectorAll('[data-reveal]');
    gsap.fromTo(
      blocks,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.32, stagger: 0.05, ease: 'power2.out' },
    );
  }, []);

  const filtered =
    activeTab === 'All' ? orders : orders.filter((o) => o.status === activeTab);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setPage(1);
    setOpenId(null);
  }, []);

  const handleToggle = useCallback((id) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  const handleClose = useCallback(() => setOpenId(null), []);

  const handleSeeDetails = useCallback((order) => {
    setDetailOrder(order);
    setOpenId(null);
  }, []);

  const handleCloseDetail = useCallback(() => setDetailOrder(null), []);

  const handleStatusChange = useCallback((orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
    );
    setDetailOrder((prev) =>
      prev && prev.id === orderId ? { ...prev, status: newStatus } : prev,
    );
    setOpenId(null);
  }, []);

  return (
    <div ref={pageRef} className='flex flex-col gap-6'>
      {/* Page header */}
      <div data-reveal>
        <h1 className='dashboard-page-title'>Orders</h1>
        <p className='dashboard-page-subtitle mt-1'>
          Overview &amp; management of your platform.
        </p>
      </div>

      {/* Tab bar */}
      <div
        data-reveal
        className='flex flex-wrap items-center justify-center sm:justify-start gap-2 bg-white border border-[#E8E8E8] rounded-lg px-2 py-2 w-full sm:w-fit'
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            type='button'
            onClick={() => handleTabChange(tab)}
            className={`flex-1 sm:flex-none px-5 py-1.5 rounded-md text-base font-medium transition-colors ${
              activeTab === tab
                ? 'bg-[#E2AB0B] text-white'
                : 'text-[#545454] hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table card */}
      <div data-reveal className='bg-white rounded-xl overflow-hidden'>
        <div className='hidden sm:block overflow-x-auto'>
          <table className='w-full text-base'>
            <thead>
              <tr className='border-b border-[#F0F0F0]'>
                {[
                  'Order ID',
                  'Customer',
                  'Product',
                  'Price',
                  'Date',
                  'Status',
                  'Action',
                ].map((col) => (
                  <th
                    key={col}
                    scope='col'
                    className={`px-6 py-4 text-base font-medium text-[#050609] ${
                      col === 'Action' ? 'text-center' : 'text-left'
                    }`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className='px-6 py-10 text-center text-base text-[#8A8A8A]'
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                paginated.map((order) => (
                  <tr
                    key={order.id + order.status}
                    className='border-b border-[#F0F0F0] last:border-0'
                  >
                    <td className='px-6 py-4 text-[#333]'>{order.id}</td>
                    <td className='px-6 py-4 text-[#333]'>{order.customer}</td>
                    <td className='px-6 py-4 text-[#333]'>{order.product}</td>
                    <td className='px-6 py-4 text-[#333]'>{order.price}</td>
                    <td className='px-6 py-4 text-[#545454]'>{order.date}</td>
                    <td className='px-6 py-4'>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-base font-medium ${
                          STATUS_STYLES[order.status] ??
                          'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-center align-middle'>
                      <button
                        ref={(el) => {
                          anchorRefs.current[order.id] = el;
                        }}
                        type='button'
                        onClick={() => handleToggle(order.id)}
                        aria-label='Order actions'
                        className='inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors text-[#545454]'
                      >
                        <MoreVertical size={18} />
                      </button>
                      {openId === order.id && anchorRefs.current[order.id] && (
                        <ActionsDropdown
                          anchorEl={anchorRefs.current[order.id]}
                          onClose={handleClose}
                          onSeeDetails={() => handleSeeDetails(order)}
                          onStatusChange={(s) =>
                            handleStatusChange(order.id, s)
                          }
                        />
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className='sm:hidden divide-y divide-gray-100'>
          {paginated.length === 0 ? (
            <p className='py-12 text-center text-base text-[#8A8A8A]'>
              No orders found.
            </p>
          ) : (
            paginated.map((order) => (
              <div
                key={order.id + order.status + 'm'}
                className='px-4 py-4 flex items-start justify-between gap-3 hover:bg-gray-50 transition-colors'
              >
                <div className='min-w-0'>
                  <p className='text-base font-semibold text-[#333]'>
                    {order.id}
                  </p>
                  <p className='text-base text-[#333] mt-0.5'>
                    {order.customer}
                  </p>
                  <p className='text-base text-[#333]'>{order.product}</p>
                  <p className='text-base text-[#333]'>{order.price}</p>
                  <p className='text-base text-[#545454]'>{order.date}</p>
                  <div className='mt-2'>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-base font-medium ${
                        STATUS_STYLES[order.status] ??
                        'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className='shrink-0'>
                  <button
                    ref={(el) => {
                      anchorRefs.current[`m-${order.id}`] = el;
                    }}
                    type='button'
                    onClick={() => handleToggle(`m-${order.id}`)}
                    aria-label='Order actions'
                    className='inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors text-[#545454]'
                  >
                    <MoreVertical size={18} />
                  </button>
                  {openId === `m-${order.id}` &&
                    anchorRefs.current[`m-${order.id}`] && (
                      <ActionsDropdown
                        anchorEl={anchorRefs.current[`m-${order.id}`]}
                        onClose={handleClose}
                        onSeeDetails={() => handleSeeDetails(order)}
                        onStatusChange={(s) => handleStatusChange(order.id, s)}
                      />
                    )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer: count + pagination */}
        <div className='flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-between px-5 py-4 gap-3 border-t border-[#F0F0F0]'>
          <p className='text-base font-medium text-[#E2AB0B]'>
            Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1} to{' '}
            {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}{' '}
            results
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
              disabled={page >= totalPages}
              className='px-5 py-1.5 rounded-lg border border-[#E2AB0B] text-base text-[#E2AB0B] bg-white hover:bg-[#FCF7E7] disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {detailOrder && (
        <OrderDetailModal
          order={detailOrder}
          onClose={handleCloseDetail}
          onStatusChange={(s) => handleStatusChange(detailOrder.id, s)}
        />
      )}
    </div>
  );
};

export default AdminOrders;
