import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import ConsultantCard from "../../../components/ConsultantCard";

const ConsultantsSection = memo(() => {
  const { t } = useTranslation();

  const consultants = [
    {
      id: 1,
      name: "Elena Vance",
      specialty: "Psychic & Medium",
      rating: 4.9,
      price: 2.5,
      status: "Online",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Marcus Thorne",
      specialty: "Astrology Expert",
      rating: 4.8,
      price: 2.5,
      status: "Offline",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Sarah Jenkins",
      specialty: "Tarot Reader",
      rating: 5.0,
      price: 2.5,
      status: "Busy",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=300&fit=crop",
    },
    {
      id: 4,
      name: "David Miller",
      specialty: "Life Coach",
      rating: 4.7,
      price: 2.5,
      status: "Online",
      image:
        "https://images.unsplash.com/photo-1519085185758-2ad980306e00?q=80&w=400&h=300&fit=crop",
    },
    {
      id: 5,
      name: "Elena Vance",
      specialty: "Psychic & Medium",
      rating: 5.0,
      price: 2.5,
      status: "Busy",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=300&fit=crop",
    },
    {
      id: 6,
      name: "Elena Vance",
      specialty: "Psychic & Medium",
      rating: 4.9,
      price: 2.5,
      status: "Offline",
      image:
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=400&h=300&fit=crop",
    },
  ];

  return (
    <section className="py-14 md:py-20  bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mb-6">
          <h2 className=" text-2xl md:text-4xl font-bold text-gray-900 mb-2 font-crimson">
            {t("home.consultantsSection.title")}
          </h2>
          <p className="text-base text-gray-500 font-poppins">
            {t("home.consultantsSection.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {consultants.map((consultant) => (
            <ConsultantCard key={consultant.id} consultant={consultant} />
          ))}
        </div>
      </div>
    </section>
  );
});

ConsultantsSection.displayName = "ConsultantsSection";

export default ConsultantsSection;
