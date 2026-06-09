import React from 'react';
import { HelpCircle } from 'lucide-react';

const PendingQuestions = ({ items }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-[#2b2540] mb-3">Pending Community Questions</h3>
      <div className="rounded-lg border border-[#efeaf8] bg-white p-4 shadow-sm">
        {items.map((it) => (
          <div key={it.id} className="flex gap-4 mb-4">
            <div className="shrink-0 w-12 h-12 rounded-full bg-[#ece3ff] flex items-center justify-center text-[#8b6ac1]">
              <HelpCircle size={24} />
            </div>
            <div className="flex-1">
              <p className="text-base font-medium text-[#2b2540]">{it.title}</p>
              <p className="mt-2 text-base text-[#6b6b78]">{it.body}</p>
              <div className="mt-3">
                <button className="inline-flex items-center gap-2 rounded-lg bg-[#E2AB0B] px-4 py-2 text-sm font-semibold text-white shadow-sm">Answer</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingQuestions;
