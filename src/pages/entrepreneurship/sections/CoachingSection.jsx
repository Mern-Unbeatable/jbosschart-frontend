import React, { memo } from "react";
import { useTranslation } from "react-i18next";

// Shield check icon matching the design in the white box
const ShieldCheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#22C55E" // Tailwind green-500
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mt-0.5 shrink-0"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const BusinessPlanSection = memo(() => {
  const { t } = useTranslation();

  // Array of list items based on the image provided
  const listItems = [
    t("businessPlan.list.direction", "Provides direction and focus"),
    t("businessPlan.list.goals", "Makes your goals concrete"),
    t("businessPlan.list.choices1", "Helps you make better choices"),
    t("businessPlan.list.choices2", "Helps you make better choices"), // Note: Repeated in your image
    t("businessPlan.list.prevent", "Prevents you from 'muddling through'"),
  ];

  return (
    // The background color matches the light cream/off-white in the image
    <section className="bg-[#FEF5E7] ">
      <div className="container  mx-auto px-4 lg:px-6 py-14 lg:py-20">
        <div className="grid gap-2 lg:grid-cols-2 lg:items-start lg:gap-2">
          {/* Left Column: Typography and List */}
          <div className="max-w-xl ">
            <h2 className=" text-2xl font-medium text-gray-900 md:text-4xl ">
              {t("businessPlan.title", "The business plan: your foundation")}
            </h2>

            <ul className="mt-4">
              {listItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-700"
                >
                  {/* Small dark gray dot for the list */}
                  <span className="h-1 w-1 rounded-full bg-gray-500" />
                  <span className="text-base font-medium sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-2 text-base text-gray-600 sm:text-base max-w-md">
              {t(
                "businessPlan.quote",
                '"Without a plan, success is often accidental. With a plan, success becomes conscious and repeatable."',
              )}
            </p>
          </div>

          {/* Right Column: Investment Card */}
          <div className="rounded-lg bg-[#FCE1B3] p-4 sm:p-6">
            <h3 className=" text-3xl font-medium text-gray-900">
              {t("businessPlan.investment.title", "Investment & Growth")}
            </h3>

            <p className="mt-2 text-base leading-relaxed text-gray-700 sm:text-base">
              {t(
                "businessPlan.investment.description",
                "Let's be honest. Growing a business takes time, focus, energy, and financial investment.",
              )}
            </p>

            {/* Inner White Notification Box */}
            <div className="mt-8 flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm">
              <ShieldCheckIcon />
              <p className="text-base leading-relaxed text-gray-700 sm:text-base">
                {t(
                  "businessPlan.investment.highlight",
                  "Investing smart = growing faster with less stress.\nEvery step has maximum impact.",
                )
                  .split("\n")
                  .map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

BusinessPlanSection.displayName = "BusinessPlanSection";

export default BusinessPlanSection;
