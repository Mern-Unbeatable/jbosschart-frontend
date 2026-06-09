import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";

const CreditPlans = memo(() => {
  const { t } = useTranslation();

  const creditPlans = [
    {
      id: 1,
      name: "Basic",
      price: 225,
      period: "90 minute",
      subText: "90 minutes = €225",
      features: [
        "No hidden fees",
        "Pay only for what you use",
        "Same rate for all consultants",
      ],
    },
    {
      id: 2,
      name: "Standard",
      price: 300,
      period: "120minute",
      subText: "A 120-minute session costs just €246",
      features: [
        "Transparent pricing",
        "No extra charges",
        "Fair pricing for everyone",
      ],
    },
    {
      id: 3,
      name: "Advanced",
      price: 375,
      period: "150 minute",
      subText: "150 minutes = €375",
      features: [
        "No hidden costs",
        "Real-time usage billing",
        "Unified rate for all experts",
      ],
    },
  ];

  return (
    <div className="mb-12 ">
      {/* Header Section */}
      <div className="container mx-auto px-4 text-center mb-12 md:mb-16">
        <span className="inline-block px-4 py-1 rounded-full bg-white border border-[#00000033] text-sm text-gray-500 font-medium mb-4">
          {t("creditPlans.badge")}
        </span>
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 ">
          {t("creditPlans.title")}
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
          {t("creditPlans.description")}
        </p>
      </div>

      {/* Plans Grid */}
      <div className="container mx-auto  px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {creditPlans.map((plan) => (
            <div
              key={plan.id}
              className=" rounded-xl p-6 border border-[#00000033] flex flex-col"
            >
              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {plan.name}
              </h3>

              {/* Pricing Section */}
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-bold text-gray-900">
                  €{plan.price}
                </span>
                <span className="text-gray-500 text-base ml-1">
                  /{plan.period}
                </span>
              </div>

              {/* Secondary Pricing Text */}
              <p className="text-base text-gray-600 mb-4">{plan.subText}</p>

              {/* Button */}
              <button className="w-full bg-[#D4A017] hover:bg-[#B88A14] text-white py-3 rounded-md font-semibold mb-4 transition duration-200 shadow-sm">
                Buy Credits
              </button>

              {/* Features List */}
              <ul className="space-y-4  border-gray-100 ">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-gray-600 text-base"
                  >
                    <Check
                      size={18}
                      className="text-[#10B981] shrink-0"
                      strokeWidth={3}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

CreditPlans.displayName = "CreditPlans";

export default CreditPlans;
