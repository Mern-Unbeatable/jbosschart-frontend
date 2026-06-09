import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

const FaqList = ({ faqs }) => {
  const [openId, setOpenId] = useState(null);

  const toggleOpen = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {faqs.map((f) => (
        <div key={f.id} className="bg-white border border-[#efeaf8] rounded-lg shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => toggleOpen(f.id)}
            className="w-full text-left px-4 py-4 flex justify-between items-center hover:bg-[#f8f6fc] transition-colors"
          >
            <span className="text-base font-medium">{f.question}</span>
            <button
              type="button"
              aria-hidden
              className="w-6 h-6 rounded-full border border-[#e7def6] bg-white flex items-center justify-center text-[#8b6ac1] transition-all"
              style={{ transform: openId === f.id ? 'rotate(45deg)' : 'rotate(0deg)' }}
            >
              <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor"><path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" /></svg>
            </button>
          </button>
          {openId === f.id && (
            <div className="px-4 pb-4 text-base text-[#595367] border-t border-[#efeaf8]">
              {f.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaqList;
