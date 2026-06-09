import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Check, PenLine, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';

// ─── Constants ────────────────────────────────────────────────────────────────

const MODAL_CLOSE_ANIMATION_MS = 240;
const CURRENCY_SYMBOL = '€';

const TAG_MODAL_CONFIG = {
  category: {
    title: 'Category name',
    placeholder: 'Category name',
  },
  topics: {
    title: 'Topics name',
    placeholder: 'Topics name',
  },
  blogCategory: {
    title: 'Blog category',
    placeholder: 'Category name',
  },
};

const INITIAL_CATEGORIES = [
  { id: 1, name: 'Relationship advice' },
  { id: 2, name: 'Compatibility check' },
  { id: 3, name: 'Stress management' },
];

const INITIAL_TOPICS = [
  { id: 1, name: 'How to stay consistent in life?' },
  { id: 2, name: 'How to switch career?' },
];

const INITIAL_BLOG_CATEGORIES = [
  { id: 1, name: 'Spiritual Guidance' },
  { id: 2, name: 'Consultant tips' },
  { id: 3, name: 'Platform Updates' },
  { id: 4, name: 'Articles' },
];

const INITIAL_PRICING_PLANS = [
  {
    id: 1,
    name: 'Basic',
    price: 225,
    minutes: 90,
    features: [
      'No hidden fees',
      'Pay only for what you use',
      'Same rate for all consultants',
    ],
  },
  {
    id: 2,
    name: 'Standard',
    price: 300,
    minutes: 120,
    features: [
      'Transparent pricing',
      'No extra charges',
      'Fair pricing for everyone',
    ],
  },
  {
    id: 3,
    name: 'Advanced',
    price: 375,
    minutes: 150,
    features: [
      'No hidden costs',
      'Real-time usage billing',
      'Unified rate for all experts',
    ],
  },
];

const EMPTY_PRICE_FORM = {
  name: '',
  price: '',
  minutes: '',
  featured: '',
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const TagPill = ({ name, onDelete }) => (
  <div className='inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-base text-gray-700'>
    <span>{name}</span>
    <button
      type='button'
      onClick={onDelete}
      className='text-gray-400 hover:text-red-500 transition-colors'
      aria-label={`Delete ${name}`}
    >
      <Trash2 size={15} />
    </button>
  </div>
);

const PricingCard = ({ plan, onEdit, onDelete }) => (
  <div className='flex flex-col border border-gray-200 rounded-xl p-6 gap-5'>
    <h3 className='text-2xl font-bold text-gray-900'>{plan.name}</h3>
    <div className='flex items-baseline gap-1'>
      <span className='text-3xl font-bold text-gray-900'>
        {CURRENCY_SYMBOL}
        {plan.price}
      </span>
      <span className='text-base text-gray-500'>/{plan.minutes} minute</span>
    </div>
    <ul className='flex flex-col gap-2 flex-1'>
      {plan.features.map((feature, index) => (
        <li
          key={index}
          className='flex items-center gap-2 text-base text-gray-700'
        >
          <Check size={15} className='text-green-500 shrink-0' />
          {feature}
        </li>
      ))}
    </ul>
    <div className='flex gap-3'>
      <button
        type='button'
        onClick={onEdit}
        className='flex items-center justify-center gap-2 flex-1 py-2.5 bg-[#E2AB0B] hover:brightness-95 text-white text-base font-medium rounded-lg transition-colors'
      >
        <PenLine size={14} />
        Edit
      </button>
      <button
        type='button'
        onClick={onDelete}
        className='flex items-center justify-center gap-2 flex-1 py-2.5 border border-purple-200 text-purple-500 hover:bg-purple-50 text-base font-medium rounded-lg transition-colors'
      >
        <Trash2 size={14} />
        Delete
      </button>
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

const Settings = () => {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [topics, setTopics] = useState(INITIAL_TOPICS);
  const [blogCategories, setBlogCategories] = useState(INITIAL_BLOG_CATEGORIES);
  const [pricingPlans, setPricingPlans] = useState(INITIAL_PRICING_PLANS);

  const [activeModal, setActiveModal] = useState(null);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState(null);

  const [tagInput, setTagInput] = useState('');
  const [tagError, setTagError] = useState('');
  const [priceForm, setPriceForm] = useState(EMPTY_PRICE_FORM);
  const [priceErrors, setPriceErrors] = useState({});

  const closeTimerRef = useRef(null);
  const nextIdRef = useRef(100);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // ── Modal lifecycle

  const handleCloseModal = useCallback(() => {
    setIsModalClosing(true);
    closeTimerRef.current = setTimeout(() => {
      setActiveModal(null);
      setIsModalClosing(false);
      setEditingPlanId(null);
      setTagInput('');
      setTagError('');
      setPriceForm(EMPTY_PRICE_FORM);
      setPriceErrors({});
    }, MODAL_CLOSE_ANIMATION_MS);
  }, []);

  const openModal = useCallback((modalType) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setIsModalClosing(false);
    setEditingPlanId(null);
    setTagInput('');
    setTagError('');
    setPriceForm(EMPTY_PRICE_FORM);
    setPriceErrors({});
    setActiveModal(modalType);
  }, []);

  const openEditPrice = useCallback((plan) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setIsModalClosing(false);
    setEditingPlanId(plan.id);
    setPriceForm({
      name: plan.name,
      price: String(plan.price),
      minutes: String(plan.minutes),
      featured: plan.features.join('\n'),
    });
    setPriceErrors({});
    setActiveModal('price');
  }, []);

  // ── Category handlers

  const handleDeleteCategory = useCallback((id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    toast.success('Category deleted');
  }, []);

  const handleSaveCategory = useCallback(() => {
    if (!tagInput.trim()) {
      setTagError('Category name is required');
      return;
    }
    nextIdRef.current += 1;
    setCategories((prev) => [
      ...prev,
      { id: nextIdRef.current, name: tagInput.trim() },
    ]);
    toast.success('Category added');
    handleCloseModal();
  }, [tagInput, handleCloseModal]);

  // ── Topics handlers

  const handleDeleteTopic = useCallback((id) => {
    setTopics((prev) => prev.filter((t) => t.id !== id));
    toast.success('Topic deleted');
  }, []);

  const handleSaveTopic = useCallback(() => {
    if (!tagInput.trim()) {
      setTagError('Topic name is required');
      return;
    }
    nextIdRef.current += 1;
    setTopics((prev) => [
      ...prev,
      { id: nextIdRef.current, name: tagInput.trim() },
    ]);
    toast.success('Topic added');
    handleCloseModal();
  }, [tagInput, handleCloseModal]);

  // ── Blog Category handlers

  const handleDeleteBlogCategory = useCallback((id) => {
    setBlogCategories((prev) => prev.filter((bc) => bc.id !== id));
    toast.success('Blog category deleted');
  }, []);

  const handleSaveBlogCategory = useCallback(() => {
    if (!tagInput.trim()) {
      setTagError('Blog category name is required');
      return;
    }
    nextIdRef.current += 1;
    setBlogCategories((prev) => [
      ...prev,
      { id: nextIdRef.current, name: tagInput.trim() },
    ]);
    toast.success('Blog category added');
    handleCloseModal();
  }, [tagInput, handleCloseModal]);

  // ── Pricing handlers

  const handleDeletePlan = useCallback((id) => {
    setPricingPlans((prev) => prev.filter((p) => p.id !== id));
    toast.success('Pricing plan deleted');
  }, []);

  const handleSavePrice = useCallback(() => {
    const errors = {};

    if (!priceForm.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!priceForm.price.trim()) {
      errors.price = 'Price is required';
    } else if (isNaN(Number(priceForm.price)) || Number(priceForm.price) < 0) {
      errors.price = 'Enter a valid price';
    }

    if (!priceForm.minutes.trim()) {
      errors.minutes = 'Minutes is required';
    } else if (
      isNaN(Number(priceForm.minutes)) ||
      Number(priceForm.minutes) <= 0
    ) {
      errors.minutes = 'Enter valid minutes';
    }

    if (!priceForm.featured.trim()) {
      errors.featured = 'At least one feature is required';
    }

    if (Object.keys(errors).length > 0) {
      setPriceErrors(errors);
      return;
    }

    const features = priceForm.featured
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const planData = {
      name: priceForm.name.trim(),
      price: Number(priceForm.price),
      minutes: Number(priceForm.minutes),
      features,
    };

    if (editingPlanId !== null) {
      setPricingPlans((prev) =>
        prev.map((p) => (p.id === editingPlanId ? { ...p, ...planData } : p)),
      );
      toast.success('Pricing plan updated');
    } else {
      nextIdRef.current += 1;
      setPricingPlans((prev) => [
        ...prev,
        { id: nextIdRef.current, ...planData },
      ]);
      toast.success('Pricing plan added');
    }

    handleCloseModal();
  }, [priceForm, editingPlanId, handleCloseModal]);

  // ── Derived values

  const isModalOpen = activeModal !== null;
  const isPriceModal = activeModal === 'price';
  const tagConfig =
    !isPriceModal && activeModal ? TAG_MODAL_CONFIG[activeModal] : null;

  const tagSaveHandler =
    activeModal === 'category'
      ? handleSaveCategory
      : activeModal === 'topics'
        ? handleSaveTopic
        : handleSaveBlogCategory;

  const overlayClass = isModalClosing
    ? 'animate-modal-overlay-out'
    : 'animate-modal-overlay';
  const panelClass = isModalClosing
    ? 'animate-modal-panel-out'
    : 'animate-modal-panel';

  // ── Render

  return (
    <div className='flex flex-col gap-5'>
      {/* Page header */}
      <div>
        <h1 className='dashboard-page-title'>
          Powerful Settings Control for Complete Store Management
        </h1>
        <p className='dashboard-page-subtitle mt-1'>
          Customize categories, models, and pricing rules with full flexibility
          from your admin settings panel.
        </p>
      </div>

      {/* Sections */}
      <div className='flex flex-col gap-5'>
        {/* Category */}
        <section className='bg-white border border-gray-200 rounded-xl p-6'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl font-semibold text-gray-800'>Category</h2>
            <button
              type='button'
              onClick={() => openModal('category')}
              className='px-4 py-2.5 bg-[#E2AB0B] hover:brightness-95 text-white text-base font-medium rounded-lg transition-colors'
            >
              Add Category
            </button>
          </div>
          <hr className='border-gray-100 mb-4' />
          <div className='flex flex-wrap gap-3'>
            {categories.map((cat) => (
              <TagPill
                key={cat.id}
                name={cat.name}
                onDelete={() => handleDeleteCategory(cat.id)}
              />
            ))}
          </div>
        </section>

        {/* Topics */}
        <section className='bg-white border border-gray-200 rounded-xl p-6'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl font-semibold text-gray-800'>Topics</h2>
            <button
              type='button'
              onClick={() => openModal('topics')}
              className='px-4 py-2.5 bg-[#E2AB0B] hover:brightness-95 text-white text-base font-medium rounded-lg transition-colors'
            >
              Add Topics
            </button>
          </div>
          <hr className='border-gray-100 mb-4' />
          <div className='flex flex-wrap gap-3'>
            {topics.map((topic) => (
              <TagPill
                key={topic.id}
                name={topic.name}
                onDelete={() => handleDeleteTopic(topic.id)}
              />
            ))}
          </div>
        </section>

        {/* Blog Category */}
        <section className='bg-white border border-gray-200 rounded-xl p-6'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl font-semibold text-gray-800'>
              Blog Category
            </h2>
            <button
              type='button'
              onClick={() => openModal('blogCategory')}
              className='px-4 py-2.5 bg-[#E2AB0B] hover:bg-amber-600 text-white text-base font-medium rounded-lg transition-colors'
            >
              Add Category
            </button>
          </div>
          <hr className='border-gray-100 mb-4' />
          <div className='flex flex-wrap gap-3'>
            {blogCategories.map((bc) => (
              <TagPill
                key={bc.id}
                name={bc.name}
                onDelete={() => handleDeleteBlogCategory(bc.id)}
              />
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className='bg-white border border-gray-200 rounded-xl p-6'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl font-semibold text-gray-800'>Pricing</h2>
            <button
              type='button'
              onClick={() => openModal('price')}
              className='px-4 py-2.5 bg-[#E2AB0B] hover:brightness-95 text-white text-base font-medium rounded-lg transition-colors'
            >
              Add Price
            </button>
          </div>
          <hr className='border-gray-100 mb-4' />
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {pricingPlans.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                onEdit={() => openEditPrice(plan)}
                onDelete={() => handleDeletePlan(plan.id)}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 ${overlayClass} ${isModalClosing ? 'pointer-events-none' : ''}`}
          onClick={handleCloseModal}
        >
          <div
            className={`bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 ${panelClass}`}
            onClick={(e) => e.stopPropagation()}
          >
            {isPriceModal ? (
              /* ── Price / Edit Price modal ── */
              <div className='p-6 flex flex-col gap-4'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-xl font-semibold text-gray-900'>
                    {editingPlanId !== null ? 'Edit Price' : 'Add Price'}
                  </h3>
                  <button
                    type='button'
                    onClick={handleCloseModal}
                    className='text-gray-400 hover:text-gray-600 transition-colors'
                    aria-label='Close modal'
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className='flex flex-col gap-1'>
                  <label className='text-base font-medium text-gray-700'>
                    Name
                  </label>
                  <input
                    type='text'
                    placeholder='Name'
                    value={priceForm.name}
                    onChange={(e) =>
                      setPriceForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className='w-full px-3 py-2.5 border border-gray-200 rounded-lg text-base text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400'
                  />
                  {priceErrors.name && (
                    <p className='text-xs text-red-500'>{priceErrors.name}</p>
                  )}
                </div>

                <div className='flex flex-col gap-1'>
                  <label className='text-base font-medium text-gray-700'>
                    Price
                  </label>
                  <input
                    type='number'
                    min='0'
                    placeholder='0.00'
                    value={priceForm.price}
                    onChange={(e) =>
                      setPriceForm((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    className='w-full px-3 py-2.5 border border-gray-200 rounded-lg text-base text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400'
                  />
                  {priceErrors.price && (
                    <p className='text-xs text-red-500'>{priceErrors.price}</p>
                  )}
                </div>

                <div className='flex flex-col gap-1'>
                  <label className='text-base font-medium text-gray-700'>
                    Minutes
                  </label>
                  <input
                    type='number'
                    min='1'
                    placeholder='0'
                    value={priceForm.minutes}
                    onChange={(e) =>
                      setPriceForm((prev) => ({
                        ...prev,
                        minutes: e.target.value,
                      }))
                    }
                    className='w-full px-3 py-2.5 border border-gray-200 rounded-lg text-base text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400'
                  />
                  {priceErrors.minutes && (
                    <p className='text-xs text-red-500'>
                      {priceErrors.minutes}
                    </p>
                  )}
                </div>

                <div className='flex flex-col gap-1'>
                  <label className='text-base font-medium text-gray-700'>
                    Featured
                  </label>
                  <textarea
                    placeholder='Write Featured'
                    rows={4}
                    value={priceForm.featured}
                    onChange={(e) =>
                      setPriceForm((prev) => ({
                        ...prev,
                        featured: e.target.value,
                      }))
                    }
                    className='w-full px-3 py-2.5 border border-gray-200 rounded-lg text-base text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none'
                  />
                  {priceErrors.featured && (
                    <p className='text-xs text-red-500'>
                      {priceErrors.featured}
                    </p>
                  )}
                </div>

                <button
                  type='button'
                  onClick={handleSavePrice}
                  className='w-full py-2.5 bg-[#E2AB0B] hover:brightness-95 text-white text-base font-semibold rounded-lg transition-colors'
                >
                  Save
                </button>
              </div>
            ) : (
              /* ── Tag modal (Category / Topics / Blog Category) ── */
              <div className='p-6 flex flex-col gap-4'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-xl font-semibold text-gray-900'>
                    {tagConfig?.title}
                  </h3>
                  <button
                    type='button'
                    onClick={handleCloseModal}
                    className='text-gray-400 hover:text-gray-600 transition-colors'
                    aria-label='Close modal'
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className='flex flex-col gap-1'>
                  <input
                    type='text'
                    placeholder={tagConfig?.placeholder}
                    value={tagInput}
                    onChange={(e) => {
                      setTagInput(e.target.value);
                      if (tagError) setTagError('');
                    }}
                    className='w-full px-3 py-2.5 border border-gray-200 rounded-lg text-base text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400'
                  />
                  {tagError && (
                    <p className='text-xs text-red-500'>{tagError}</p>
                  )}
                </div>

                <button
                  type='button'
                  onClick={tagSaveHandler}
                  className='w-full py-2.5 bg-[#E2AB0B] hover:brightness-95 text-white text-base font-semibold rounded-lg transition-colors'
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
