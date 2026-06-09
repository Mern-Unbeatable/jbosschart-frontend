import React from "react";
import FaqHero from "./faq/sections/FaqHero";
import FaqList from "./faq/sections/FaqList";
import PendingQuestions from "./faq/sections/PendingQuestions";
import CtaContact from "./faq/sections/CtaContact";

const stats = [
  { label: "Questions Answered", value: "3,200+" },
  { label: "Satisfaction Rate", value: "98%" },
  { label: "Support Available", value: "24/7" },
  { label: "Avg. Response Time", value: "< 2h" },
];

const sampleFaqs = [
  {
    id: 1,
    question: "How do I start my first consultation?",
    answer:
      "To start your first consultation, create an account, purchase credits if required, and book an available consultant.",
  },
  {
    id: 2,
    question: "How does the credit and billing system work?",
    answer:
      "Credits are charged per minute during consultations. You can buy credits in the webshop.",
  },
  {
    id: 3,
    question: "Can I request a refund for a missed session?",
    answer:
      "Refunds are reviewed on a case-by-case basis. Contact support with your booking details.",
  },
  {
    id: 4,
    question: "How are consultants vetted on this platform?",
    answer:
      "Consultants go through a verification and interview process before they are allowed to offer sessions.",
  },
];

const pending = [
  {
    id: "p1",
    title:
      "Can I sync my external SAP calendar directly with the EliteConsult portal?",
    body: "I've been trying to automate my bookings but can't find the API key or calendar integration settings.",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-white  ">
      <FaqHero stats={stats} />

      <main className="container mx-auto px-4 py-14 lg:py-20">
        <div className="flex items-center gap-3 text-[#6E35AE] mb-4">
          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        </div>
        <FaqList faqs={sampleFaqs} />
        <PendingQuestions items={pending} />
        <CtaContact />
      </main>
    </div>
  );
};

export default FAQ;
