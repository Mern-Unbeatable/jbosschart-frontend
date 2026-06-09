import React from 'react';
import { Plus } from 'lucide-react';

const FaqHeader = ({ onAddNew }) => {
  return (
    <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
      <div>
        <h1 className='dashboard-page-title'>FAQ Management</h1>
        <p className='dashboard-page-subtitle mt-1'>
          Configure platform assistance and manage member knowledge base.
        </p>
      </div>

      <button
        type='button'
        onClick={onAddNew}
        className='inline-flex items-center gap-2 self-start rounded-lg bg-[#E2AB0B] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:brightness-95'
      >
        <Plus size={16} aria-hidden='true' />
        Add New FAQ
      </button>
    </div>
  );
};

export default FaqHeader;
