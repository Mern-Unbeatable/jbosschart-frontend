import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ImagePlus, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ROUTES } from '../../../config';

const CATEGORY_OPTIONS = [
  'Spiritual Items',
  'Healing Tools',
  'Articles',
  'Digital Products',
  'Books',
];

const FILE_HINTS = ['JPEG, PNG', 'Max 7 photos', '1920x1080px recommended'];

const INITIAL_FORM = {
  title: '',
  category: '',
  price: '€18.00',
  description: '',
  features: '',
  inside: '',
  benefits: '',
};

const toMultiline = (value) => {
  if (Array.isArray(value)) return value.join('\n');
  return value || '';
};

const mapProductToForm = (product) => ({
  title: product?.name || '',
  category: product?.category || '',
  price: `€${Number(product?.price || 0).toFixed(2)}`,
  description: product?.longDescription || product?.description || '',
  features: toMultiline(product?.features),
  inside: toMultiline(product?.inside),
  benefits: toMultiline(product?.benefits),
});

const AdminAddNewProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pageRef = useRef(null);
  const saveBtnRef = useRef(null);

  const mode = location.state?.mode === 'edit' ? 'edit' : 'add';
  const sourceProduct = location.state?.product;

  const [form, setForm] = useState(() => {
    if (mode !== 'edit' || !sourceProduct) return INITIAL_FORM;
    return mapProductToForm(sourceProduct);
  });

  const [previewUrls, setPreviewUrls] = useState(() =>
    mode === 'edit' && sourceProduct?.image ? [sourceProduct.image] : [],
  );
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (mode === 'edit' && sourceProduct) {
      setForm(mapProductToForm(sourceProduct));
      setPreviewUrls(sourceProduct.image ? [sourceProduct.image] : []);
      return;
    }
    setForm(INITIAL_FORM);
    setPreviewUrls([]);
  }, [mode, sourceProduct]);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => {
        if (url.startsWith('blob:')) URL.revokeObjectURL(url);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewUrls]);

  useEffect(() => {
    if (!pageRef.current) return;
    const blocks = pageRef.current.querySelectorAll('[data-reveal]');
    gsap.fromTo(
      blocks,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.32, stagger: 0.05, ease: 'power2.out' },
    );
  }, []);

  const handleChange = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleImageChange = useCallback((e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const newUrls = files.map((f) => URL.createObjectURL(f));
    setPreviewUrls((prev) => [...prev, ...newUrls].slice(0, 7));
    e.target.value = '';
  }, []);

  const handleRemoveImage = useCallback((idx) => {
    setPreviewUrls((prev) => {
      const removed = prev[idx];
      if (removed?.startsWith('blob:')) URL.revokeObjectURL(removed);
      return prev.filter((_, i) => i !== idx);
    });
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <div ref={pageRef} className='flex flex-col gap-6'>
      <p data-reveal className='text-sm leading-5 text-[#636363]'>
        Listing &gt; {mode === 'edit' ? 'Edit Listing' : 'Create Listing'}
      </p>

      <div data-reveal className='flex flex-col gap-3'>
        <button
          type='button'
          onClick={() => navigate(ROUTES.ADMIN_WEBSHOP)}
          className='inline-flex items-center gap-2 text-sm font-medium text-[#E2AB0B] w-fit hover:opacity-80 transition-opacity'
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <h1 className='dashboard-page-title'>
          {mode === 'edit' ? 'Edit Product' : 'Add New Product'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <div data-reveal className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
          <label className='flex flex-col gap-2.5'>
            <span className='text-sm text-[#464646]'>Product Title</span>
            <input
              type='text'
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder='Enter product title'
              className='h-12 rounded-lg border border-black/40 px-4 text-sm text-[#333] placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#E2AB0B]/30'
            />
          </label>

          <label className='flex flex-col gap-2.5'>
            <span className='text-sm text-[#464646]'>Category</span>
            <div className='relative'>
              <select
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className='h-12 w-full rounded-lg border border-black/40 px-4 pr-10 text-sm text-[#333] focus:outline-none focus:ring-2 focus:ring-[#E2AB0B]/30 appearance-none bg-white'
              >
                <option value=''>Select product category</option>
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8A8A] pointer-events-none'
              />
            </div>
          </label>

          <label className='flex flex-col gap-2.5'>
            <span className='text-sm text-[#464646]'>Price</span>
            <input
              type='text'
              value={form.price}
              onChange={(e) => handleChange('price', e.target.value)}
              placeholder='€18.00'
              className='h-12 rounded-lg border border-black/40 px-4 text-sm text-[#333] placeholder:text-[#989DA1] focus:outline-none focus:ring-2 focus:ring-[#E2AB0B]/30'
            />
          </label>
        </div>

        <label data-reveal className='flex flex-col gap-2.5'>
          <span className='text-sm text-[#464646]'>Description</span>
          <textarea
            rows={6}
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder='Write detailed product description'
            className='min-h-40 rounded-lg border border-[#8A8A8A] px-4 py-3 text-sm text-[#333] placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#E2AB0B]/30 resize-y'
          />
        </label>

        <label data-reveal className='flex flex-col gap-2.5'>
          <span className='text-sm text-[#464646]'>Features</span>
          <textarea
            rows={6}
            value={form.features}
            onChange={(e) => handleChange('features', e.target.value)}
            placeholder='Enter product features...'
            className='min-h-40 rounded-lg border border-[#8A8A8A] px-4 py-3 text-sm text-[#333] placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#E2AB0B]/30 resize-y'
          />
        </label>

        <label data-reveal className='flex flex-col gap-2.5'>
          <span className='text-sm text-[#464646]'>What's Inside</span>
          <textarea
            rows={6}
            value={form.inside}
            onChange={(e) => handleChange('inside', e.target.value)}
            placeholder="List what's included in the package"
            className='min-h-40 rounded-lg border border-[#8A8A8A] px-4 py-3 text-sm text-[#333] placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#E2AB0B]/30 resize-y'
          />
        </label>

        <label data-reveal className='flex flex-col gap-2.5'>
          <span className='text-sm text-[#464646]'>Benefits</span>
          <textarea
            rows={6}
            value={form.benefits}
            onChange={(e) => handleChange('benefits', e.target.value)}
            placeholder='Enter product benefits'
            className='min-h-40 rounded-lg border border-[#8A8A8A] px-4 py-3 text-sm text-[#333] placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#E2AB0B]/30 resize-y'
          />
        </label>

        <div data-reveal className='flex flex-col gap-2.5'>
          <span className='text-sm text-[#464646]'>
            Uploaded Gallery
            {previewUrls.length > 0 && ` (${previewUrls.length})`}
          </span>
          <input
            ref={fileInputRef}
            type='file'
            multiple
            accept='image/jpeg,image/png'
            className='hidden'
            onChange={handleImageChange}
          />

          {previewUrls.length === 0 ? (
            /* ── empty state ── */
            <div
              role='button'
              tabIndex={0}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) =>
                (e.key === 'Enter' || e.key === ' ') &&
                fileInputRef.current?.click()
              }
              className='min-h-72 rounded-lg border-2 border-dashed border-black/40 flex flex-col items-center justify-center px-4 py-8 cursor-pointer hover:border-[#E2AB0B] transition-colors select-none'
            >
              <ImagePlus size={34} className='text-[#94A3B8]' />
              <div className='mt-4 flex flex-wrap justify-center gap-4 text-sm font-medium text-[#94A3B8]'>
                {FILE_HINTS.map((hint) => (
                  <span key={hint}>{hint}</span>
                ))}
              </div>
            </div>
          ) : (
            /* ── gallery layout ── */
            <div className='flex gap-3'>
              {/* Main image — left, large */}
              <div className='relative shrink-0 w-96 rounded-xl overflow-hidden border border-black/10 group'>
                <img
                  src={previewUrls[0]}
                  alt='main'
                  className='w-full h-full object-cover'
                  style={{ minHeight: '240px', maxHeight: '260px' }}
                />
                <div className='absolute bottom-0 left-0 right-0 bg-[#1B4F8A] text-white text-sm font-bold text-center py-2 tracking-wide uppercase'>
                  Main Image
                </div>
                <button
                  type='button'
                  onClick={() => handleRemoveImage(0)}
                  className='absolute top-2 right-2 bg-red-500 text-white rounded w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
                >
                  <X size={14} />
                </button>
              </div>

              {/* Thumbnails — right, grid */}
              <div className='flex flex-wrap gap-3 content-start'>
                {previewUrls.slice(1).map((url, i) => (
                  <div
                    key={url + (i + 1)}
                    className='relative w-44 h-28 rounded-xl overflow-hidden border border-black/10 group'
                  >
                    <img
                      src={url}
                      alt={`thumb-${i + 1}`}
                      className='w-full h-full object-cover'
                    />
                    <button
                      type='button'
                      onClick={() => handleRemoveImage(i + 1)}
                      className='absolute top-2 right-2 bg-red-500 text-white rounded w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}

                {/* Add more tile */}
                {previewUrls.length < 7 && (
                  <div
                    role='button'
                    tabIndex={0}
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={(e) =>
                      (e.key === 'Enter' || e.key === ' ') &&
                      fileInputRef.current?.click()
                    }
                    className='w-44 h-28 rounded-xl border-2 border-dashed border-black/25 flex flex-col items-center justify-center gap-1.5 text-[#94A3B8] hover:border-[#E2AB0B] hover:text-[#E2AB0B] transition-colors cursor-pointer'
                  >
                    <ImagePlus size={22} />
                    <span className='text-xs font-medium'>Add more</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div data-reveal className='flex justify-end'>
          <button
            ref={saveBtnRef}
            type='submit'
            onMouseEnter={() =>
              gsap.to(saveBtnRef.current, { scale: 1.03, duration: 0.12 })
            }
            onMouseLeave={() =>
              gsap.to(saveBtnRef.current, { scale: 1, duration: 0.12 })
            }
            className='bg-[#E2AB0B] text-white px-6 py-2.5 rounded text-base font-normal hover:bg-[#c99809] transition-colors'
          >
            {mode === 'edit' ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddNewProduct;
