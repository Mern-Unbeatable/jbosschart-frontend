import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

const CategoriesSidebar = memo(({ categories, activeCategory, onCategoryChange }) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Mobile/Tablet Select Dropdown */}
      <div className="w-full lg:hidden mb-6">
        <select
          value={activeCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-lg p-4 text-lg  font-bold text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer appearance-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 1rem center',
            paddingRight: '2.5rem'
          }}
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-1/4 lg:sticky lg:top-28 bg-white border border-gray-200 rounded-lg p-4 h-60">
        <h2 className="text-lg  text-gray-800 mb-4 font-bold">{t('community.categories.title')}</h2>
        <div className="space-y-0">
          {categories.map((cat, idx) => (
            <div key={idx} className="border-b border-gray-100 last:border-0">
              <div
                onClick={() => onCategoryChange(cat.value)}
                className="py-2 cursor-pointer group"
              >
                <span
                  className={`text-base font-medium transition-colors ${
                    activeCategory === cat.value
                      ? 'text-[#EAB308]'
                      : 'text-gray-700 group-hover:text-[#EAB308]'
                  }`}
                >
                  {cat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
});

CategoriesSidebar.displayName = 'CategoriesSidebar';

export default CategoriesSidebar;
