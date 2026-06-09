import React, { memo } from "react";
import { useTranslation } from "react-i18next";

const FocusStrategySection = memo(() => {
  const { t } = useTranslation();

  return (
    <section className="container  mx-auto px-4 lg:px-6 py-14 lg:py-20 ">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        {/* Left Side: Image Container */}
        <div className="h-80 md:h-120 xl:h-130">
          {/* Main Image */}
          <img
            src="/enterprise1.webp"
            alt="Team discussing strategy"
            className="h-full w-full "
          />
        </div>

        {/* Right Side: Text Content */}
        <div className="">
          <p className="mb-3 text-base font-medium uppercase  text-[#F59E0B] ">
            {t("focusStrategy.eyebrow", "FOCUS AND STRATEGY")}
          </p>

          <h2 className="mb-6 font-semibold text-2xl  text-gray-900 sm:text-4xl">
            {t(
              "focusStrategy.title",
              "Online entrepreneurship & creating sustainable success",
            )}
          </h2>

          <div className=" leading-relaxed text-gray-600 text-base">
            <p>
              {t(
                "focusStrategy.desc1",
                "Today, online entrepreneurship requires more than just a good idea or a beautiful service. It requires clarity, strategy, visibility, and the right energy in the right place.",
              )}
            </p>
            <p>
              {t(
                "focusStrategy.desc2",
                "We give you as an entrepreneur direction, insight, and confidence in building a successful business, both online and offline.",
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

FocusStrategySection.displayName = "FocusStrategySection";

export default FocusStrategySection;
