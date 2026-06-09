import React, { memo } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const Pagination = memo(({ currentPage, totalPages, onPageChange }) => {
  // logic to calculate which pages to show (including ellipsis)
  const getPages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage, '...', totalPages);
      }
    }
    return pages;
  };

  const buttonBaseClass = "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg sm:rounded-xl border transition-all duration-200 text-xs sm:text-sm md:text-base";
  const activeClass = "bg-green-500/60 border-btn-primary text-white font-bold shadow-sm";
  const inactiveClass = "bg-white border-gray-100 text-gray-700 hover:border-gray-300 hover:bg-gray-50";
  const disabledClass = "opacity-30 cursor-not-allowed";

  return (
    <div className='flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 md:gap-2 mt-8 sm:mt-12 px-2 sm:px-4'>
      {/* First Page Button */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={`${buttonBaseClass} ${inactiveClass} ${currentPage === 1 ? disabledClass : ''}`}
      >
        <ChevronsLeft size={16} />
      </button>

      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${buttonBaseClass} ${inactiveClass} ${currentPage === 1 ? disabledClass : ''}`}
      >
        <ChevronLeft size={16} />
      </button>

      {/* Page Numbers */}
      <div className='flex gap-1 sm:gap-1.5 md:gap-2'>
        {getPages().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <div className={`${buttonBaseClass} border-transparent text-gray-400`}>
                ...
              </div>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={`${buttonBaseClass} ${
                  currentPage === page ? activeClass : inactiveClass
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${buttonBaseClass} ${inactiveClass} ${currentPage === totalPages ? disabledClass : ''}`}
      >
        <ChevronRight size={16} />
      </button>

      {/* Last Page Button */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`${buttonBaseClass} ${inactiveClass} ${currentPage === totalPages ? disabledClass : ''}`}
      >
        <ChevronsRight size={16} />
      </button>
    </div>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;