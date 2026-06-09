import React, { memo, useState } from "react";
import { useSEO } from "../../hooks/useSEO";
import HeroSection from "./sections/HeroSection";
import ImpactSection from "./sections/ImpactSection";
import DonationFormSection from "./sections/DonationFormSection";
import CommonAdsSection from "../../components/CommonAdsSection";

const Donation = memo(() => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    donorType: "individual",
    randomDonor: false,
    visibilityBoost: false,
  });

  useSEO({
    title: "Donation",
    description: "Make a difference through donations",
    keywords: ["donation", "support", "charity"],
  });

  return (
    <div className="min-h-screen bg-[#FBFDFF]">
      <HeroSection />
      <ImpactSection />
      {/* <SupportNetworkSection /> */}
      <DonationFormSection formData={formData} setFormData={setFormData} />
      <CommonAdsSection
        containerClassName="container mx-auto pb-14 md:pb-20 px-4 lg:px-6"
        title="Advertisement Area"
        titleClassName="text-black font-bold text-2xl tracking-widest uppercase"
      />
    </div>
  );
});

Donation.displayName = "Donation";

export default Donation;
