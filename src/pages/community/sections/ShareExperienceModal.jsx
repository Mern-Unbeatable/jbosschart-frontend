import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

const ShareExperienceModal = memo(({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'spiritual-development',
    subcategory: 'meditation',
  });

  const categories = [
    { value: 'spiritual-development', label: t('community.categories.spiritualDevelopment') },
    { value: 'meditation', label: t('community.categories.meditation') },
    { value: 'love-life', label: t('community.categories.loveLife') },
    { value: 'energy-healing', label: t('community.categories.energyHealing') },
  ];
  const subcategories = [
    { value: 'meditation', label: t('community.modal.subcategories.meditation') },
    { value: 'mindfulness', label: t('community.modal.subcategories.mindfulness') },
    { value: 'awakening', label: t('community.modal.subcategories.awakening') },
  ];

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-9999 p-4 animate-modal-overlay'>
      <div className='bg-white rounded-xl w-full max-w-lg shadow-2xl overflow-hidden border border-gray-100 animate-modal-panel'>
        {/* Header */}
        <div className='p-6 pb-2 flex items-center justify-between'>
          <h3 className='text-2xl  font-semibold text-gray-800'>
            {t('community.modal.title')}
          </h3>
          <button
            onClick={onClose}
            className='p-1.5 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors'
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form className='p-6 pt-2 space-y-5'>
          {/* Title */}
          <div>
            <label className='block text-base font-medium text-gray-700 mb-2'>
              {t('community.modal.fields.title')}
            </label>
            <input
              type='text'
              placeholder={t('community.modal.placeholders.title')}
              className='w-full px-4 py-3 bg-[#EAEAEA] border-none rounded-lg text-sm placeholder-gray-500 focus:ring-1 focus:ring-[#EAB308] outline-none'
            />
          </div>

          {/* Description */}
          <div>
            <label className='block text-base font-medium text-gray-700 mb-2'>
              {t('community.modal.fields.description')}
            </label>
            <textarea
              placeholder={t('community.modal.placeholders.description')}
              rows='4'
              className='w-full px-4 py-3 bg-[#EAEAEA] border-none rounded-lg text-sm placeholder-gray-500 focus:ring-1 focus:ring-[#EAB308] outline-none resize-none'
            />
          </div>

          {/* Categories */}
          <div>
            <label className='block text-base font-medium text-gray-700 mb-3'>
              {t('community.modal.fields.categories')}
            </label>
            <div className='flex flex-wrap gap-2'>
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type='button'
                  onClick={() => setFormData({ ...formData, category: cat.value })}
                  className={`px-4 py-2 rounded-lg text-sm  transition-all ${
                    formData.category === cat.value
                      ? 'bg-[#E2AB0B] text-white '
                      : 'bg-[#FCF7E7] text-[#1C1C1C] hover:bg-[#FCF7E7]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Subcategory */}
          <div>
            <label className='block text-base font-medium text-gray-700 mb-3'>
              {t('community.modal.fields.subcategory')}
            </label>
            <div className='flex flex-wrap gap-2'>
              {subcategories.map((sub) => (
                <button
                  key={sub.value}
                  type='button'
                  onClick={() => setFormData({ ...formData, subcategory: sub.value })}
                  className={`px-4 py-2 rounded-lg text-sm  transition-all ${
                    formData.subcategory === sub.value
                      ? 'bg-[#E2AB0B] text-white '
                      : 'bg-[#FCF7E7] text-[#1C1C1C] hover:bg-[#FCF7E7]'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>

          {/* Post Button */}
          <button
            type='submit'
            className='w-full bg-[#E2AB0B] text-white py-3 rounded-lg text-base font-bold hover:bg-[#d99a00]  transition-all active:scale-[0.98] mt-2'
          >
            {t('community.modal.button')}
          </button>
        </form>
      </div>
    </div>
  );
});

ShareExperienceModal.displayName = 'ShareExperienceModal';

export default ShareExperienceModal;
