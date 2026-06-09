import React, { memo } from "react";
import { Check } from "lucide-react";

const PricingSection = memo(() => {
  const plans = [
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
    <section className="py-14 md:py-20   bg-gray-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className=" rounded-xl bg-white p-6 border border-[#00000033] flex flex-col"
            >
              {/* Plan Name */}
              <h3 className="text-2xl font-poppins font-bold text-gray-800 mb-2">
                {plan.name}
              </h3>

              {/* Pricing Section */}
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-bold text-gray-900">
                  €{plan.price}
                </span>
                <span className="text-gray-500 text-base ml-1 font-poppins">
                  /{plan.period}
                </span>
              </div>

              {/* Secondary Pricing Text */}
              <p className="text-base text-gray-600 mb-4 font-poppins">
                {plan.subText}
              </p>

              {/* Button */}
              <button className="w-full bg-green-500/60  text-white py-3 rounded-md font-medium mb-4 transition duration-200 shadow-sm font-poppins">
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
    </section>
  );
});

PricingSection.displayName = "PricingSection";

export default PricingSection;
