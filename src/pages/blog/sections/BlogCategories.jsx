import React, { memo } from 'react';

const BlogCategories = memo(({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className='flex flex-wrap justify-center gap-3 mb-12'>
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onCategoryChange(cat.value)}
          className={`px-6 py-2 rounded-full text-base font-medium transition-all border ${
            activeCategory === cat.value
              ? 'bg-[#333333] border-[#333333] text-white'
              : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
});

BlogCategories.displayName = 'BlogCategories';

export default BlogCategories;
