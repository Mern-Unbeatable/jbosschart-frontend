import React from "react";

const CtaContact = () => (
  <section className="mt-14 lg:mt-20">
    {/* Main Background Container */}
    <div className="bg-gradient-to-br from-[#7B5EA7] to-[#9B7DC7] rounded-lg overflow-hidden shadow-sm">
      <div className="flex flex-col lg:flex-row items-center justify-between p-4 lg:px-20 lg:py-16 gap-10">
        {/* Left Text Content */}
        <div className="flex-1 text-white max-w-md">
          <h3 className="text-3xl lg:text-4xl  mb-4 leading-snug">
            Still need help? Ask our admin team.
          </h3>
          <p className="text-base text-white/80 leading-relaxed font-light">
            Our dedicated support experts are available to ensure your
            experience remains premium and uninterrupted.
          </p>
        </div>

        {/* Right Form Card */}
        <div className="w-full lg:w-[620px]">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            <form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-base text-white/70 uppercase tracking-widest mb-1.5 font-medium">
                    Topic
                  </label>
                  <input
                    className="w-full rounded-md bg-white/10 border-none text-white text-sm placeholder-white/40 px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-white/30"
                    placeholder="Billing Inquiry"
                  />
                </div>
                <div>
                  <label className="block text-base text-white/70 uppercase tracking-widest mb-1.5 font-medium">
                    Subject
                  </label>
                  <input
                    className="w-full rounded-md bg-white/10 border-none text-white text-sm placeholder-white/40 px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-white/30"
                    placeholder="Summary of issue"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-base text-white/70 uppercase tracking-widest mb-1.5 font-medium">
                  Question
                </label>
                <textarea
                  className="w-full rounded-md bg-white/10 border-none text-white text-sm placeholder-white/40 px-3 py-2.5 h-24 resize-none focus:outline-none focus:ring-1 focus:ring-white/30"
                  placeholder="Describe your inquiry in detail..."
                />
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-md bg-[#E2AB0B] px-4 py-3 text-sm font-semibold text-white hover:bg-[#e5a834] transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CtaContact;
