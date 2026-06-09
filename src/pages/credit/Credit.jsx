import React, { memo } from "react";
import { useSEO } from "../../hooks/useSEO";

import CreditPlans from "./sections/CreditPlans";
import CreditBenefits from "./sections/CreditBenefits";
import CommonAdsSection from "../../components/CommonAdsSection";

const Credit = memo(() => {
  useSEO({
    title: "Buy Credits",
    description:
      "Purchase consultation credits to start instant sessions with expert consultants",
    keywords: ["credits", "consultation", "pricing", "packages"],
  });

  return (
    <div className="min-h-screen bg-[#FBFDFF] py-14 md:py-20">
      <CreditPlans />
      <CreditBenefits />
      <CommonAdsSection
        containerClassName="container mx-auto px-4 lg:px-6"
        boxClassName="w-full h-44 md:h-56 lg:h-72 bg-[#F1F5F9] rounded-3xl border border-dashed border-gray-300 flex items-center justify-center group"
        title="Advertisement Area"
        titleClassName="text-black font-bold text-2xl tracking-widest uppercase"
      />
    </div>
  );
});

Credit.displayName = "Credit";

export default Credit;
