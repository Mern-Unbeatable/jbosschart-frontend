import React, { memo } from "react";
import { useTranslation } from "react-i18next";

const DigitalSection = memo(() => {
  const { t } = useTranslation();

  return (
    <section className="mx-auto container px-4 pt-14 sm:px-6  lg:pt-20 ">
      <div className="grid gap-3 lg:grid-cols-2 lg:items-center">
        {/* Left Column: Text and Cards */}
        <div className="max-w-33xl">
          <h2 className="mb-4  text-3xl font-medium leading-tight text-gray-900 sm:text-4xl">
            {t("digital.title", "Your digital foundation is essential")}
          </h2>
          <p className="mb-8 text-[15px] leading-relaxed text-gray-500 sm:text-base">
            {t(
              "digital.description",
              "A website must do more than just look good. A good website builds trust, guides behavior, and turns visitors into customers.",
            )}
          </p>

          {/* Large Agency Card */}
          <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <p className="mb-2 text-[15px] text-gray-700">
              {t("digital.agency.eyebrow", "Netwerkmediums is part of:")}
            </p>
            <h3 className="mb-4  text-3xl font-medium text-slate-800 sm:text-[32px]">
              {t("digital.agency.name", "Digital Dutch Agency")}
            </h3>
            <p className="text-[14px] leading-relaxed text-gray-500 sm:text-[15px]">
              {t(
                "digital.agency.description",
                "Together, we have successfully helped hundreds of businesses with converting websites, professional webshops, and strong SEO.",
              )}
            </p>
          </div>

          {/* Small Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center sm:text-left">
              <p className=" text-3xl font-medium text-slate-800 sm:text-4xl">
                100+
              </p>
              <p className="mt-2 text-base text-gray-500">
                {t("digital.stats.clients", "Clients")}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center sm:text-left">
              <p className=" text-3xl font-medium text-slate-800 sm:text-4xl">
                SEO
              </p>
              <p className="mt-2 text-base text-gray-500">
                {t("digital.stats.seo", "Optimized")}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Single Image */}
        <div className="lg:pl-60">
          <img
            src="/enterprise2.png"
            alt="Team discussing at whiteboard"
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
});

DigitalSection.displayName = "DigitalSection";

export default DigitalSection;
