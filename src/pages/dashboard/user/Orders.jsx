import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ORDER_IMAGES = {
  crystal:
    'https://www.figma.com/api/mcp/asset/8d1bd5e2-f471-4a9c-9bf7-44fbdff3fc78',
  incense:
    'https://www.figma.com/api/mcp/asset/b6255fec-cf7f-4dde-856c-3e1e85aa50ff',
  tarot:
    'https://www.figma.com/api/mcp/asset/0dd697c8-0324-456b-bdeb-7df5a77845fd',
};

const ORDER_ITEMS = [
  {
    id: 'ord-001',
    title: 'Healing Crystal Set',
    description:
      'A premium crystal set designed to attract positive energy, reduce stress, and restore spiritual balance.',
    price: '€50',
    image: ORDER_IMAGES.crystal,
    status: 'recent',
  },
  {
    id: 'ord-002',
    title: 'Sacred Incense Pack',
    description:
      'Natural incense sticks that help improve meditation, relaxation, and create a peaceful environment.',
    price: '€25',
    image: ORDER_IMAGES.incense,
    status: 'recent',
  },
  {
    id: 'ord-003',
    title: 'Tarot Guidance Deck',
    description:
      'A complete tarot card deck for self-discovery, spiritual reading, and intuitive guidance.',
    price: '€15',
    image: ORDER_IMAGES.tarot,
    status: 'recent',
  },
  {
    id: 'ord-004',
    title: 'Healing Crystal Set',
    description:
      'A premium crystal set designed to attract positive energy, reduce stress, and restore spiritual balance.',
    price: '€50',
    image: ORDER_IMAGES.crystal,
    status: 'completed',
  },
  {
    id: 'ord-005',
    title: 'Sacred Incense Pack',
    description:
      'Natural incense sticks that help improve meditation, relaxation, and create a peaceful environment.',
    price: '€25',
    image: ORDER_IMAGES.incense,
    status: 'completed',
  },
  {
    id: 'ord-006',
    title: 'Tarot Guidance Deck',
    description:
      'A complete tarot card deck for self-discovery, spiritual reading, and intuitive guidance.',
    price: '€15',
    image: ORDER_IMAGES.tarot,
    status: 'completed',
  },
];

const UserOrders = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState('recent');

  const visibleOrders = useMemo(
    () => ORDER_ITEMS.filter((item) => item.status === tab),
    [tab],
  );

  return (
    <section className='space-y-5 sm:space-y-6'>
      <div className='space-y-2'>
        <h1 className='dashboard-page-title'>{t('dashboard.user.orders.title')}</h1>
        <p className='dashboard-page-subtitle text-base'>
          {t('dashboard.user.orders.subtitle')}
        </p>
      </div>

      <div className='flex w-full flex-col gap-2 rounded-xl border border-gray-200 bg-white p-2 sm:w-fit sm:flex-row sm:items-center sm:justify-start sm:gap-3 sm:px-3 sm:py-2'>
        <button
          type='button'
          onClick={() => setTab('recent')}
          className={`w-full flex-1 rounded-md px-3 py-2 text-center text-base leading-6 font-medium transition-colors sm:w-auto sm:flex-none sm:px-4 sm:py-1.5 ${
            tab === 'recent'
              ? 'bg-[#fcf7e7] text-[#e2ab0b]'
              : 'text-[#333333] hover:bg-gray-100'
          }`}
        >
          {t('dashboard.user.orders.recentOrdersTab')}
        </button>
        <button
          type='button'
          onClick={() => setTab('completed')}
          className={`w-full flex-1 rounded-md px-3 py-2 text-center text-base leading-6 font-medium transition-colors sm:w-auto sm:flex-none sm:px-4 sm:py-1.5 ${
            tab === 'completed'
              ? 'bg-[#fcf7e7] text-[#e2ab0b]'
              : 'text-[#333333] hover:bg-gray-100'
          }`}
        >
          {t('dashboard.user.orders.completedOrdersTab')}
        </button>
      </div>

      <div className='space-y-4'>
        {visibleOrders.map((order) => (
          <article
            key={order.id}
            className='rounded-xl border border-gray-100 bg-white px-4 py-4 sm:px-5'
          >
            <div className='flex flex-col gap-4 md:flex-row md:items-start lg:items-center'>
              <img
                src={order.image}
                alt={order.title}
                className='h-48 w-full rounded-lg object-cover sm:h-56 md:h-40 md:w-56 md:shrink-0 lg:h-44'
                loading='lazy'
              />

              <div className='min-w-0 flex-1 space-y-2'>
                <p className='text-base leading-6 text-[#606060]'>
                  {t('dashboard.user.orders.orderIdLabel')} {order.id}
                </p>
                <h2 className='text-xl leading-tight font-medium text-[#333333] sm:text-2xl'>
                  {order.title}
                </h2>
                <p className='text-base leading-7 text-[#545454]'>
                  {order.description}
                </p>
                <p className='text-2xl leading-tight font-medium text-black'>
                  {order.price}
                </p>
                <button
                  type='button'
                  className='inline-flex w-full items-center justify-center rounded bg-[#E2AB0B] px-6 py-2.5 text-base font-medium text-white transition-colors hover:bg-[#cc9800] sm:w-auto'
                >
                  {t('dashboard.user.orders.cancelButton')}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default UserOrders;
