import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../../config";

const HeroSection = memo(() => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden">
      <img
        src="/jbossHero.webp"
        alt="Entrepreneurship workspace"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Updated overlay for a uniform, darker background to make centered text readable */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Changed items-end to items-center and justify-center for middle alignment */}
      <div className="relative mx-auto flex min-h-[72vh] max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* Added flex-col, items-center, and text-center */}
        <div className="flex max-w-4xl flex-col items-center text-center text-white">
          {/* Badge: Darkened background and centered */}
          <span className="inline-flex rounded-full bg-black/50 px-4 py-1.5 text-sm font-medium tracking-wide backdrop-blur-sm">
            {t("entrepreneurshipPage.badge")}
          </span>

          <h1 className="mt-6 max-w-3xl  text-4xl leading-tight sm:text-5xl lg:text-6xl">
            {t("entrepreneurshipPage.title")}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/90 sm:text-lg lg:text-xl">
            {t("entrepreneurshipPage.description")}
          </p>

          {/* Buttons: Centered and updated colors/shapes */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to={ROUTES.CONSULTANTS}
              className="rounded bg-[#E2AB0B] px-8 py-3 text-sm font-medium text-white shadow-lg transition-transform hover:-translate-y-0.5"
            >
              {t("entrepreneurshipPage.primaryCta")}
            </Link>
            <Link
              to={ROUTES.SERVICES}
              className="rounded bg-[#7135A5] px-8 py-3 text-sm font-medium text-white shadow-lg transition-transform hover:-translate-y-0.5"
            >
              {t("entrepreneurshipPage.secondaryCta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
