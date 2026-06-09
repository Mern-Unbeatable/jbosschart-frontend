import React, { memo } from 'react';

const TabFilter = memo(({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`w-full sm:w-auto px-10 py-2.5 rounded-md text-sm transition-all border ${
            activeTab === tab.value
              ? 'bg-[#EAB308] border-[#EAB308] text-white'
              : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
});

TabFilter.displayName = 'TabFilter';

export default TabFilter;
