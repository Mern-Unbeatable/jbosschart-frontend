import React, { memo } from "react";
import { useSEO } from "../../hooks/useSEO";
import { useTranslation } from "react-i18next";
import HeroSection from "./sections/HeroSection";
import FeatureCardsSection from "./sections/FeatureCardsSection";
import FoundationGrowthSection from "./sections/FoundationGrowthSection";
import CoachingSection from "./sections/CoachingSection";
import DigitalSection from "./sections/DigitalSection";
import ClosingCtaSection from "./sections/ClosingCtaSection";
import ShowcaseSection from './sections/ShowcaseSection';
const Entrepreneurship = memo(() => {
  const { t } = useTranslation();

  useSEO({
    title: t("entrepreneurshipPage.title"),
    description: t("entrepreneurshipPage.description"),
    keywords: ["entrepreneurship", "business coaching", "spiritual business"],
  });

  return (
    <div className="bg-[#F9FAFB] text-gray-900">
      <HeroSection />
      <FoundationGrowthSection />
      <FeatureCardsSection />
      <CoachingSection />
      <ShowcaseSection />
      <DigitalSection />
      <ClosingCtaSection />
    </div>
  );
});

Entrepreneurship.displayName = "Entrepreneurship";

export default Entrepreneurship;
