import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'react-hot-toast';
import { Euro, WalletCards, ArrowUpRight } from 'lucide-react';

const MODAL_CLOSE_ANIMATION_MS = 280;

const PAYOUT_SUMMARY = [
  {
    id: 'available',
    title: 'Available Balance',
    amount: '€1250.00',
    icon: Euro,
    showWithdraw: true,
  },
  {
    id: 'pending',
    title: 'Pending Amount',
    amount: '€250.00',
    icon: ArrowUpRight,
    showWithdraw: false,
  },
  {
    id: 'total',
    title: 'Total Earnings',
    amount: '€84250.00',
    icon: WalletCards,
    showWithdraw: false,
  },
];

const TABLE_COLUMNS = [
  'Date',
  'Type',
  'Account Type',
  'Account Number',
  'Amount',
  'Status',
];

const PAYMENT_HISTORY = [
  {
    id: 1,
    date: 'Jul 5, 2025',
    type: 'Withdrawal',
    accountType: 'Stripe',
    accountNumber: '(702) 555-0122',
    amount: '€1,250.00',
    status: 'Approved',
  },
  {
    id: 2,
    date: 'Jul 7, 2025',
    type: 'Withdrawal',
    accountType: 'Stripe',
    accountNumber: '(406) 555-0120',
    amount: '€1,250.00',
    status: 'Approved',
  },
  {
    id: 3,
    date: 'Jul 8, 2025',
    type: 'Withdrawal',
    accountType: 'Stripe',
    accountNumber: '(205) 555-0100',
    amount: '€1,250.00',
    status: 'Approved',
  },
  {
    id: 4,
    date: 'Jul 9, 2025',
    type: 'Withdrawal',
    accountType: 'Stripe',
    accountNumber: '(229) 555-0109',
    amount: '€1,250.00',
    status: 'Approved',
  },
  {
    id: 5,
    date: 'Jul 10, 2025',
    type: 'Withdrawal',
    accountType: 'Stripe',
    accountNumber: '(319) 555-0115',
    amount: '€1,250.00',
    status: 'Approved',
  },
  {
    id: 6,
    date: 'Jul 12, 2025',
    type: 'Withdrawal',
    accountType: 'Stripe',
    accountNumber: '(217) 555-0113',
    amount: '€1,250.00',
    status: 'Approved',
  },
];

const SummaryCard = memo(
  ({ title, amount, icon: Icon, showWithdraw, onWithdrawClick }) => (
    <div className='bg-white border border-gray-100 rounded-[10px] p-6 flex flex-col gap-3'>
      <div className='w-10 h-10 rounded bg-[#f1ebf7] flex items-center justify-center'>
        <Icon size={20} className='text-[#6e35ae]' />
      </div>

      <div className='flex flex-col gap-1'>
        <p className='text-black text-4xl leading-none font-medium'>{amount}</p>
        <p className='text-black text-base'>{title}</p>
      </div>

      {showWithdraw ? (
        <button
          type='button'
          onClick={onWithdrawClick}
          className='mt-1 bg-[#E2AB0B] text-white text-base font-medium rounded-xl px-9 py-2 transition-all duration-200 ease-in-out hover:bg-[#ce9c0a]'
        >
          Withdraw Funds
        </button>
      ) : null}
    </div>
  ),
);

SummaryCard.displayName = 'SummaryCard';

const ConsultantPayout = memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [amount, setAmount] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const closeTimerRef = useRef(null);

  const handleOpenModal = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsModalClosing(false);
    setAmount('');
    setBusinessName('');
    setRoutingNumber('');
    setAccountNumber('');
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalClosing(true);
    closeTimerRef.current = setTimeout(() => {
      setIsModalOpen(false);
      setIsModalClosing(false);
    }, MODAL_CLOSE_ANIMATION_MS);
  }, []);

  const handleSubmitWithdrawal = useCallback(() => {
    toast.success('Withdrawal request submitted successfully.');
    handleCloseModal();
  }, [handleCloseModal]);

  useEffect(
    () => () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    if (!isModalOpen) return;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, handleCloseModal]);

  return (
    <>
      <div className='flex flex-col gap-9'>
        <div className='flex flex-col gap-3'>
          <h1 className='dashboard-page-title'>Earnings & Payment</h1>
          <p className='text-base text-[#515151]'>
            Manage your earnings and payment information
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {PAYOUT_SUMMARY.map((item) => (
            <SummaryCard
              key={item.id}
              title={item.title}
              amount={item.amount}
              icon={item.icon}
              showWithdraw={item.showWithdraw}
              onWithdrawClick={handleOpenModal}
            />
          ))}
        </div>

        <section className='flex flex-col gap-6'>
          <h2 className='dashboard-page-title'>Payment History</h2>

          <div className='bg-white rounded-lg overflow-hidden'>
            {/* Mobile card layout */}
            <div className='md:hidden divide-y divide-gray-100'>
              {PAYMENT_HISTORY.map((item, index) => {
                const isStriped = index % 2 === 0;
                return (
                  <div
                    key={item.id}
                    className={`px-4 py-4 flex flex-col gap-2 ${isStriped ? 'bg-[#f1ebf7]' : 'bg-white'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <span className='text-base font-medium text-black'>
                        {item.date}
                      </span>
                      <span className='text-base font-medium text-[#22bb33]'>
                        {item.status}
                      </span>
                    </div>
                    <div className='grid grid-cols-2 gap-x-4 gap-y-1'>
                      <p className='text-sm text-[#717171]'>Type</p>
                      <p className='text-sm text-black'>{item.type}</p>
                      <p className='text-sm text-[#717171]'>Account Type</p>
                      <p className='text-sm text-black'>{item.accountType}</p>
                      <p className='text-sm text-[#717171]'>Account Number</p>
                      <p className='text-sm text-black'>{item.accountNumber}</p>
                      <p className='text-sm text-[#717171]'>Amount</p>
                      <p className='text-sm font-medium text-black'>
                        {item.amount}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop table */}
            <div className='hidden md:block overflow-x-auto'>
              <table className='w-full min-w-245'>
                <thead>
                  <tr>
                    {TABLE_COLUMNS.map((column) => (
                      <th
                        key={column}
                        className='text-left text-lg font-normal text-black px-4 py-3'
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {PAYMENT_HISTORY.map((item, index) => {
                    const isStriped = index % 2 === 0;
                    return (
                      <tr
                        key={item.id}
                        className={isStriped ? 'bg-[#f1ebf7]' : ''}
                      >
                        <td className='px-4 py-3 text-base text-black'>
                          {item.date}
                        </td>
                        <td className='px-4 py-3 text-base text-black'>
                          {item.type}
                        </td>
                        <td className='px-4 py-3 text-base text-black'>
                          {item.accountType}
                        </td>
                        <td className='px-4 py-3 text-base text-black'>
                          {item.accountNumber}
                        </td>
                        <td className='px-4 py-3 text-base text-black'>
                          {item.amount}
                        </td>
                        <td className='px-4 py-3 text-base text-[#22bb33]'>
                          {item.status}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className='flex flex-wrap items-center justify-between gap-3 px-4 py-5'>
              <p className='text-base text-[#e2ab0b]'>
                Showing 1 to 7 of 7 results
              </p>

              <div className='flex items-center gap-2'>
                <button
                  type='button'
                  className='border border-[#e2ab0b] rounded-xl px-4 py-2 text-base font-medium text-[#e2ab0b] transition-all duration-200 ease-in-out hover:bg-[#fcf7e7]'
                >
                  Previous
                </button>
                <button
                  type='button'
                  className='border border-[#e2ab0b] rounded-xl px-4 py-2 text-base font-medium text-[#e2ab0b] transition-all duration-200 ease-in-out hover:bg-[#fcf7e7]'
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {isModalOpen
        ? createPortal(
            <div
              className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 ${
                isModalClosing
                  ? 'animate-modal-overlay-out'
                  : 'animate-modal-overlay'
              }`}
              onClick={handleCloseModal}
              role='dialog'
              aria-modal='true'
              aria-labelledby='withdraw-modal-title'
            >
              <div
                className={`w-full max-w-md max-h-[85vh] overflow-y-auto rounded-[20px] bg-white p-6 shadow-[20px_20px_93px_0px_rgba(0,0,0,0.2)] ${
                  isModalClosing
                    ? 'animate-modal-panel-out'
                    : 'animate-modal-panel'
                }`}
                onClick={(event) => event.stopPropagation()}
              >
                <div className='mb-5 flex items-center justify-between'>
                  <h3
                    id='withdraw-modal-title'
                    className='text-3xl font-medium leading-none text-black'
                  >
                    Withdraw Funds
                  </h3>
                  <button
                    type='button'
                    onClick={handleCloseModal}
                    className='flex h-9 w-9 items-center justify-center rounded-full bg-[#d9d9d9] text-[#2d3036] transition-colors duration-200 hover:bg-[#cfcfcf]'
                    aria-label='Close modal'
                  >
                    ×
                  </button>
                </div>

                <div className='space-y-5'>
                  <div className='space-y-2'>
                    <label
                      htmlFor='withdraw-amount'
                      className='block text-base text-black'
                    >
                      Enter amount
                    </label>
                    <div className='flex h-11.75 items-center gap-2 rounded-lg border border-[#cdcdcd] px-4'>
                      <span className='text-base font-medium text-black'>
                        €
                      </span>
                      <input
                        id='withdraw-amount'
                        type='text'
                        inputMode='decimal'
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                        placeholder='Enter withdrawal amount'
                        className='h-full w-full border-none bg-transparent text-base font-medium text-black placeholder:text-[#9ca3af] outline-none'
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <label
                      htmlFor='withdraw-business-name'
                      className='block text-base text-black'
                    >
                      Name of the business / organisation
                    </label>
                    <input
                      id='withdraw-business-name'
                      type='text'
                      value={businessName}
                      onChange={(event) => setBusinessName(event.target.value)}
                      placeholder='Enter business or organisation name'
                      className='h-11.75 w-full rounded-lg border border-[#cdcdcd] px-4 text-base text-black placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#e2ab0b]'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label
                      htmlFor='withdraw-routing-number'
                      className='block text-base text-black'
                    >
                      Routing number
                    </label>
                    <input
                      id='withdraw-routing-number'
                      type='text'
                      value={routingNumber}
                      onChange={(event) => setRoutingNumber(event.target.value)}
                      placeholder='Enter routing number'
                      className='h-11.75 w-full rounded-lg border border-[#cdcdcd] px-4 text-base text-black placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#e2ab0b]'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label
                      htmlFor='withdraw-account-number'
                      className='block text-base text-black'
                    >
                      Account Number
                    </label>
                    <input
                      id='withdraw-account-number'
                      type='text'
                      value={accountNumber}
                      onChange={(event) => setAccountNumber(event.target.value)}
                      placeholder='Enter your account number'
                      className='h-11.75 w-full rounded-lg border border-[#cdcdcd] px-4 text-base font-medium text-black placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#e2ab0b]'
                    />
                  </div>
                </div>

                <div className='mt-8 flex items-center justify-between'>
                  <button
                    type='button'
                    onClick={handleCloseModal}
                    className='rounded-xl border border-[#e2ab0b] px-9 py-3 text-base font-medium text-[#24272d] transition-all duration-200 ease-in-out hover:bg-[#fcf7e7]'
                  >
                    Cancel
                  </button>

                  <button
                    type='button'
                    onClick={handleSubmitWithdrawal}
                    className='rounded-xl bg-[#E2AB0B] px-9 py-3 text-base font-medium text-white transition-all duration-200 ease-in-out hover:bg-[#ce9c0a]'
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
});

ConsultantPayout.displayName = 'ConsultantPayout';

export default ConsultantPayout;
