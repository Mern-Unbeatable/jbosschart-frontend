import React from 'react';
import { HelpCircle } from 'lucide-react';

const FaqHero = ({ stats }) => {
  return (
    <>
      <header style={{ background: 'linear-gradient(to bottom,#f3ebfc,#ffffff)' }} className="py-14 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#6E35AE]">We're here to help</h1>
          <p className="mt-4 max-w-3xl mx-auto text-base text-[#6b6b78]">Find answers, learn more about your sessions, or reach our team anytime you need.</p>
        </div>
      </header>

      <section className="container mx-auto px-4 -mt-12">
        <div className="rounded-xl bg-white shadow-sm p-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            {stats.map((s) => (
              <div key={s.label} className="py-6">
                <div className="text-xl sm:text-2xl font-semibold text-[#6E35AE]">{s.value}</div>
                <div className="mt-2 text-xl text-[#6b6b78]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqHero;
