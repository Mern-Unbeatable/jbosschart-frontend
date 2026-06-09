import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Pencil,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ROUTES } from '../../../config';

// ─── Image asset constants (Figma; expire after 7 days) ───────────────────────

const IMG_CRYSTAL =
  'https://www.figma.com/api/mcp/asset/ca48393b-c636-4b06-a36b-a1ac5a929952';
const IMG_INCENSE =
  'https://www.figma.com/api/mcp/asset/039918df-3d70-4a62-b5a2-25a0e111b3c0';
const IMG_TAROT =
  'https://www.figma.com/api/mcp/asset/4079e0ef-1a47-41ec-ac17-79cf224c7701';
const IMG_ROLLER =
  'https://www.figma.com/api/mcp/asset/6ee40c52-caa2-4bb3-bd3a-cc98d8e3598e';
const IMG_BOWL =
  'https://www.figma.com/api/mcp/asset/4291f5ce-aeaf-4a83-ba0b-d28c303c62b4';
const IMG_OIL =
  'https://www.figma.com/api/mcp/asset/308d5674-9e07-4ad8-bed1-83aa7fbe1888';
const IMG_MIND =
  'https://www.figma.com/api/mcp/asset/a49ff4c8-78c3-4cc5-9990-5f72674cf263';
const IMG_ASTRO =
  'https://www.figma.com/api/mcp/asset/60a5d747-280b-4a61-8bf2-b637e72ddb23';

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 8;

const CATEGORIES = [
  'All',
  'Spiritual Items',
  'Healing Tools',
  'Articles',
  'Digital Products',
  'Books',
];

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Healing Crystal Set',
    category: 'Spiritual Items',
    description:
      'A premium crystal set designed to attract positive energy, reduce stress, and restore spiritual balance.',
    price: 29.99,
    image: IMG_CRYSTAL,
  },
  {
    id: 2,
    name: 'Sacred Incense Pack',
    category: 'Spiritual Items',
    description:
      'Natural incense sticks that help improve meditation, relaxation, and create a peaceful environment.',
    price: 12.5,
    image: IMG_INCENSE,
  },
  {
    id: 3,
    name: 'Tarot Guidance Deck',
    category: 'Spiritual Items',
    description:
      'A complete tarot card deck for self-discovery, spiritual reading, and intuitive guidance.',
    price: 24.0,
    image: IMG_TAROT,
  },
  {
    id: 4,
    name: 'Wooden Massage Roller',
    category: 'Healing Tools',
    description:
      'A natural wooden tool designed to relieve body pain and relax tight muscles effectively.',
    price: 18.0,
    image: IMG_ROLLER,
  },
  {
    id: 5,
    name: 'Tibetan Singing Bowl',
    category: 'Healing Tools',
    description:
      'A traditional sound healing bowl that helps calm the mind and deepen meditation practice.',
    price: 35.0,
    image: IMG_BOWL,
  },
  {
    id: 6,
    name: 'Natural Healing Oil',
    category: 'Healing Tools',
    description:
      'Herbal essential oil formulated to reduce stress and support natural body healing.',
    price: 15.99,
    image: IMG_OIL,
  },
  {
    id: 7,
    name: 'The Power of Mind',
    category: 'Books',
    description:
      'A spiritual guidebook focused on mindset transformation and achieving inner peace.',
    price: 19.99,
    image: IMG_MIND,
  },
  {
    id: 8,
    name: 'Astrology Basics Guide',
    category: 'Books',
    description:
      'A beginner-friendly guide to understanding zodiac signs, astrology, and horoscopes.',
    price: 14.5,
    image: IMG_ASTRO,
  },
  {
    id: 9,
    name: 'Meditation Candle Set',
    category: 'Spiritual Items',
    description:
      'Handcrafted candles infused with essential oils for deep meditation and spiritual rituals.',
    price: 22.0,
    image: IMG_CRYSTAL,
  },
  {
    id: 10,
    name: 'Chakra Balancing Kit',
    category: 'Healing Tools',
    description:
      'A complete kit with seven crystals aligned to each chakra for energy balancing and healing.',
    price: 45.0,
    image: IMG_BOWL,
  },
  {
    id: 11,
    name: 'Spiritual Awakening',
    category: 'Articles',
    description:
      'A comprehensive guide covering mindfulness, spirituality, and conscious living practices.',
    price: 9.99,
    image: IMG_ASTRO,
  },
  {
    id: 12,
    name: 'Manifestation Course',
    category: 'Digital Products',
    description:
      'An online course teaching powerful manifestation techniques and law of attraction principles.',
    price: 49.99,
    image: IMG_MIND,
  },
  {
    id: 13,
    name: 'Rose Quartz Bracelet',
    category: 'Spiritual Items',
    description:
      'A rose quartz bracelet believed to promote love, compassion, and emotional healing.',
    price: 16.0,
    image: IMG_CRYSTAL,
  },
  {
    id: 14,
    name: 'Acupressure Mat',
    category: 'Healing Tools',
    description:
      'A therapeutic mat with acupressure points to relieve muscle tension and improve circulation.',
    price: 28.0,
    image: IMG_ROLLER,
  },
  {
    id: 15,
    name: 'Mindfulness for Beginners',
    category: 'Books',
    description:
      'An introductory book on mindfulness practices for stress reduction and mental clarity.',
    price: 11.99,
    image: IMG_MIND,
  },
  {
    id: 16,
    name: 'Zodiac Reflections Journal',
    category: 'Articles',
    description:
      'A beautifully designed journal with daily prompts inspired by the twelve zodiac signs.',
    price: 8.5,
    image: IMG_ASTRO,
  },
];

// ─── Pagination helper ────────────────────────────────────────────────────────

function getPaginationRange(current, total) {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, '...', total];
  if (current >= total - 2) return [1, '...', total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
}

// ─── Sub-components ───────────────────────────────────────────────────────────

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
          <Trash2 size={24} className='text-red-500' />
        </div>
        <h3 className='text-lg font-semibold text-gray-900 mb-1'>
          Delete Product
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

function ProductCard({ product, onView, onEdit, onDelete }) {
  const cardRef = useRef(null);
  const editRef = useRef(null);
  const deleteRef = useRef(null);

  const handleEditEnter = () =>
    gsap.to(editRef.current, { scale: 1.03, duration: 0.13 });
  const handleEditLeave = () =>
    gsap.to(editRef.current, { scale: 1, duration: 0.13 });
  const handleDeleteEnter = () =>
    gsap.to(deleteRef.current, { scale: 1.03, duration: 0.13 });
  const handleDeleteLeave = () =>
    gsap.to(deleteRef.current, { scale: 1, duration: 0.13 });

  return (
    <div
      ref={cardRef}
      onClick={onView}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onView();
        }
      }}
      className='border border-[#e2ab0b]/30 rounded-2xl p-4 flex flex-col gap-6 bg-white cursor-pointer'
    >
      {/* Product image */}
      <div className='w-full h-48 sm:h-56 lg:h-64 rounded-lg overflow-hidden shrink-0'>
        <img
          src={product.image}
          alt={product.name}
          className='w-full h-full object-cover'
        />
      </div>

      {/* Product details */}
      <div className='flex flex-col gap-4 flex-1'>
        <div className='flex flex-col gap-3'>
          <h3
            className='text-xl font-medium text-[#333] leading-tight'
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {product.name}
          </h3>
          <p className='text-sm text-[#545454] leading-relaxed line-clamp-3'>
            {product.description}
          </p>
        </div>

        {/* Price */}
        <p
          className='text-xl font-medium text-[#333]'
          style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
        >
          {'\u20AC'}
          {product.price.toFixed(2)}
        </p>

        {/* Action buttons */}
        <div className='flex gap-4 mt-auto'>
          <button
            ref={editRef}
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            onMouseEnter={handleEditEnter}
            onMouseLeave={handleEditLeave}
            className='flex-1 flex items-center justify-center gap-2.5 bg-[#E2AB0B] text-white px-6 py-3 rounded text-base font-normal transition-colors hover:bg-[#c99809]'
          >
            <Pencil size={18} />
            Edit
          </button>
          <button
            ref={deleteRef}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            onMouseEnter={handleDeleteEnter}
            onMouseLeave={handleDeleteLeave}
            className='flex-1 flex items-center justify-center gap-2.5 border border-[#6E35AE] text-[#6E35AE] px-6 py-3 rounded text-base font-normal transition-colors hover:bg-[#6E35AE]/5'
          >
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const AdminWebshop = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const gridRef = useRef(null);
  const filterBtnRefs = useRef([]);

  // Animate cards when filter or page changes
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('[data-card]');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.3, ease: 'power2.out' },
    );
  }, [activeCategory, page]);

  const handleCategoryChange = useCallback((cat) => {
    setActiveCategory(cat);
    setPage(1);
  }, []);

  const handleDelete = useCallback(() => {
    if (!deleteTarget) return;
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
  }, [deleteTarget]);

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageRange = getPaginationRange(page, totalPages);

  return (
    <div className='flex flex-col gap-6'>
      {/* Page header */}
      <div className='flex items-start justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <h1
            className='text-3xl md:text-4xl font-semibold text-[#050609] leading-tight'
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            Webshop
          </h1>
          <p className='text-base text-[#464646]'>
            Overview &amp; manage your products, orders, and online store
            activity.
          </p>
        </div>
        <button
          onClick={() => navigate(ROUTES.ADMIN_WEBSHOP_ADD_PRODUCT)}
          className='shrink-0 flex items-center gap-2 bg-[#E2AB0B] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#c99809] transition-colors'
        >
          <Plus size={16} />
          Add New Products
        </button>
      </div>

      {/* Category filter tabs */}
      <div className='flex flex-wrap gap-3 items-center'>
        {CATEGORIES.map((cat, i) => (
          <button
            key={cat}
            ref={(el) => (filterBtnRefs.current[i] = el)}
            onClick={() => handleCategoryChange(cat)}
            onMouseEnter={() => {
              if (cat !== activeCategory)
                gsap.to(filterBtnRefs.current[i], {
                  scale: 1.04,
                  duration: 0.13,
                });
            }}
            onMouseLeave={() =>
              gsap.to(filterBtnRefs.current[i], { scale: 1, duration: 0.13 })
            }
            className={`px-3 py-1.5 rounded-full text-base font-normal transition-colors ${
              activeCategory === cat
                ? 'bg-[#333] text-white'
                : 'border border-black/[0.12] text-[#333] hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      {paginated.length === 0 ? (
        <div className='py-24 text-center text-base text-gray-400'>
          No products found in this category.
        </div>
      ) : (
        <div
          ref={gridRef}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'
        >
          {paginated.map((product) => (
            <div key={product.id} data-card>
              <ProductCard
                product={product}
                onView={() =>
                  navigate(
                    ROUTES.ADMIN_WEBSHOP_PRODUCT_VIEW.replace(
                      ':productId',
                      product.id,
                    ),
                    {
                      state: { product },
                    },
                  )
                }
                onEdit={() =>
                  navigate(ROUTES.ADMIN_WEBSHOP_ADD_PRODUCT, {
                    state: { mode: 'edit', product },
                  })
                }
                onDelete={() =>
                  setDeleteTarget({ id: product.id, name: product.name })
                }
              />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex items-center justify-center gap-1.5 py-2'>
          {/* First */}
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className='w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
            aria-label='First page'
          >
            <ChevronsLeft size={14} />
          </button>
          {/* Prev */}
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className='w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
            aria-label='Previous page'
          >
            <ChevronLeft size={14} />
          </button>

          {/* Page numbers */}
          {pageRange.map((item, idx) =>
            item === '...' ? (
              <span
                key={`ellipsis-${idx}`}
                className='w-9 h-9 flex items-center justify-center text-sm text-gray-400 select-none'
              >
                ...
              </span>
            ) : (
              <button
                key={item}
                onClick={() => setPage(item)}
                className={`w-9 h-9 flex items-center justify-center rounded-full border text-sm font-semibold transition-colors ${
                  page === item
                    ? 'bg-[#E2AB0B] border-[#E2AB0B] text-white'
                    : 'border-gray-200 bg-white text-[#333] hover:bg-gray-50'
                }`}
                aria-label={`Page ${item}`}
                aria-current={page === item ? 'page' : undefined}
              >
                {item}
              </button>
            ),
          )}

          {/* Next */}
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages}
            className='w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
            aria-label='Next page'
          >
            <ChevronRight size={14} />
          </button>
          {/* Last */}
          <button
            onClick={() => setPage(totalPages)}
            disabled={page >= totalPages}
            className='w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
            aria-label='Last page'
          >
            <ChevronsRight size={14} />
          </button>
        </div>
      )}

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

export default AdminWebshop;
